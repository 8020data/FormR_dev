// -- -----------------------------------------------------------------------------------------------

//                                  BRANCH_HOME  =  process.env.FORMR_HOME                       // .(10301.06.1 RAM Gotta know where we are)
           FORMRs_3        =    `${ process.env.FORMR_HOME }/_3/FR.FNSs/`                           // .(10317.01.1 RAM FormR's Home) 
           jstUtils  = require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts2.3.njs` )          // .(10228.11.1 RAM Add global utility fns).(10314.02.1 RAM If global you can use anywhere while debugging)
           FORMRs_4           = `${ APP_HOME.replace( /[\\/]app[0-9]+[sc]/i, '' ) }/_4/FR.fns02s/`    // .(10317.01.1 RAM Server's Home if dynamically assigned) 
                                    jstUtils.setEnv(           )                                 // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)

// -- -----------------------------------------------------------------------------------------------

      var  pExpress     =  require( 'express'       );
      var  pCORS        =  require( 'cors'          );

                             trace( 'setProjectName', 'FormR' )                         // .(10301.01.1 RAM Set project name for parsing function call stack)
                             trace( 'setShowTraces' ,  process.env.DO_TRACING )         // .(10303.03.1 RAM Set bQuiet to true if false )
                             trace( "Begin" )                                           // .(10305.03.1)

// -- -----------------------------------------------------------------------------------------------

       var  pApp        =  pExpress()                                                   // .(10303.01.2)

            pApp.use(      pCORS( { origin: process.CORS_CLIENT_URL } ) );              // Allow for cross-origin client apps // .(10315.04.3 RAM Saved as RegEx in setEnv)

            pApp.use(      pExpress.json() );                                           // Parse requests of content-type - application/json .(10315.01.1 Was: pBodyParser.json())
            pApp.use(      pExpress.urlencoded( { extended: true } ) );                 // Parse requests of content-type - application/x-www-form-urlencoded  .(10315.01.1 Was: pBodyParser.urlencoded( { extended: true } ))

//    -----------------------------------------------------------------------------

//          pApp.use( '/', sendRoot_Welcome )                                           // Executes the callback controller for all paths starting with '/' and stops if next() is not called)
            pApp.get( '/', sendRoot_Welcome )                                           // Executes the callback controller only for the path '/')

            pApp.use(      require( './api/routes/routes.njs' ) )                       // .(10314.03.1 RAM Didn't get updated to The new, cleaner, way to set Routes)

            pApp.use(      sendError_InvalidRoute  )                                    // .(10124.01.4 RAM Finally, send error if all routes fail)

                           require( './api/models/index.js' ).sequelize.sync();         // .(Initializes tables and test data if necessary)

                           shoRoutes( pApp, process.env.SHOW_ROUTES )

//    -----------------------------------------------------------------------------

       var  nPort       =  process.env.PORT || 8080;

            pApp.listen(   nPort, showServer_Start  )                                   // set port, listen for requests

// -- -----------------------------------------------------------------------------------------------

  function  showServer_Start( ) {
   console .log( `\n  The Express Server is running at: http://localhost:${nPort}.\n` );
            } // eof showServer_Start
//          ----------------------------------------------

  function  sendRoot_Welcome( req, res, next ) { trace()                                // .(10218.05.1 RAM Simplest route )
       var  aURL     =  req.originalUrl || ''
        if (aURL == '/') {
            res.send(  `  Welcome to the /${process.env.APP_NAME} application.` )       // .(10218.05.2 RAM It was silent with response below)
   } else { next() }
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

