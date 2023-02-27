//nodeJS Express
/*\
##=========+====================+================================================+
##RD         server_app         | Sample Server App, V4
##RFILE    +====================+=======+=================+======+===============+
##FD   ET021-server_app_v4.js   |   9479|  1/24/21  3:38p |   136| v2.0.10124.01
##DESC     .--------------------+-------+-----------------+------+---------------+
#            Sample ExpressJS app using session variables.  Called by server.js
#            Handles multiple user login and their roles
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2021 8020 Data * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+-------+-------------------+------+-----------+
#            app.get(  '/', ... | Go to  /login.html if no session
#                setUsers, checkUser
#            app.get(  '/login' | Render /login.html
#            app.post( '/login' | Handle  login data;, check if a valid user
#            app.get(  '/admin' | Check if user has admin role
#            app.get(  '/next'  | Increment user's page count
#            app.get(  '/user'  | Check if user has user role
#            app.get(  '/logout'| Clear session
##CHGS     .--------------------+-------+-------------------+------+-----------+
# .(10123.01  1/23/21 RAM  5:26p| Moved app to seperate file
# .(10123.02  1/23/21 RAM  6:00p| Keep sendError_InvalidRoute in server.js
# .(10124.01  1/24/21 RAM  8:30a| Use res.sendFile instead of res.render
# .(10124.02  1/24/21 RAM 10:30a| Add /next route with counter
# .(10124.03  1/24/21 RAM  1:30p| Add seperate GET /login route
# .(10124.04  1/24/21 RAM  2:30p| Add /user route
# .(10124.05  1/24/21 RAM  3:30p| Increment counter for each user
# .(10124.06  1/24/21 RAM  4:05p| Breakout User settings
# .(10124.07  1/24/21 RAM  9:09p| Refactor a Controller for each Table
# .(10211.01  2/11/21 RAM  9:15a| Created v14 from v04
# .(10211.02  2/11/21 RAM  9:15a| Moved login.html to Views/login.html
# .(10211.08  2/11/21 RAM 10:30p| Set DoShowEm globally
# .(10212.01  2/12/21 RAM 12:15a| Finally we're back
# .(10212.03  1/12/21 RAM  8:00a| pUsers must be global

##PRGM     +====================+===============================================+
##ID 21.100. Main               |
##SRCE     +====================+===============================================+
\*/
        var session         =   require( 'express-session' );

//--------- ---------------------------------------------------------------------------------------

function serverApp( pApp ) {

//--------- ------------------------------------------------------------------------

            pApp.use( session( { secret : 'XASDASDA' } ) );
        var pSession;

//      var pUsers          =   setUsers( )                                                         // .(10124.06.1 RAM Breakout User settings)
            pUsers          =   setUsers( )                                                         // .(10212.03.2 RAM Must be global?)

//      --- ----------------------------------------------

        var setAppRoutes    =  require( './Routes/routes.njs' )                                     // .(10212.01.1 RAM Finally we're back)

//          DoShowEm        =  'showem'                                                             // .(10211.08.1)
            setAppRoutes( pApp, 'auth' )                                                            // .(10212.01.2)

//      -------------------------------------------------------------------------
//      -------------------------------------------------------------------------

   function setUsers( ) {                                                                           // .(10124.06.1 RAM Beg)
        var pUsers =
             { 'bruce.troutman@gmail.com': { name: "Bruce Troutman", role: 'admin' }
             , 'robin.mattern@gmail.com' : { name: "Robin Mattern",  role: 'admin' }
             , 'suzee.parker@sicomm.net' : { name: "Suzee Parker",   role: 'user',  email: "suzee.parker@gmail.com"  }
             , 'robin'                   : { name: "Robin Mattern",  role: 'admin', email: "robin.mattern@gmail.com" }
                }
        var aBruceEmail                        =              "bruce.troutman@gmail.com"
            pUsers.bruce                       = {... pUsers[  aBruceEmail ], email: aBruceEmail }
            pUsers  .sue                       =      pUsers[ 'suzee.parker@sicomm.net' ]
            pUsers[ 'susan'                  ] =      pUsers[ 'sue' ]
            pUsers[ 'suzee.parker@gmail.com' ] =      pUsers.susan

//                          console.log( "pUsers", pUsers )
     return pUsers

            } // eof setUsers                                                       // .(10124.06.1 RAM End)
//          ----------------------------------------------

        } // eof serverApp
//--------- ---------------------------------------------------------------------------------------

        module.exports  =   serverApp

