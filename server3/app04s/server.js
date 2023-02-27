                     require( `${process.env.FORMR_HOME}/_2/NJSs/JScripts2.2.njs` ) // .Help()  // .(10228.11.1 RAM Add global utility fns)
                    
const express     =  require( 'express'     );
const bodyParser  =  require( 'body-parser' );
const cors        =  require( 'cors'        ); 

// -- -----------------------------------------------------------------------------------------------

const app         =  express();

      setEnv(); bQuiet = 1                                    // .(01012.01.1 RAM My way)

  var corsOptions = {
        origin    :  chkURL( process.env.CORS_CLIENT_URL )    // .(01016.01.1 RAM Client URL)
        };
      app.use( cors( corsOptions ) );

      app.use( bodyParser.json() );                            // parse requests of content-type - application/json
      app.use( bodyParser.urlencoded( { extended: true } ) );  // parse requests of content-type - application/x-www-form-urlencoded

const db          =  require( './api/models/index.js' );       // database

      db.sequelize.sync( );            trace( "db.connected" ) 

      app.get( '/', ( req, res ) => {  trace( )                // simplest route
        var aApp = __dirname.split( /[\/\\\\]/ ).splice(-2,2).join( '/' )           // .(01012.02.1 RAM)
        res.send( `Welcome to BezKoder3/${aApp} application.` )                     // .(10218.05.1 RAM It was silent with response below)
//      res.json( { message: `Welcome to BezKoder3/${aApp} application.` } );       // .(01012.02.2 RAM)
        } );

      require(   './api/routes/auth.routes.js'     )( app );   // app routes
      require(   './api/routes/user.routes.js'     )( app );
//    require(   './api/routes/turorial.routes.js' )( app );   // .(01012.03.1 RAM Add Tutorial routes)

      app.use( sendError_InvalidRoute )                        // .(10124.01.4 RAM Finally, send error if all routes fail)

                                        trace(  "Starting Express Server" )
const PORT        = process.env.PORT || 8080;                  // set port, listen for requests
      app.listen( PORT, () => {
      console.log( `\n  Server2 App01s is running on port ${PORT}.\n` );

      shoRoutes( app, bQuiet ) // process.env.DB_LOGGING )

      } );
// -- -----------------------------------------------------------------------------------------------

const Role        = db.role;

   function initial() {
            Role.create( { id: 1, name: "user"      } );
            Role.create( { id: 2, name: "moderator" } );
            Role.create( { id: 3, name: "admin"     } );
            }
// -- -----------------------------------------------------------------------------------------------

   function setEnv() {                                            // .(01012.01.2 Beg)
       if (!process.env.PORT) {
        var mEnv = require( 'fs' ).readFileSync( __dirname + '/.env', 'ASCII' ).split( '\n' )
            mEnv.map( aEnv => { if (aEnv) { var v = (aEnv + '=').split( '=' );
            process.env[ v[0] ] = v[1].replace( /\r/, '' ) } } )
            }
        }                                                      // .(01012.01.2 End)
// -- -----------------------------------------------------------------------------------------------

   function chkURL( aURL ) {                                   // .(10218.04.1 Beg RAM)
        if (aURL.match( /^\// )) {
     return new RegExp(aURL.substr(1).replace(/\/$/, ""));
        } else {
     return aURL;
            }
        }                                                      // .(10218.04.1 End)
// -- -----------------------------------------------------------------------------------------------

   function shoRoutes( pApp, aShoEm ) {
        if (String(aShoEm) != 'true') { return } // || ! require( 'fs' ).existsSync( '../node_modules/express-list-endpoints' ) ) { return }  // .(10224.02.1 RAM Bruce doesn't have it loaded)
  try { var listRoutes  =  require( 'express-list-endpoints' ); } catch(e) { console.log( " ** The module, express-list-endpoints, is not installed"); return } // .(10224.02.1 RAM Above no working because it running in Master folder)
            listRoutes( pApp ).forEach( pRoute => { console.log( fmtRoute( pRoute ) ) } )
   function fmtRoute( pRoute ) {
        var aPath =   pRoute.path, aStr = '', i=0
            pRoute.middleware.map( aMiddle => {  // aController ?
            pRoute.methods   .map( aMethod => {
            aStr += `\n    ${ aMethod.padEnd( 6 ) } ${ aPath.padEnd( 30 ) } ${ aMiddle } (${ i++ })` } )
            } )
     return aStr.substr(1) + "\n"
            } }
// -- -----------------------------------------------------------------------------------------------

   function sendError_InvalidRoute( req, res ) {                                    // .(10124.01.5 RAM Beg: Write sendError_InvalidRoute)
        var aURL        =   req.originalUrl || ''
        var aMethod     =   req.method; trace( `${aMethod} ${aURL}` )               // .(10227.09.4 RAM)
        var aMsg        =  `Invalid route: ${aMethod} ${aURL}`; 
            res.status(404).send( `server.js[91] 404: ${aMsg}` );                   // .(10210.06.1 RAM Get it right).(10227.08.2 Hard code server.js[91])

            } // eof sendError_InvalidRoute                                         // .(10124.01.5 RAM End)
//          ----------------------------------------------
// -------------------------------------------------------------------------------------------------



