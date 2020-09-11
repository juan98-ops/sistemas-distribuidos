const mysql = require("mysql");

module.exports = mysql.createPool({
  host: "54.167.80.216",
  user: "db_user",
  password: "uptc2020",
  database: "distribuidos",
  insecureAuth: true,
});
