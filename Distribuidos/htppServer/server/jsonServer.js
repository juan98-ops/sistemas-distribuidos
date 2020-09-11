const axios = require("axios");

const jsonServerPing = () => {
  return new Promise((res, rej) => {
    axios
      .get("http://54.161.219.49:3000/ping", { timeout: 1000 })
      .then((result) => res(result))
      .catch((e) => rej(new Error("errorJsonServer")));
  });
};

module.exports = { jsonServerPing };
