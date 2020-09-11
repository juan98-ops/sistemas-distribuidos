const axios = require("axios");

const txtServerPing = () => {
  return new Promise((res, rej) => {
    axios
      .get("http://3.134.181.207:3000/ping", { timeout: 1000 })
      .then((result) => res(result))
      .catch((e) => rej(new Error("errorTxtServer")));
  });
};

module.exports = { txtServerPing };
