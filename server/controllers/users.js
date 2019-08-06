const secret = require("./../../secret.js");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

function register(req, res) {
  const db = req.app.get("db");
  const { username, password } = req.body;

  db.users
    .findOne(
      {
        username
      },
      {
        fields: ["id", "username", "password"]
      }
    )
    .then(user => {
      if (!user) {
        argon2
          .hash(password)
          .then(hash => {
            return db.users.insert(
              {
                username,
                password: hash,
                //on user register create addressbook with no contacts initialized
                addressbook: [
                  {
                    userid: undefined,
                    contactid: null
                  }
                ]
              },
              {
                deepInsert: true
              }
            );
          })
          .then(user => {
            const token = jwt.sign({ userid: user.id }, secret); // adding token generation
            res.status(201).json({ ...user, token });
          })
          .catch(err => {
            console.error(err);
            res.status(500).end();
          });
      } else {
        throw new Error("Username already taken");
      }
    })
    .catch(err => {
      if (["Username not available"].includes(err.message)) {
        res.status(400).json({ error: err.message });
      } else {
        console.error(err);
        res.status(500).end();
      }
    });
}

function login(req, res) {
  const db = req.app.get("db");
  const { username, password } = req.body;

  db.users
    .findOne(
      {
        username
      },
      {
        fields: ["id", "username", "password"]
      }
    )
    .then(user => {
      if (!user) {
        throw new Error("Invalid username");
      }

      // Here is where we check the hashed password from the database
      // with the password that was submitted by the user.
      return argon2.verify(user.password, password).then(valid => {
        if (!valid) {
          throw new Error("Incorrect password");
        }

        const token = jwt.sign({ userid: user.id }, secret);
        delete user.password; // remove password hash from returned user object
        res.status(200).json({ ...user, token });
      });
    })
    .catch(err => {
      if (["Invalid username", "Incorrect password"].includes(err.message)) {
        res.status(400).json({ error: err.message });
      } else {
        console.error(err);
        res.status(500).end();
      }
    });
}

function debug(req, res) {
  const db = req.app.get("db");

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret); // will throw an Error when token is invalid!!!
    res.status(200).json({ data: "here is the protected data" });
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
  res.status(200).send("full stack is listss");
}

module.exports = {
  register,
  login,
  debug
};
