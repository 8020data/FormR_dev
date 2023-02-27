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
      doit() 

 async function doit() {

     var pResult = await getDataFromProcedure();

//       console.log( "Result:\n", pResult.recordset.map(           pRec   =>                   pRec     ) )  // result (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
//       console.log( "Result:\n", pResult.recordset.map(         ( pRec ) => {         return  pRec   } ) )  // result (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
//       console.log( "Result:\n", pResult.recordset.map( function( pRec )    {         return  pRec   } ) )  // result (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] 
//       console.log( "Result:\n", pResult.recordset.map(           pRec   =>   JSON.stringify( pRec )   ).join( '\n' ) ) 
//       console.log( "Result:\n", pResult.recordset.map(           pRec   =>           fmtRec( pRec )   ).join( '\n' ) )     
         console.log( "Result:\n", pResult.recordset.map(                               fmtRec           ).join( '\n' ) )     
//       console.log( "Result:\n", JSON.stringify( pResult.recordset.map(               fmtRec           ) ) )    
//       console.log( "Result:");  pResult.recordset.map(                               fmtRec           )   // console.log( aRec )   
         } 

function fmtRec( pRec ) {
//  var  aRec =    pRec.MemberID + ": " + pRec.FirstName + " " + pRec.LastName 
//  var  aRec = `${pRec.MemberID}: ${pRec.FirstName} ${pRec.LastName}` 
    var  aRec =  JSON.stringify( { ID: pRec.MemberID, FullName: `${pRec.FirstName} ${pRec.LastName}` } ) 
  //     console.log( aRec )
  return aRec 
         }

async function getDataFromProcedure() {
  try {

    await sql.connect(
      "mssql://sco:Azn.ani000@sc203d-azn3.database.windows.net/io?encrypt=true"
       );
     
       console.log( "connected" );


    const result = await sql.query( 'exec spGetMembers' );
//  const result = await sql.query( "SELECT * FROM Members WHERE MemberID < 12");
    
    
       return result // console.log( result );





  } catch( error ) { console.log( error );
  }
}
