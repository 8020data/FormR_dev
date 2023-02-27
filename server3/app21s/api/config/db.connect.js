
function dbConnect( aDBSN ) {                                      // .(10121.02.3 RAM A connection for each Table?)

// const    dbConfig  =  require( './db.config.js'  );
// const    dbConfig  =  require( './db.config.js'  )( ''    );    //#.(10121.01.3)
// const    dbConfig  =  require( './db.config2.js' )( aDBSN );    //#.(10121.02.3).(10220.01.1)
        
   const    Sequelize =  require( 'sequelize' );

   const    dbConfig  =  getDbConfig( aDBSN )                      // .(10220.01.1 RAM Move function into this script)
//          -----------------------------------------------------------------


            dbConfig.POOL          =   dbConfig.POOL               // .(10220.02.1 Beg RAM Make POOL optional)
                                   ?   dbConfig.POOL 
                                   : { max    : 5
                                     , min    : 0
                                     , acquire: 30000
                                     , idle   : 10000
                                       }                           // .(10220.02.1 End)
            
            dbConfig.LOGGING       =   dbConfig.LOGGING         // .(10220.04.1 Beg RAM Add LOGGING option)
                                   ?   dbConfig.LOGGING 
                                   :  'false'
                                                                  
            dbConfig.LOGGING       =  (dbConfig.LOGGING == 'true' ) ?  console.log                 : dbConfig.LOGGING                                      
            dbConfig.LOGGING       =  (dbConfig.LOGGING == 'false') ?  function( str ) { a = str } : dbConfig.LOGGING                                      
                                                                   // .(10220.04.1 End)
     try {
     var    dbOptions =
             {  host               :   dbConfig.HOST
             ,  dialect            :   dbConfig.DIALECT            // .(10220.02.2 RAM Change to Uppercase)

//           ,  operatorsAliases   :   false

//           ,  logging            :   console.log
//           ,  logging            :   function( str ) { console.log(str) }, // do your own logging
//           ,  logging            :   function( str ) { a = str }
             ,  logging            :   dbConfig.LOGGING            // .(10220.04.2)
                
             ,  pool:                                              
                {  max             :   dbConfig.POOL.max           // .(10220.02.3 Beg)
                ,  min             :   dbConfig.POOL.min
                ,  acquire         :   dbConfig.POOL.acquire
                ,  idle            :   dbConfig.POOL.idle          // .(10220.02.3 End)
                   }
                }
//          -----------------------------------------------------------------

       if ( dbConfig.DIALECTOPTIONS) {
            dbOptions.dialectOptions = dbConfig.DIALECTOPTIONS
            }
//          -----------------------------------------------------------------

        var sequelize              =   new Sequelize(
                dbConfig.DB
             ,  dbConfig.USER
             ,  dbConfig.PASSWORD
             ,  dbOptions
                )
        } catch( e ) {
         console.log( `dbConnect[ 8] ** Error: the file, '${aConfigFile} contains invalid Sequelize options.` )
         throw `Error: dbConnect[ 8] ** Error: the file, '${aConfigFile} contains invalid Sequelize options.`      
            }        
   // ------------------------------------------------------------------------------------------

//          sequelize.DBSN         =  aDBSN                        // .(10110.01.3).(10220.03.1 RAM aDBSN is also in sequelize.config.DBSN)
            sequelize.config.DBSN  =  dbConfig.DBSN                // .(10110.01.3).(10220.03.1 RAM aDBSN is also in sequelize.config.DBSN)

  return {  sequelize              :  sequelize   }                // .(10110.01.4)
            }

   module.exports                  =  dbConnect                    // .(10121.02.3)
// module.exports                  =                               //#.(10121.02.3)

//       {  Sequelize              :  Sequelize                    //#.(10110.01.4)
//       {  sequelize              :  sequelize                    // .(10110.01.4)
//          }                                                      //#.(10121.02.3)

   // ------------------------------------------------------------------------------------------

 if ('test1' == 'text1') {
      process.env.DBSN        = 'MySQL_AWS_IO'
//    process.env.DBSN_4Robin = 'MySQL_Local_IO'
//    process.env.DBSN_4ROBIN = 'MySQL_Local_IO'
//    process.env.DBSN_4BRUCE = 'MySQL_Local_IO'
      process.env.DB_LOGGING  =  true

  var pSequelize =  dbConnect( '' )                        //  db.config.json[ 'MySQL_AWS_IO'         ]                      if my.config.json does't  exist  and .env.DBSN        = 'MySQL_AWS_IO' 
//var pSequelize =  dbConnect( '' )                        //  db.config.json[ 'MySQL_Local_IO'       ]                      if my.config.json does't  exist  and .env.DBSN_4ROBIN = 'MySQL_Local_IO' 
//var pSequelize =  dbConnect( '' )                        //  my.config.json[ 'Local_MySQL_Practice' ]                      if my.config.json does    exist  and .env.DBSN        = 'MySQL_AWS_IO' 
//var pSequelize =  dbConnect( '' )                        //  my.config.json[ 'Local_MySQL_Practice' ]                      if my.config.json does    exist  and .env.DBSN_4ROBIN = 'MySQL_Local_IO' 
//var pSequelize =  dbConnect( '' )                        //  my.config.json[ 'Local_MySQL_Practice' ]                      if my.config.json does    exist
//var pSequelize =  dbConnect( 'db.custom.json' )          //  my.config.json[ 'Local_MySQL_Practice' ]                      if my.config.json does    exist  and  my.custom.json doesn't exist
//var pSequelize =  dbConnect( 'db.custom.json' )          //  db.custom.json[ 'MySQL_Local_IO'       ]                      if my.config.json does    exist  and  my.custom.json does    exist
//var pSequelize =  dbConnect( 'db.custom.json' )          //  db.custom.json[ 'MySQL_Local_IO'       ]                      if my.config.json doesn't exist  and  my.custom.json does    exist
//var pSequelize =  dbConnect( 'db.custom.json' )          //  *** The DB Config file, 'my.custom.json', was NOT found.      if my.config.json doesn't exist  and  my.custom.json doesn't exist
//var pSequelize =  dbConnect( 'MSSQL_Azure_IO' )          //  db.config.json[ 'MSSQL_Azure_IO'       ]                      ie .env.DBSN is ignored
//var pSequelize =  dbConnect( '' )                        //  ** Please specify a valid DBSN in the App '.env' file         if .env.DBSN is not defined
//var pSequelize =  dbConnect( 'foo' )                     //  *** The DBSN, 'foo', was NOT found in the App DB Config file. if .env.DBSN is not valid
//var pSequelize =  dbConnect( 'foo' )                     //  my.config.json[ 'Local_MySQL_Practice' ]                      if my.config.json does    exist
//var pSequelize =  dbConnect( '' )                        //  my.config.json[ 'Local_MySQL_Practice' ]                      if my.config.json does    exist

//    console.log( "dbConnect[91] pConfig", dbConfigs( ''      ) )
      console.log( `dbConnect[91] ${pSequelize.sequelize.config.DBSN}:`, pSequelize.sequelize.config )
      }
//    -------------------------------------------------------------------------------

 if ('test2' == 'text2') {
//    my.config.json exists
//    ------------------------------------------------------------
//var pDbConfig =  getDbConfig( '' )                       //  my.config.json[ 'Local_MySQL_Practice' ]
//var pDbConfig =  getDbConfig( 'foo' )                    //  my.config.json[ 'Local_MySQL_Practice' ]
//var pDbConfig =  getDbConfig( 'MySQL_Local_IO' )         //  my.config.json[ 'Local_MySQL_Practice' ]
//var pDbConfig =  getDbConfig( 'db.custom.json' )         //  my.config.json[ 'Local_MySQL_Practice' ]                  if db.custom.json does not exist
//var pDbConfig =  getDbConfig( 'db.custom.json' )         //  db.custom.json[ 'MySQL_Local_IO'       ]                  if db.custom.json does     exist

//    my.config.json does not exist
//    ------------------------------------------------------------
//var pDbConfig =  getDbConfig( '' )                       //  db.config.json[ 'MySQL_AWS_IO' ]                          ie the first DBSN in db.config 
//var pDbConfig =  getDbConfig( 'foo' )                    // '*** The DBSN, 'foo', was NOT found in the App DB Config file.       
  var pDbConfig =  getDbConfig( 'MSSQL_Azure_IO' )         //  db.config.json[ 'MSSQL_Azure_IO' ] 
//var pDbConfig =  getDbConfig( 'db.custom.json' )         // '*** The DB Config file, 'db.custom.json', was NOT found.' if db.custom.json does not exist
//var pDbConfig =  getDbConfig( 'db.custom.json' )         //  db.custom.json[ 'MySQL_Local_IO' ]                        if db.custom.json does     exist


      console.log( `dbConnect[92] pDbConfigs.${pDbConfig.DBSN}:`, pDbConfig )
      }

      module.exports = dbConnect

// -------------------------------------------------

function getDbConfig( aDBSN ) {

//  --------------------------------------

     if (aDBSN == '') {

     var aUSER = process.env[ 'username' ]             // .(10213.02.1)
     var aDBSN = process.env[ `DBSN_4${aUSER}` ]       // .(10213.02.2 Beg RAM get DBSN for ${username} if defined)
   if (! aDBSN )                                       // .(10213.02.3)

//   var aDBSN = process.env.DBSN || ''                //#.(10220.04.1 RAM Get's first DBSN is not in .env)
     var aDBSN = process.env.DBSN || 'none'            // .(10220.04.1 RAM Get's an error   if not in .env)

/*   if (aDBSN) {
         console.log( `    Using DBSN: ${aDBSN}\n` )
     } else {
         console.log( ` ** Please specify a DBSN in your .env file` )
         throw `Error: getDbConfig[ 6] ** Please specify a DBSN in your .env file.`      
         process.exit()
         }

//   var pConfig  = getDbConfigs( )[ aDBSN ]
     var pConfig  = getDbConfigs(    aDBSN )
     if (pConfig) { // pConfig.DBSN  =  aDBSN

  return pConfig

     } else {
         console.log( `*** The DBSN, '${aDBSN}', was NOT found in your db.config file.` )
         throw `Error: getDbConfig[ 7] *** The DBSN, '${aDBSN}', was NOT found in your db.config file.`      
         process.exit()
         }
*/
    } // eif aDBSN == ''
//  --------------------------------------

//       pConfig  =  getDbConfigs( )[ aDBSN ]
         pConfig  =  getDbConfigs(    aDBSN )
     if (pConfig) { // pConfig.DBSN  =  aDBSN 
         aDBSN    =  pConfig.DBSN
         console.log( `    Using DBSN: ${aDBSN}\n` )

     if (process.env.DB_LOGGING) {                          // .(10220.04.3 Beg)
         pConfig.LOGGING = process.env.DB_LOGGING
         }                                                  // .(10220.04.3 End)
     } else {
     if (aDBSN == 'none') {
         console.log( ` ** Please specify a valid DBSN in your '.env' file` )
         throw `Error: getDbConfig[ 8] ** Please specify a valid DBSN in your '.env' file.`      
     } else {
     var aMsg = aDBSN.match( /\./ ) 
              ? `*** The DB Config file, '${aDBSN}', was NOT found.`
              : `*** The DBSN, '${aDBSN}', was NOT found in the App DB Config file.`
         console.log( aMsg ) 
         throw `Error: getDbConfig[ 9] ${aMsg}`      
       } }

  return pConfig
         }
// -------------------------------------------

function getDbConfigs( aFile1 ) {  // aFile: aDBSN, '' or aCustom file
// const dbConfig     =  require( './db.config2.js' )( aDBSN );    // .(10121.02.3)
//   if (aFile1.match( /.json/ )) { aDBSN = "custom" } else { aDBSN = aFile1 }
     var pFS = require( 'fs' ), aFile2 = 'my.config.json', aDir = __dirname + '\\'
     var aConfigFile  =  aDir + 'db.config.json'
         aConfigFile  = (pFS.existsSync( aDir + aFile2 ) ? aDir + aFile2 : aConfigFile ); 
     if (aFile1.match( /.json/ )) {
         aConfigFile  = (pFS.existsSync( aDir + aFile1 ) ? aDir + aFile1 : aConfigFile );  
         }  
     if (pFS.existsSync( aConfigFile ) != true) {
         console.log( `getConfig[ 8]  ** Error: the file, '${aConfigFile} does NOT exist.` )
         throw `Error: getconfig[ 8]  ** Error: the file, '${aConfigFile} does NOT exist.`   
     } else { aFile1 = (aConfigFile == aDir + aFile2) ? '' : aFile1 }    // .(10220.04.2 Get rid of 'none' if my.config.json is used )
    try {     
     var pJSON = JSON.parse( pFS.readFileSync( aConfigFile, 'ASCII' ) )  
    } catch( e ) { 
         console.log( `getConfig[ 9]  ** Error: the file, '${aConfigFile} is not a valid JSON file.` )
         throw `Error: getconfig[ 9]  ** Error: the file, '${aConfigFile} is not a valid JSON file.`      
         }          
     var mDBSNs =  Object.keys( pJSON )
     var aDBSN  = (mDBSNs.length == 1)  ? mDBSNs[0] : aFile1 || mDBSNs[0]
     if (pJSON[ aDBSN ]) { pJSON[ aDBSN ].DBSN = aDBSN }
  return pJSON[ aDBSN ]   
         }
