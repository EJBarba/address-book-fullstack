const express = require("express");

const app = express();

const port = 3001;

app.get("/api/products", (req, res) => {
  res.status(200).send("full stack is lit");
});

app.listen(port, () => {
  console.log(`Server listening (0  0 3) on port: ${port}`);
});
