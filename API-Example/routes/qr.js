const express = require("express");
const qr = require("../helpers/qr.js");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(qr.qrGenerate());
});

module.exports = app;
