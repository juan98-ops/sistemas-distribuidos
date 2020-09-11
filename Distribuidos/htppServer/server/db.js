const UserService = require("../services/users");

const dbPing = () => {
  return new Promise((res, rej) => {
    const userService = new UserService();
    userService
      .ping()
      .then((result) => res(result))
      .catch((e) => rej(e));
  });
};

module.exports = { dbPing };
