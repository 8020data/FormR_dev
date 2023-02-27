   const    express     =   require( 'express' );
   const    listRoutes  =   require( 'express-list-endpoints' );
   const    cookieParser=   require( 'cookie-parser' );                                 // .(10210.07.2)

   const    app         =   new express();

//--- -------------------------------------------------------------------------------------

     var    nApp        =   2

// const    server_app  =   require( './server_app_a01' );
// const    server_app  =   require( './server_app_a02' );
// const    server_app  =   require( './server_app_a03' );
// const    server_app  =   require( './server_app_a04' );
// const    server_app  =   require( './server_app_a05' );
// const    server_app  =   require( './server_app_a06' );  process.env.PORT = 50326
// const    server_app  =   require( './server_app_a07' );  process.env.PORT = 50327
// const    server_app  =   require( './server_app_a08' );  process.env.PORT = 50328
// const    server_app  =   require( './server_app_a09' );  process.env.PORT = 50329
// const    server_app  =   require( './server_app_a10' );  process.env.PORT = 50330
// const    server_app  =   require( './server_app_a11' );  process.env.PORT = 50331

     var    aExt        =  '.njs'                                                   // .(10210.05.1 RAM 5th times I've added this)                
     var    nApp        =  (process.argv[2] || nApp) * 1;
     var    aApp        =  (nApp > 9) ? `${nApp}` : `0${nApp}`
   const    server_app  =   require( `./server_app_a${aApp}${aExt}` );  process.env.PORT = 50320 + nApp

            setEnv()

//          ----------  =   --------------------------------------------------------

//                      app.use( bodyParser.json( ) );                              // parse requests of content-type - application/json
//                      app.use( bodyParser.urlencoded( { extended: true } ) );     // parse requests of content-type - application/x-www-form-urlencoded
                        app.use(    express.json() );
                        app.use(    express.urlencoded( { extended: true } ) );     // Included in expres 4.16+
//                      app.use(    express.urlencoded(                    ) );     // body-parser deprecated undefined extended: provide extended option
                        app.use(    cookieParser() );                               // .(10210.07.3 RAM Is this required for sessions to work?)                

//                      app.engine( 'html', require('ejs').renderFile );            // render jade templates as html

//          ----------  =   --------------------------------------------------------

            server_app( app )

                        app.use( sendError_InvalidRoute )                           // .(10124.01.4 RAM Finally, send error if all routes fail)

//          ----------  =   --------------------------------------------------------

   const    nPort       =   process.env.PORT || 8080;                               // set port, listen for requests

        app.listen( nPort, () => {
            console.log(   `Server2 App05s.${aApp} is running on port ${nPort}.` );
                            listRoutes( app ).forEach( pRoute => { console.log( fmtRoute( pRoute ) ) } )

            } );  // eof app.listen( ... )
//--- -------------------------------------------------------------------------------------

  function  fmtRoute( pRoute ) {
       var  aPath =   pRoute.path, aStr = '', i=0
            pRoute.middleware.map( aMiddle => {  // aController ?
            pRoute.methods   .map( aMethod => {
            aStr += `\n ${ take(6, aMethod) } ${ take(25, aPath) } ${ aMiddle } (${i++})` } )
            } )
            return aStr.substr(1)
            }
//          ------------------------------------------------------

   function sendError_InvalidRoute( req, res ) {                                    // .(10124.01.5 RAM Beg: Write sendError_InvalidRoute)
        var aURL        =   req.originalUrl || ''
        var aMethod     =   req.method
        var aMsg        =  `Invalid route: ${aMethod} ${aURL}`
            res.status(404).send( `server_app_v${aApp}[70] 404: ${aMsg}` );         // .(10210.06.1 RAM Get it right)

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



  