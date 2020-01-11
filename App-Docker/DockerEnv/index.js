const express = require("express");
const environment =
  process.env.APPLICATION_ENV === "local" ? "local.env" : ".env";
require("dotenv").config({ path: environment });

const { HOST, PORT, ENVIROMENT } = process.env;

const app = express();

app.get("/", (req, res) => {
  res.send(`Api corriendo en ${ENVIROMENT}`);
});

app.listen(PORT, HOST, () => {
  console.log(`API Corriendo en http://localhost:${PORT}`);
});

console.log("Levantando aplicación");
console.log("");
console.log("Argumento : " + process.env.some_variable_name);
console.log("");
console.log("Variable de entorno de DockerFile : " + process.env.ENVIROMENT);
console.log("");
console.log("Variables de entorno recibidas : " + JSON.stringify(process.env));
