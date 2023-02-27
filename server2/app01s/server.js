                                       BRANCH_HOME  =  process.env.FORMR_HOME           // .(10301.06.1 RAM Gotta know where we are)
           jstUtils     =  require( `${BRANCH_HOME}/_3/NJSs/JScripts2.3.njs` )          // .(10228.11.1 RAM Add global utility fns).(10314.02.1 RAM If global you can use anywhere while debugging)
           APP_HOME     =  jstUtils.setEnv( __dirname ); // __dirname = APP_HOME        // .(01012.01.1 RAM My way).(10316.12.6)
//         APP_DIR      = `server2/app01s`                                              // .(10304.01.1 RAM Will this even be enough?)

      var  pExpress     =  require( 'express'       );
      var  pBodyParser  =  require( 'body-parser'   );
      var  pCORS        =  require( 'cors'          );

                           trace(   'setProjectName', 'FormR' )                         // .(10301.01.1 RAM Set project name for parsing function call stack)
                           trace(   'setShowTraces' ,  true   )                         // .(10303.03.1 RAM Set bQuiet to true if false )
                           trace(   "Begin" )                                           // .(10305.03.1)

// -- -----------------------------------------------------------------------------------------------

       var  pApp         =  pExpress()                                                  // .(10303.01.2)
           
            pApp.use( pCORS( { origin: process.CORS_CLIENT_URL } ) );                // Allow for cross-origin client apps

            pApp.use( pExpress.json() );                                                // Parse requests of content-type - application/json
            pApp.use( pExpress.urlencoded( { extended: true } ) );                      // Parse requests of content-type - application/x-www-form-urlencoded

       var  pDB          =  require( './api/models/index.js' );                         // Set up the database
            pDB.sequelize.sync( );                                                      // Connect to the database

//    -----------------------------------------------------------------------------

            pApp.get( '/',  sendRoot_Welcome )

//          require( './api/routes/routes.njs' )( pApp )                                // .(10301.10.1 RAM The big deal)
            pApp.use( require( './api/routes/routes.njs' ) )                            // .(10314.03.1 RAM Didn't get updated to The new, cleaner, way to set Routes)

            pApp.use(       sendError_InvalidRoute  )                                   // .(10124.01.4 RAM Finally, send error if all routes fail)

//    -----------------------------------------------------------------------------

       var  nPort        =  process.env.PORT || 8080;

            pApp.listen(    nPort, showServer_Start  )                                  // set port, listen for requests

            shoRoutes( pApp, true ) // process.env.SHOW_ROUTES )

// -- -----------------------------------------------------------------------------------------------

     const  pRole        =  pDB.role;

   function initial( ) {
            pRole.create( { id: 1, name: "user"      } );
            pRole.create( { id: 2, name: "moderator" } );
            pRole.create( { id: 3, name: "admin"     } );
            }
// -- -----------------------------------------------------------------------------------------------

  function  showServer_Start( ) {
   console .log( `\n  The Express Server is running at: http://localhost:${nPort}.\n` );
            } // eof showServer_Start
//          ----------------------------------------------

  function  sendRoot_Welcome( req, res ) { trace()                                      // .(10218.05.1 RAM Simplest route )
            res.send(  `  Welcome to the /${process.env.APP_NAME} application.` )       // .(10218.05.2 RAM It was silent with response below)
            } // eof sendRoot_Welcome
//          ----------------------------------------------

  function  sendError_InvalidRoute( req, res ) {                                        // .(10124.01.5 RAM Beg: Write sendError_InvalidRoute)
       var  aURL     =  req.originalUrl || ''
       var  aMethod  =  req.method;       trace( `${aMethod} ${aURL}` )                 // .(10227.09.4 RAM)
       var  aMsg     = `Invalid route: ${aMethod} ${aURL}`;
            res.status(404).send( `server.js 404: ${aMsg}` );                           // .(10210.06.1 RAM Get it right).(10227.08.2 Hard code server.js[91])

            } // eof sendError_InvalidRoute                                             // .(10124.01.5 RAM End)
//          ----------------------------------------------

// -- -----------------------------------------------------------------------------------------------

function chkURL(aURL) {
     if (aURL.match(/^\//)) {
  return new RegExp(aURL.substr(1).replace(/\/$/, ""));
     } else {
  return aURL;
         }
      }