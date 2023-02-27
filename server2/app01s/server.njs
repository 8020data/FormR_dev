                                       BRANCH_HOME = process.env.FORMR_HOME                // .(10301.06.1 RAM Gotta know where we are)
                           require( `${BRANCH_HOME}/_3/NJSs/JScripts2.3.njs` ) // .Help()  // .(10228.11.1 RAM Add global utility fns)
                           trace(   'setProjectName', 'FormR' )                            // .(10301.01.1 RAM Set project name for parsing function call stack)

      var  express      =  require( 'express'     );
      var  bodyParser   =  require( 'body-parser' );
      var  cors         =  require( 'cors'        );

// -- -----------------------------------------------------------------------------------------------

       var  app         =  express();

            setEnv()                                                                   // .(01012.01.1 RAM My way)

       var  corsOptions = {
                origin  :  chkURL( process.env.CORS_CLIENT_URL )                       // .(01016.01.1 RAM Client URL)
            };
            app.use( cors( corsOptions ) );

            app.use( bodyParser.json() );                                               // Parse requests of content-type - application/json
            app.use( bodyParser.urlencoded( { extended: true } ) );                     // Parse requests of content-type - application/x-www-form-urlencoded

       var  db          =  require( './api/models/index.js' );                          // Sets up the database
            db.sequelize.sync( );                                                       // Connects to the database

//    -----------------------------------------------------------------------------

            app.get( '/', ( req, res ) => {                                             // simplest route
       var  aApp =  __dirname.split( /[\\\/]/ ).splice(-4,4).join( '/' )                // .(01012.02.1 RAM)
            res.send(  `  Welcome to the /${aApp} application.` )                       // .(10218.05.1 RAM It was silent with response below)
            } );

            require( './api/routes/routes.njs' )( app, 'user' )                         // .(10301.10.1 RAM The big deal)

            app.use( sendError_InvalidRoute )                                           // .(10124.01.4 RAM Finally, send error if all routes fail)

//    -----------------------------------------------------------------------------

       var  PORT      =  process.env.PORT || 8080;                                      // set port, listen for requests
            app.listen(  PORT, () => {
            console.log( `  The Express Server is running at: http://localhost:${PORT}.\n` );

            shoRoutes( app, process.env.SHOW_ROUTES )

            } );
// -- -----------------------------------------------------------------------------------------------

  function  setEnv() { // trace()                                                       // .(01012.01.2 Beg)
       if (!process.env.PORT) {
       var  mEnv = require( 'fs' ).readFileSync( __dirname + '/.env', 'ASCII' ).split( '\n' )
            mEnv.map( aEnv => { if (aEnv) { var v = (aEnv + '=').split( '=' );
            process.env[ v[0] ] = v[1].replace( /\r/, '' ) } } )
            }
        }                                                                               // .(01012.01.2 End)
//    -----------------------------------------------------------------------------

  function  chkURL( aURL ) {                                                            // .(10218.04.1 Beg RAM)
        if (aURL.match( /^\// )) {
    return  new RegExp(aURL.substr(1).replace(/\/$/, ""));
        } else {
    return  aURL;
            }
        }                                                                              // .(10218.04.1 End)
//    -----------------------------------------------------------------------------

  function  shoRoutes( pApp, aShoEm ) {
        if (String(aShoEm) != 'true') { return }                                               // || ! require( 'fs' ).existsSync( '../node_modules/express-list-endpoints' ) ) { return }
 try { var  listRoutes  =  require( 'express-list-endpoints' ); } catch(e) {                   // .(10224.02.1 RAM Bruce doesn't have it loaded)
            console.log( " ** The module, express-list-endpoints, is not installed"); return } // .(10224.02.1 RAM Above no working because it running in Master folder)
            listRoutes( pApp ).forEach( pRoute => { console.log( fmtRoute( pRoute ) ) } )
  function  fmtRoute( pRoute ) {
       var  aPath =   pRoute.path, aStr = '', i=0
            pRoute.middleware.map( aMiddle => {  // aController ?
            pRoute.methods   .map( aMethod => {
//          aStr  += `\n    ${ aMethod.padEnd( 6 ) } ${ aPath.padEnd( 30 ) } ${ aMiddle } (${ i++ })` } )
            aStr  += `\n    ${ aMethod.padEnd( 6 ) } ${ aPath.padEnd( 30 ) } ${ aMiddle } (${ i++ })` } )
            } )
     return aStr.substr(1) // + "\n"
            } }
// -- -----------------------------------------------------------------------------------------------

  function  sendError_InvalidRoute( req, res ) {                                    // .(10124.01.5 RAM Beg: Write sendError_InvalidRoute)
       var  aURL    =  req.originalUrl || ''
       var  aMethod =  req.method; trace( `${aMethod} ${aURL}` )                    // .(10227.09.4 RAM)
       var  aMsg    = `Invalid route: ${aMethod} ${aURL}`;
            res.status(404).send( `server.js[91] 404: ${aMsg}` );                   // .(10210.06.1 RAM Get it right).(10227.08.2 Hard code server.js[91])

            } // eof sendError_InvalidRoute                                         // .(10124.01.5 RAM End)
//          ----------------------------------------------
// -------------------------------------------------------------------------------------------------
