const express = require("express");
const massive = require("massive");
const cors = require("cors");
const users = require("./controllers/users.js");
const contact = require("./controllers/contact.js");

massive({
  host: "localhost",
  port: 5432,
  database: "addressbook",
  user: "postgres",
  password: "addressbook"
}).then(db => {
  const app = express();
  const port = 3001;

  app.set("db", db);
  app.use(express.json());
  app.use(cors());

  app.get("/api/debug", users.debug);
  app.post("/api/register", users.register);
  app.post("/api/login", users.login);

  app.post("/api/addcontact", contact.addContact);
  app.patch("/api/editcontact", contact.editContact);
  app.delete("/api/deletecontact", contact.deleteContact);
  app.get("/api/searchcontact", contact.searchContact);

  app.listen(port, () => {
    console.log(`Server listening (0  0 3) on port: ${port}`);
  });
});
