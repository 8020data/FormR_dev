const sql = require("mssql");
/*
const config = {
    user: 'sco',
    password: 'Azn.ani000',
    server: 'sc203d-azn3.database.windows.net', 
    port : 1433,
    database: 'io',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
*/

doit();

async function doit () {
  try {
    // make sure that any items are correctly URL encoded in the connection string
      await sql.connect("mssql://sco:Azn.ani000@localhost/io?encrypt=false");
    console.dir("Connected");
  } catch (err) {
    console.dir(err);
  }
};


