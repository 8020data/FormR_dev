var mysql = require("mysql");
const con = mysql.createConnection('mysql:dev:Washington!12345@localhost/io');

/*
var con = mysql.createConnection({
  host: "localhost",
  user: "dev",
  password: "Washington!12345",
  database: "io",
});
*/

doit();

async function doit() {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await con.connect(function (err) {
      if (err) throw err;
      con.query("Call spGetMembers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });
  } catch (err) {
    console.dir(err);
  }
}
