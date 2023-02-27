var mysql = require("mysql");

var aUID  = 'io'               // 'bruce'
var aPWD  = 'IO.usr216'        // 'Washington!12345'
var aHost = '172.31.30.151'  
var aDB   = 'io'

//  const con = mysql.createConnection( 'mysql:bruce:Washington!12345@172-31-30-151/io');
    const con = mysql.createConnection( `mysql:${aUID}:${aPWD}@${aHost}/${aDB}` );



      doit();

 async function doit() {

     var pResult = await getDataFromProcedure();

         console.log( "Result:\n", pResult )     
 
 
 
 
//       console.log( "Result:\n", pResult.recordset.map( fmtRec ).join( '\n' ) )     

 
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
   // make sure that any items are correctly URL encoded in the connection string
    await con.connect( function (err) { 



       console.log( "connected" );

   if (err) { throw err; }
       con.query(           "select *Call spGetMembers", function (err, result, fields) {
//     con.query(                   "SELECT * FROM Members WHERE MemberID < 12");
 
   if (err) { throw err; }
       return result // console.log( result );

        } );  // eof con.query( aSQL, function )

      } );  // eof con.connect( function )

  } catch( error ) { console.log( error ); }
}
