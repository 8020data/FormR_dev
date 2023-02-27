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

        var pUsers     =    setUsers( )                                             // .(10124.06.1 RAM Breakout User settings)

//      --- ----------------------------------------------

            pApp.get(     '/'      ,       rootController   );                      // .(10124.07.1 RAM Beg: Refactor a Controller for each Table)
            pApp.get(     '/login' ,       loginController  );
            pApp.post(    '/login' ,       loginController  );
            pApp.get(     '/admin' ,       adminController  )
            pApp.get(     '/next'  ,       nextController   )
            pApp.get(     '/user'  ,       userController   );
            pApp.get(     '/logout',       logoutController );                      // .(10124.07.1 RAM End)

//          pApp.route( [ '/admin', '/next' ] ).get(  adminController )

//      -------------------------------------------------------------------------

//      -------------------------------------------------------------------------

   function rootController( req, res ) {                                            // .(10124.07.2)

        if (req.method === 'GET' ) {

            pSession    =   req.session;
        var pUser       =   pSession.user                                           // .(10124.04.1 RAM Add  '/user' route)
        if (pUser) {        res.redirect( `/${pUser.role}`                   ); }   // .(10124.04.2 RAM Was: '/admin' )
          else {            res.redirect( `/login`                           ); }   // .(10124.05.1 RAM Was: sendFile( `${__dirname}/login.html` )

            } // eif rootController.get
//          ---------------------------------------------------------------------
        } // eof rootController
//      -------------------------------------------------------------------------

   function loginController(req, res ) {                                            // .(10124.07.3)

        if (req.method  == 'GET' ) {
                            res.sendFile(  `${__dirname}/login.html`         );

            } // eif loginController.get
//      -------------------------------------------------------------------------

        if (req.method  == 'POST') {

            pSession         =   req.session;
        var pUser       =   checkUser(  req, res )                                  // .(10124.04.3 RAM Beg: Check for valid user login)
        if (pUser.error) {  res.send( `<h3>${pUser.error}</h3>`
                                    + `<a href="/">Login</a>`                ); }
          else {                                                                    // .(10124.04.3 RAM End)
            pSession.user    =   pUser                                              // .(10124.04.4 RAM Was: pSession.email = req.body.email)
            pSession.user.cnt=   1                                                  // .(10124.02.1 RAM Add counter for this session).(10124.05.1 RAM just for this user)
//                          res.redirect(  '/admin'                          );     //#.(10124.01.2 RAM Was: res.end( 'done' )).(10124.04.5)
                            res.redirect( `/${pUser.role}`                   ); }   // .(10124.04.5 RAM Was: '/admin' )

            } // eif loginController.post
//      -------------------------------------------------------------------------
        } // eof rootController
//      -------------------------------------------------------------------------

   function adminController(req, res ) {                                            // .(10124.07.4)

        if (req.method  == 'GET') {

            pSession    =   req.session;
        var aRole       =  (pSession.user && pSession.user.role) || ''              // .(10124.03.6)
//      if (pSession.email) {    res.send(  `<h3>Hello ${pSession.email}</h3>`      //#.(10124.02.4 RAM Use send, instead of res.write(); res.end()).(10124.03.6)
        if (aRole    ) {
        var nCnt        =   pSession.user.cnt++                                     // .(10124.05.2 RAM Increment counter, just for this user)
                            res.send(  `<h3>Hello ${aRole}: ${pSession.user.name}</h3>`  // .(10124.04.6 RAM Check for role session)
                                    +  `<a href="/next">Next page (${nCnt})</a> | ` // .(10124.02.5 RAM Added route ./next with counter)
                                    +  '<a href="/logout">Logout</a>'        ); }   // .(10124.02.4

          else {            res.write( '<h3>Please login as an admin.</h3>'  );
                            res.end(   '<a href="/">Login</a>'               ); }

            } // eif adminController.get
//          ----------------------------------------------
        } // eof adminController
//      -------------------------------------------------------------------------


//      -------------------------------------------------------------------------

   function nextController( req, res ) {                                            // .(10124.07.4)

        if (req.method  == 'GET') {

            pSession    =   req.session;
        var aRole       =  (pSession.user && pSession.user.role) || ''              // .(10124.03.6)
        if (aRole    ) {
        var nCnt        =   pSession.user.cnt++                                     // .(10124.05.2 RAM Increment counter, just for this user)
                            res.send(  `<h3>Hello ${aRole}: ${pSession.user.name}</h3>`  // .(10124.04.6 RAM Check for role session)
                                    +  `<a href="/next">Next page (${nCnt})</a> | ` // .(10124.02.5 RAM Added route ./next with counter)
                                    +  '<a href="/logout">Logout</a>'        ); }   // .(10124.02.4

          else {            res.write( '<h3>Please login first.</h3>'        );
                            res.end(   '<a href="/">Login</a>'               ); }

            } // eif nextController.get
//          ----------------------------------------------
        } // eof nextController
//      -------------------------------------------------------------------------

   function userController(    req, res ) {                                         // .(10124.07.5)

        if (req.method  == 'GET') {

            pSession    =   req.session;
        var bUser       =  (pSession.user && pSession.user.role) == 'user'
        if (bUser) {
        var nCnt        =   pSession.user.cnt++                                     // .(10124.05.3 RAM Increment counter, just for this user)
                            res.send(  `<h3>Hello ${pSession.user.role}: ${pSession.user.name}</h3>`
                                    +  `<a href="/next">Next page (${nCnt})</a> | `
                                    +  '<a href="/logout">Logout</a>'        ); }
          else {            res.send(  '<h3>Please login as a user.</h3>'
                                    +  '<a href="/">Login</a>'               ); }

            } // eif userController.get
//          ----------------------------------------------
        } // eof userController
//      -------------------------------------------------------------------------

   function logoutController(  req, res ) {                                         // .(10124.07.6)

        if (req.method  == 'GET') {

                            req.session.destroy( function( err ) {
        if (err) {          console.log(  err ); }
          else {            res.redirect( '/' ); }
                            } );

            } // eif logoutController.get
//          ----------------------------------------------
        } // eof logoutController
//      -------------------------------------------------------------------------









//      -------------------------------------------------------------------------

   function setUsers( ) {                                                           //  .(10124.06.1 RAM Beg)
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

   function checkUser( req, res ) {                                                 // .(10124.03.8 RAM Beg: Write checkUser function)

        var aEmail      =   req.body.email

        var pUser       =   pUsers[ aEmail ]
        if (pUser) {        return  pUser  }

        if (aEmail.match( /.+@.+/ ) == null ) {
                            return { error: "Please enter a valid email address."  }
                            }
        var pUser       =   pUsers[ aEmail ]
        if (pUser) {        pUser.email = aEmail
                            return  pUser  }

          else {            return { error: "You are not an authorized user."      }
                            }
            } // eof checkUser                                                      // .(10124.03.8 RAM End)
//          ----------------------------------------------

        } // eof serverApp
//--------- ---------------------------------------------------------------------------------------

        module.exports  =   serverApp

