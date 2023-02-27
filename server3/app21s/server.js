   const    express     =   require( 'express' );
   const    listRoutes  =   require( 'express-list-endpoints' );

   const    app         =   new express();

//--- -------------------------------------------------------------------------------------

     var    nApp        =   21

// const    server_app  =   require( './server_app_v01.njs' );
// const    server_app  =   require( './server_app_v02.njs' );
// const    server_app  =   require( './server_app_v03.njs' );
// const    server_app  =   require( './server_app_v04.njs' );
// const    server_app  =   require( './server_app_v05.njs' );
// const    server_app  =   require( './server_app_v06.njs' );  process.env.PORT = 50326
// const    server_app  =   require( './server_app_v07.njs' );  process.env.PORT = 50327
// const    server_app  =   require( './server_app_v08.njs' );  process.env.PORT = 50328
// const    server_app  =   require( './server_app_v09.njs' );  process.env.PORT = 50329
// const    server_app  =   require( './server_app_v10.njs' );  process.env.PORT = 50330
// const    server_app  =   require( './server_app_v11.njs' );  process.env.PORT = 50331
// const    server_app  =   require( './server_app_v21.njs' );  process.env.PORT = 50341

     var    nApp        =  (process.argv[2] || nApp) * 1, aExt = '.njs'
     var    aApp        =  (nApp > 9) ? `${nApp}` : `0${nApp}`
   const    server_app  =   require( `./server_app_v${aApp}${aExt}` );  process.env.PORT = 50320 + nApp

            setEnv()

//          ----------  =   --------------------------------------------------------

//                      app.use( bodyParser.json( ) );                              // parse requests of content-type - application/json
//                      app.use( bodyParser.urlencoded( { extended: true } ) );     // parse requests of content-type - application/x-www-form-urlencoded
                        app.use(    express.json() );
                        app.use(    express.urlencoded( { extended: true } ) );     // Included in expres 4.16+
//                      app.use(    express.urlencoded(                    ) );     // body-parser deprecated undefined extended: provide extended option

//                      app.engine( 'html', require('ejs').renderFile );            // render jade templates as html

//          ----------  =   --------------------------------------------------------

            server_app( app )

                        app.use( sendError_InvalidRoute )                           // .(10124.01.4 RAM Finally, send error if all routes fail)

//          ----------  =   --------------------------------------------------------

   const    nPort       =   process.env.PORT || 8080;                               // set port, listen for requests

        app.listen( nPort, () => {
            console.log(   `\nServer2 App19s is running on port ${nPort}.\n` );
                            listRoutes( app ).forEach( pRoute => { console.log( fmtRoute( pRoute ) ) } )

            } );  // eof app.listen( ... )
//--- -------------------------------------------------------------------------------------

  function  fmtRoute( pRoute ) {
       var  aPath =   pRoute.path, aStr = '', i=0
            pRoute.middleware.map( aMiddle => {  // aController ?
            pRoute.methods   .map( aMethod => {
            aStr += `\n ${ take(6, aMethod) } ${ take(35, aPath) } ${ aMiddle } (${i++})` } )
            } )
            return aStr.substr(1)
            }
//          ------------------------------------------------------

   function sendError_InvalidRoute( req, res ) {                                    // .(10124.01.5 RAM Beg: Write sendError_InvalidRoute)
        var aURL        =   req.originalUrl || ''
        var aMethod     =   req.method
        var aMsg        =  `Invalid route: ${aMethod} ${aURL}`
            res.status(404).send( `server_app_v3[95] 404: ${aMsg}` );

            } // eof sendError_InvalidRoute                                         // .(10124.01.5 RAM End)
//          ----------------------------------------------

  function  setEnv() {                                                              // .(01012.01.2 Beg RAM)

       if (!process.env.PORT) {
        var mEnv = require( 'fs' )
             .readFileSync( `${__dirname}/.env`, 'ASCII' )
             .split( '\n' );
            mEnv.map( ( aEnv ) => {
        if (aEnv) {
        var v = (aEnv + '=' ).split( '=' );
            process.env[v[0]] = v[1].replace( /\r/, '' );
            } // eif aEnv

          } ) // eol mEnv.map( ... )
        } // eif !process.env.PORT
      } // eof setEnv                                                               // .(01012.01.2 End)
// -- --------------------------------------------------------------------------------

  function take( n,a ) { return `${a}                                                    `.substr(0,n) }