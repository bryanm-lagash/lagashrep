const express = require("express");
const translate = require("../helpers/translate");

const app = express();

app.get("/:number", (request, response) => {
  response.status(200).send(translate.NumeroALetras(request.params.number));
});

module.exports = app;
