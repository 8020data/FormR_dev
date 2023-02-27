// ------------------------------------------------------------------------------------------

function dbConnect( aDBSN ) {                                      // .(10121.02.3 RAM A connection for each Table?)
        
   const    Sequelize =  require( 'sequelize' );

   const    dbConfig  =  getDbConfig( aDBSN )                      // .(10220.01.1 RAM Move function into this script)

//          -------------------------------------------------------------------------

            dbConfig.POOL          =   dbConfig.POOL               // .(10220.02.1 Beg RAM Make POOL optional)
                                   ?   dbConfig.POOL 
                                   : { max    : 5
                                     , min    : 0
                                     , acquire: 30000
                                     , idle   : 10000
                                       }                           // .(10220.02.1 End)
            
            dbConfig.LOGGING       =   dbConfig.LOGGING            // .(10220.04.1 Beg RAM Add LOGGING option)
                                   ?   dbConfig.LOGGING 
                                   :  'false'
                                                                  
            dbConfig.LOGGING       =  (dbConfig.LOGGING == 'true' ) ?  console.log                 : dbConfig.LOGGING                                      
            dbConfig.LOGGING       =  (dbConfig.LOGGING == 'false') ?  function( str ) { a = str } : dbConfig.LOGGING                                      
                                                                   // .(10220.04.1 End)

//          -------------------------------------------------------------------------

     try {
     var    dbOptions =
             {  host               :   dbConfig.HOST
             ,  dialect            :   dbConfig.DIALECT            // .(10220.02.2 RAM Change to Uppercase)

//           ,  logging            :   console.log
//           ,  logging            :   function( str ) { console.log( str ) }, // do your own logging
//           ,  logging            :   function( str ) { a = str }
             ,  logging            :   dbConfig.LOGGING            // .(10220.04.2)
                
             ,  pool:                                              
                {  max             :   dbConfig.POOL.max           // .(10220.02.3 Beg)
                ,  min             :   dbConfig.POOL.min
                ,  acquire         :   dbConfig.POOL.acquire
                ,  idle            :   dbConfig.POOL.idle          // .(10220.02.3 End)
                   }
                }  // eob dbOptions 
//          -----------------------------------------------------------------

       if ( dbConfig.DIALECTOPTIONS) {
            dbOptions.dialectOptions = dbConfig.DIALECTOPTIONS
            }
//          -----------------------------------------------------------------

        var sequelize              =   new Sequelize (
                dbConfig.DB
             ,  dbConfig.USER
             ,  dbConfig.PASSWORD
             ,  dbOptions
                )
        } catch( e ) {
         console.log( `dbConnect[ 8] ** Error: the file, '${aConfigFile} contains invalid Sequelize options.` )
         throw `Error: dbConnect[ 8] ** Error: the file, '${aConfigFile} contains invalid Sequelize options.`      
            }        
//          -------------------------------------------------------------------------

            sequelize.config.DBSN  =  dbConfig.DBSN                // .(10110.01.3).(10220.03.1 RAM aDBSN is also in sequelize.config.DBSN)

  return {  sequelize              :  sequelize                    // .(10110.01.4)
         ,  Sequelize              :  Sequelize   }

            } 

   module.exports                  =  dbConnect                    // .(10121.02.3)
//          }                                                      //#.(10121.02.3)

// ------------------------------------------------------------------------------------------

      module.exports = dbConnect

// -------------------------------------------------

function getDbConfig( aDBSN ) {

//  --------------------------------------

     if (aDBSN == '') {

     var aUSER = process.env[ 'username' ]             // .(10213.02.1)
     var aDBSN = process.env[ `DBSN_4${aUSER}` ]       // .(10213.02.2 Beg RAM get DBSN for ${username} if defined)
   if (! aDBSN ) {                                     // .(10213.02.3)
     var aDBSN = process.env.DBSN || 'none'            // .(10220.04.1 RAM Get's an error   if not in .env)
         }
       } // eif aDBSN == ''
//  --------------------------------------

         pConfig  =  getDbConfigs(     aDBSN     )
     if (pConfig) { 
         aDBSN    =  pConfig.DBSN
         console.log( `\n  Using the Database DBSN: ${aDBSN}` )

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
//  --------------------------------------

  return pConfig
         }
// ---------------------------------------------------------

function getDbConfigs( aFile1 ) {  // aFile: aDBSN, '' or aCustom file
     var pFS = require( 'fs' ), aFile2 = 'my.config.json', aDir = __dirname + '\\'
     var aConfigFile  =  aDir + 'db.config.json'; aFile1 = aFile1.replace( /.+config\//, '' )
         aConfigFile  = (pFS.existsSync( aDir + aFile2 ) ? aDir + aFile2 : aConfigFile ); 
     if (aFile1.match( /.json/ )) {
         aConfigFile  = (pFS.existsSync( aDir + aFile1 ) ? aDir + aFile1 : aConfigFile );  
         }  
     if (pFS.existsSync( aConfigFile ) != true) {
         console.log(   `getConfig[ 8]  ** Error: the file, '${aConfigFile} does NOT exist.` )
         throw   `Error: getconfig[ 8]  ** Error: the file, '${aConfigFile} does NOT exist.`   
     } else { aFile1  = (aConfigFile == aDir + aFile2) ? '' : aFile1 }    // .(10220.04.2 Get rid of 'none' if my.config.json is used )
    try {     
     var pJSON  =  JSON.parse( pFS.readFileSync( aConfigFile, 'ASCII' ) )  
    } catch( e ) { 
         console.log(   `getConfig[ 9]  ** Error: the file, '${aConfigFile} is not a valid JSON file.` )
         throw   `Error: getconfig[ 9]  ** Error: the file, '${aConfigFile} is not a valid JSON file.`      
         }          
     if (pJSON['HOST']) { aDBSN = `${pJSON['DIALECT']}_${pJSON['HOST'].replace(/[^\w]/g, '').substr(0,5)}_${pJSON['DB']}` 
    var  pJSON1 = { };   pJSON1[ aDBSN ] = pJSON; pJSON = pJSON1                                                       // .(10220.06.1 If there is no DBSN)
         }
     var mDBSNs =  Object.keys( pJSON )
     var aDBSN  = (mDBSNs.length == 1)  ? mDBSNs[0] : aFile1 || mDBSNs[0]
     if (pJSON[ aDBSN ]) { pJSON[ aDBSN ].DBSN = aDBSN }
  return pJSON[ aDBSN ]   
         }
// ---------------------------------------------------------
// ------------------------------------------------------------------------------------------
