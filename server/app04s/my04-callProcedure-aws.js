var mysql = require("mysql");
const con = mysql.createConnection('mysql:bruce:Washington!12345@172-31-30-151/io');

/*
const con = mysql.createConnection({
  host: "172-31-30-151",
  user: 'bruce',
  password: 'Washington!12345'
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
