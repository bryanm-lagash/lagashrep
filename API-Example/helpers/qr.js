const qr = require("qr-image");
const url = "www.google.cl";

const qrGenerate = () => {
  const code = qr.imageSync(url, {
    type: "svg",
    size: 10,
    margin: 2
  });
  return code;
};

module.exports = { qrGenerate };
