const mysqlLib = require("../lib/mysql");

class UsersService {
  ping() {
    return new Promise((resolve, reject) => {
      mysqlLib.getConnection((error, connection) => {
        if (error) reject(new Error("errorDb"));
        else {
          connection.ping((error) => {
            if (error) reject(new Error("errorDb"));
            else resolve("pong!! 🏓");
          });
        }
      });
    });
  }
  getUser(username) {
    return new Promise((resolve, reject) => {
      mysqlLib.query(
        `SELECT * FROM USERS WHERE USERNAME = '${username}'`,
        (err, res) => {
          if (err) reject(err);
          else resolve(res[0]);
        }
      );
    });
  }
}

module.exports = UsersService;
