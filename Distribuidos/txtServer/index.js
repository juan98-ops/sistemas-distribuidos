const express = require("express");
const fs = require("fs");
const app = express();
const port = 3002;

app.use("/static", express.static("public"));

// body parser
app.use(express.json());

// ping
app.get("/ping", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "pong!! 🏓",
  });
});

app.get("/", (req, res) => {
  let files = [];
  fs.readdirSync("./public").forEach((file) => {
    files.push(file);
  });
  res.status(200).json({
    statusCode: 200,
    message: "Archivos listados",
    files,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({ statusCode: 404, message: "Not found" });
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
