const express = require("express");
const translate = require("../helpers/translate");
const date = require("../helpers/date");
const api = require("../helpers/api");
const trace = require("../helpers/trace");
const fetch = require("node-fetch");

const app = express();

app.get("/translateNumber/:number", (request, response) => {
  response.status(200).send(translate.NumeroALetras(request.params.number));
});

app.get("/getAge/:date", (request, response) => {
  response.status(200).send(date.calculateAge(request.params.date).toString());
});

app.get("/uf", async function(req, res) {
  trace.trackEvent("Request a /api/example correcta.");

  const request = await fetch(api.uriConfig.api.getUF(date.dateToday()), {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" }
  }).catch(error => {
    console.log(`error: ${error}`);
    trace.trackException(
      `Error llamando a ${api.uriConfig.api.getUF(
        "fecha en formato dd-mm-yyyy"
      )}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  });

  const response = await request.json();
  if (response) {
    trace.trackEvent("Llamada a servicio correcta.", response);
    res.send(`<h2>El valor de la UF es: $${response.serie[0].valor}</h2>`);
    res.end();
  } else {
    trace.trackException(
      `Error llamando a ${api.uriConfig.apiQR.tokens}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  }
});

module.exports = app;
