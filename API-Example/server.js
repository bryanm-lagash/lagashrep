const config = require("./settings/appsettings.secrets.json");
const express = require("express");
const cors = require("cors");
const index = require("./routes/index");

// Constants
const { ALLOWED_ORIGINS, HOST, PORT } = config;

// App
const app = express();

//Routes
const { number, date, uf, qr } = index;
app.use("/number", number);
app.use("/date", date);
app.use("/uf", uf);
app.use("/qr", qr);

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
        const msg = "Origen no permitido.";
        console.log(`${msg} origin ${origin}`);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use((req, res, next) => {
  let data = "";
  req.setEncoding("utf8");
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", () => {
    req.body = data;
    next();
  });
});

app.listen(PORT, HOST, () => {
  console.log(`API Corriendo en http://localhost:${PORT}`);
});
