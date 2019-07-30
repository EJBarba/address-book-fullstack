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
    .then(contact => res.status(201).json(contact))
    .catch(err => {
      console.error(err);
    });
}

function editContact(req, res) {
  const db = req.app.get("db");

  //update post
  db.contact
    .update(req.query, req.body)
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteContact(req, res) {
  const db = req.app.get("db");

  //delete post
  db.contact
    .destroy(req.query)
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
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

module.exports = {
  addContact,
  editContact,
  deleteContact,
  searchContact
};
