const mysql = require("mysql");
const con = mysql.createConnection('mysql:dev:Washington!12345@localhost/io');

/*
const con = mysql.createConnection({
  host: "localhost",
  user: 'dev',
  password: 'Washington!12345'
});
*/

doit();

async function doit () {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await con.connect();
    console.dir("Connected");
  } catch (err) {
    console.dir(err);
  }
};


