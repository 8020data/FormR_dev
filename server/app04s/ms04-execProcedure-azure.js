const sql = require("mssql");
/*
const config = {
  user: "sco",
  password: "Azn.ani000",
  server: "sc203d-azn3.database.windows.net",
  database: "io",
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};
*/

getDataFromProcedure();

async function getDataFromProcedure() {
  try {
    await sql.connect(
      "mssql://sco:Azn.ani000@sc203d-azn3.database.windows.net/io?encrypt=true"
    );
    //  await sql.connect(config);
    console.dir("Connected");
    const result = await sql.query("exec spGetMembers");
//    const result = await sql.query("SELECT * FROM Members");
      console.dir(result);
  } catch (error) {
      console.dir(error);
  }
}
