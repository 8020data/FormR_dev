//nodeJS Express
/*\
##=========+====================+================================================+
##RD         server_app         | Sample Server App, V3
##RFILE    +====================+=======+=================+======+===============+
##FD   ET021-server_app_v3.js   |   9479|  1/24/21  3:38p |   136| v2.0.10124.01
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
#
##PRGM     +====================+===============================================+
##ID 21.100. Main               |
##SRCE     +====================+===============================================+
\*/
    var session         =   require( 'express-session' );

//--------- ---------------------------------------------------------------------------------------

function server_app( app ) {

//--------- ------------------------------------------------------------------------

        app.use( session( { secret : 'XASDASDA' } ) );
        var ssn;

        var pUsers     =    setUsers( )                                             // .(10124.06.1 RAM Breakout User settings)
//      --- ----------------------------------------------

        app.get( '/',       function( req, res ) {
            ssn         =   req.session;
        var pUser       =   ssn.user                                                // .(10124.04.1 RAM Add  '/user' route)
        if (pUser) {        res.redirect( `/${pUser.role}`                   ); }   // .(10124.04.2 RAM Was: '/admin' )
          else {            res.sendFile(  `${__dirname}/login.html`         ); }   // .(10124.01.1 RAM Was: res.render)

            } );  // eof app.get( '/', ... )
//          ----------------------------------------------

        app.get( '/login',  function( req, res ) {                                  // .(10124.03.1 RAM Beg: Add /login when not a POST, i.e when not responding to login.html)
                            res.sendFile(  `${__dirname}/login.html`         );

            } );  // eof app.get( '/login', ... )                                   // .(10124.03.1 RAM End)
//          ----------------------------------------------
//          ----------------------------------------------

        app.post( '/login', function( req, res ) {
            ssn         =   req.session;
        var pUser       =   checkUser(  req, res )                                  // .(10124.04.3 RAM Beg: Check for valid user login)
        if (pUser.error) {  res.send( `<h3>${pUser.error}</h3>`
                                    + `<a href="/">Login</a>`                ); }
          else {                                                                    // .(10124.04.3 RAM End)
            ssn.user    =   pUser                                                   // .(10124.04.4 RAM Was: ssn.email = req.body.email)
            ssn.user.cnt=   1                                                       // .(10124.02.1 RAM Add counter for this session).(10124.05.1 RAM just for this user)
//                          res.redirect(  '/admin'                          );     //#.(10124.01.2 RAM Was: res.end( 'done' )).(10124.04.5)
                            res.redirect( `/${pUser.role}`                   ); }   // .(10124.04.5 RAM Was: '/admin' )

            } ); // eof app.get( '/login', ... )
//          ----------------------------------------------

//      app.get(     '/admin',                  function( req, res ) { ... }        //#.(10124.02.2)
        app.route( [ '/admin', '/next' ] ).get( function( req, res ) {              // .(10124.02.2 RAM Set Multiple routes for multiple methods)
            ssn         =   req.session;
        var aRole       =  (ssn.user && ssn.user.role) || ''                        // .(10124.03.6)
//      if (ssn.email) {    res.send(  `<h3>Hello ${ssn.email}</h3>`                //#.(10124.02.4 RAM Use send, instead of res.write(); res.end()).(10124.03.6)
        if (aRole    ) {
        var nCnt        =   ssn.user.cnt++                                          // .(10124.05.2 RAM Increment counter, just for this user)
                            res.send(  `<h3>Hello ${aRole}: ${ssn.user.name}</h3>`  // .(10124.04.6 RAM Check for role session)
                                    +  `<a href="/next">Next page (${nCnt})</a> | ` // .(10124.02.5 RAM Added route ./next with counter)
                                    +  '<a href="/logout">Logout</a>'        ); }   // .(10124.02.4

          else {            res.write( '<h3>Please login first.</h3>'        );
                            res.end(   '<a href="/">Login</a>'               ); }

            } );  // eof app.get( '/admin', ... )
//          ----------------------------------------------

        app.get( '/user',   function( req, res ) {                                  // .(10124.04.7 RAM Beg: Add '/user' route)
            ssn         =   req.session;
        var bUser       =  (ssn.user && ssn.user.role) == 'user'
        if (bUser) {
        var nCnt        =   ssn.user.cnt++                                          // .(10124.05.3 RAM Increment counter, just for this user)
                            res.send(  `<h3>Hello ${ssn.user.role}: ${ssn.user.name}</h3>`
                                    +  `<a href="/next">Next page (${nCnt})</a> | `
                                    +  '<a href="/logout">Logout</a>'        ); }
          else {            res.send(  '<h3>Please login as a user.</h3>'
                                    +  '<a href="/">Login</a>'               ); }

            } );  // eof app.get( '/user', ... )                                    // .(10124.04.7 RAM End)
//          ----------------------------------------------

        app.get( '/logout', function( req, res ) {
                            req.session.destroy( function( err ) {
        if (err) {          console.log(  err ); }
          else {            res.redirect( '/' ); }
                            } );

            } ); // eof app.get( '/logout', ... )
//          ----------------------------------------------

//      ----------------------------------------------------------------------------






//      ----------------------------------------------------------------------------

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

                            console.log( "pUsers", pUsers )
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

        } // eof server_app
//--------- ---------------------------------------------------------------------------------------

        module.exports  =   server_app

