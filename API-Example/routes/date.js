const express = require("express");
const date = require("../helpers/date");

const app = express();

app.get("/:date", (request, response) => {
  const edad = date.calculateAge(request.params.date);
  response.status(200).send(`La edad es ${edad} años`);
});

module.exports = app;
