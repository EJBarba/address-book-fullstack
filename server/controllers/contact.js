function addContact(req, res) {
  const db = req.app.get("db");

  const {
    first_name,
    last_name,
    home_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country
  } = req.body;

  //addContact
  db.contact
    .insert(
      {
        first_name,
        last_name,
        home_phone,
        work_phone,
        email,
        city,
        state_or_province,
        postal_code,
        country
      },
      {
        deepInsert: true // this option here tells massive to create the related object
      }
    )
    .then(contact => {
      //add reference to created contact to addressbook
      db.addressbook.insert({
        userid: req.query.userId,
        contactid: contact.id
      });
      res.status(201).json(contact);
    })
    .catch(err => {
      console.error(err);
    });
}

function editContact(req, res) {
  const db = req.app.get("db");

  //update post
  db.contact
    .update(req.body.contactid, req.body)
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteContact(req, res) {
  const db = req.app.get("db");

  const { userid, first_name, last_name } = req.body;

  db.query(
    `
  Delete from addressbook as a using contact as c where a.userid = ${userid}
  and a.contactid is not null
  and c.id = a.contactid
  and c.first_name = '${first_name}'
  and c.last_name = '${last_name}';
  
  Delete from contact where first_name = '${first_name}'
  and last_name = '${last_name}';
  
  `
  )
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err));
}

function searchContact(req, res) {
  const db = req.app.get("db");

  db.contact
    .search({ fields: ["first_name", "last_name"], term: req.query.name })
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getAllContacts(req, res) {
  const db = req.app.get("db");
  db.query(
    "select * from addressbook,contact where addressbook.userid = $1 and addressbook.contactid is not null and contact.id = addressbook.contactid",
    [req.query.userId]
  )
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err));
}

function sort(req, res) {
  const db = req.app.get("db");
  db.query(
    `select * from addressbook,contact 
    where addressbook.userid = ${req.query.userId} 
    and addressbook.contactid is not null 
    and contact.id = addressbook.contactid
    ORDER BY first_name ${req.query.sort}`
  )
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err));
}

function searchBox(req, res) {
  const db = req.app.get("db");
  const { search, userId } = req.body;

  db.query(
    `select * from addressbook,contact where addressbook.userid = ${userId} 
  and addressbook.contactid is not null 
  and contact.id = addressbook.contactid
  and contact.first_name Like '%${search}%'`
  )
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err));
}

module.exports = {
  addContact,
  editContact,
  deleteContact,
  searchContact,
  getAllContacts,
  sort,
  searchBox
};
