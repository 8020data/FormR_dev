var mysql = require("mysql");

var con = mysql.createConnection({
  host: "45.32.219.12",
  user: "nimdas",
  password: "FormR!1234",
  database: "world"
  });

con.connect(function(err) {
    if (err) throw err;
        con.query("SELECT * FROM countries", function (err, result, fields) {
    if (err) throw err;
        console.log(result);
        });
    });
