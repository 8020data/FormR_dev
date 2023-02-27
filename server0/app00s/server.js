const express     = require( 'express'     );
const bodyParser  = require( 'body-parser' );
const cors        = require( 'cors'        );

// -- -----------------------------------------------------------------------------------------------

const app         = express();

      setEnv()                                                 // .(01012.01.1 RAM My way)

  var corsOptions = {
//      origin    : 'http://localhost:8081'                   //#.(01016.01.1)
//      origin    :  process.env.USR_URL                      //#.(01016.01.1)
//      origin    :  chkOrigin                                //#.(01108.05.4 function, see https://stackabuse.com/handling-cors-with-node-js/)
        origin    :  chkURL( process.env.CORS_CLIENT_URL )    // .(01016.01.1 RAM Client URL)
        };
      app.use( cors( corsOptions ) );

      app.use( bodyParser.json() );                            // parse requests of content-type - application/json
      app.use( bodyParser.urlencoded( { extended: true } ) );  // parse requests of content-type - application/x-www-form-urlencoded

const db          =  require( './api/models' );                // database

      db.sequelize.sync( );
//    db.sequelize.sync( { force: true } ).then( () => {       // force: true will drop the table if it already exists
//      console.log( "Drop and Resync Database with { force: true }" );
//      initial();
//      } );

      app.get( '/', ( req, res ) => {                          // simplest route
        var aApp = __dirname.split( /[\/\\\\]/ ).splice(-2,2).join( '/' )           // .(01012.02.1 RAM)
        res.send( `Welcome to BezKoder3/${aApp} application.` )                     // .(10218.05.1 RAM It was silent with response below) 
//      res.json( { message: `Welcome to BezKoder3/${aApp} application.` } );       // .(01012.02.2 RAM)
        } );

      require(   './api/routes/auth.routes'     )( app );      // app routes
      require(   './api/routes/user.routes'     )( app );
      require(   './api/routes/turorial.routes' )( app );      // .(01012.03.1 RAM Add Tutorial routes)

const PORT        = process.env.PORT || 8080;                  // set port, listen for requests
      app.listen( PORT, () => {
        console.log( `Server is running on port ${PORT}.` );
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
   }                                                           // .(01012.01.2 End)
// -- -----------------------------------------------------------------------------------------------

function chkURL( aURL ) {                                      // .(10218.04.1 Beg RAM)            
  if (aURL.match( /^\// )) {
    return new RegExp(aURL.substr(1).replace(/\/$/, ""));
  } else {
    return aURL;
    }
  }                                                            // .(10218.04.1 End)            
// -- -----------------------------------------------------------------------------------------------

