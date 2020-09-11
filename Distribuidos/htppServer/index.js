const express = require("express");
const app = express();
const port = 3000;
const { dbPing } = require("./server/db");
const { jsonServerPing } = require("./server/jsonServer");
const { txtServerPing } = require("./server/txtServer");
const UsersService = require("./services/users");
const axios = require("axios");

app.use("/static", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", "./views");

app.set("view engine", "pug");

app.get("/", async (req, res) => {
  try {
    await dbPing();
    await jsonServerPing();
    await txtServerPing();
    if (req.query.error === "1") {
      res.render("index.pug", {
        error: true,
        errorMessage: "Usuario no encontrado en el sistema",
      });
    } else if (req.query.error === "2") {
      res.render("index.pug", {
        error: true,
        errorMessage: "Contraseña incorrecta",
      });
    } else {
      res.render("index.pug");
    }
  } catch (e) {
    if (e.message === "errorDb") {
      res.render("error.pug", {
        error:
          "No se ha podido establecer conexión con la base de datos (￢_￢;)",
      });
    } else if (e.message === "errorJsonServer") {
      res.render("error.pug", {
        error:
          "No se ha podido establecer conexión con el servidor de archivos json (￢_￢;)",
      });
    } else if (e.message === "errorTxtServer") {
      res.render("error.pug", {
        error:
          "No se ha podido establecer conexión con el servidor de archivos txt (￢_￢;)",
      });
    } else {
      res.render("error.pug", {
        error: "No tengo la menor idea de lo que esta pasando (￢_￢;)",
      });
    }
  }
});

app.get("/servers", (req, res) => {
  return res.redirect("/");
});

app.post("/servers", async (req, res) => {
  try {
    await dbPing();
    await jsonServerPing();
    await txtServerPing();
    const { username, password } = req.body;
    const userService = new UsersService();
    const user = await userService.getUser(username);
    if (user === undefined) {
      return res.redirect("/?error=1");
    } else if (user.PASSWORD !== password) {
      return res.redirect("/?error=2");
    } else {
      const jsonFilesResponse = await axios.get("http://54.161.219.49:3000/");
      const txtFilesResponse = await axios.get("http://3.134.181.207:3000/");
      res.render("serverInfo.pug", {
        username: username,
        jsonFiles: jsonFilesResponse.data.files,
        txtFiles: txtFilesResponse.data.files,
      });
    }
  } catch (e) {
    if (e.message === "errorDb") {
      res.render("error.pug", {
        error:
          "No se ha podido establecer conexión con la base de datos (￢_￢;)",
      });
    } else if (e.message === "errorJsonServer") {
      res.render("error.pug", {
        error:
          "No se ha podido establecer conexión con el servidor de archivos json (￢_￢;)",
      });
    } else if (e.message === "errorTxtServer") {
      res.render("error.pug", {
        error:
          "No se ha podido establecer conexión con el servidor de archivos txt (￢_￢;)",
      });
    } else {
      res.render("error.pug", {
        error: "No tengo la menor idea de lo que esta pasando (￢_￢;)",
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
