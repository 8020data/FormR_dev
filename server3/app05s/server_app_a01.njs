//nodeJS Express
/*\
##=========+====================+================================================+
##RD         server_app         | Sample Server App, V1
##RFILE    +====================+=======+=================+======+===============+
##FD   ET021-server_app_v01.js  |   9479|  1/24/21  3:38p |   136| v2.0.10124.01
##DESC     .--------------------+-------+-----------------+------+---------------+
#            Sample ExpressJS app using session variables.  Called by server.js
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2021 8020 Data * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+-------+-------------------+------+-----------+
#            app.get(  '/', ...         |
#                checkURL               | Check session counter
#                sendResponse           | Display counter if defined
#            app.use( )                 |
#                sendError_InvalidRoute | Display bad URL
#
##CHGS     .--------------------+-------+-------------------+------+-----------+
# .(10123.01  1/23/21 RAM  5:26p| Moved app to separate file
# .(10123.02  1/23/21 RAM  6:00p| Keep sendError_InvalidRoute in server.js

##PRGM     +====================+===============================================+
##ID 21.100. Main               |
##SRCE     +====================+===============================================+
\*/
        var session             =   require( 'express-session' );

//----- ------------------------------------------------------------

//      var ssn                                                                     //#.(10123.03.1 RAM Not here)

function server_app( app ) {                                                        // .(10123.01.1 RAM Beg Moved app to seperate file)

//      ----------------------------------------------------------------------------

        app.use( session( { secret : 'XASDASDA'  
//                        , secure : app.get('env') === 'production'                // .(10210.07.1 RAM Somebody's suggestion)
                          } ) ) 
        var ssn                                                                     //#.(10123.03.1 RAM Set global session var here)
//          ssn = { }                                                               //#.(10123.03.1 RAM Not here, either)

//      --- ----------------------------------------------

        app.get( '/',       checkURL, sendResponse )
//      app.use(            sendError_InvalidRoute )                                // .(10123.02.1)

// -- --------------------------------------------------------------------------------

  function  checkURL(  req, res, next ) {

            ssn         =   req.session;

        if (typeof(ssn.cnt) == 'undefined') {
        var aMsg        =  `First time: ssn.cnt is undefined`
            res.status(200).send( `server_app_v01[55] 200: ${aMsg}` );
            ssn.cnt     =   0;
            return          // i.e. don't call next(), Headers won't be set after res.send
            }
            ssn.cnt     =   ssn.cnt + 1
            next()          // call sendResponse()
            } // eof checkURL
//          -------------------------------------------------------

  function  sendResponse(   req, res, next ) {
        var aURL        =   req.originalUrl || ''
        var aMsg        =  `Valid route: ${aURL}, ssn.cnt: ${ssn.cnt}`
            res.status(200).send( `server[26] 200: ${aMsg}` );

            } // eof sendResponse
//          -------------------------------------------------------

/*function  sendError_InvalidRoute( req, res ) {                                        //#.(10123.02.2 Beg)
        var aURL        =   req.originalUrl || ''
        var aMethod     =   req.method
        var aMsg        =  `Invalid route: ${aMethod} ${aURL}`
            res.status(404).send( `server[10] 404: ${aMsg}` );

            } // eof sendError_InvalidRoute */                                          //#.(10123.02.2 End)
//          -------------------------------------------------------
        } // eof sserver_app
//      ------------------------------------------------------------

        module.exports   =   server_app

