//nodeJS Express
/*\
##=========+====================+================================================+
##RD         server_app         | Sample Server App, V2
##RFILE    +====================+=======+=================+======+===============+
##FD   ET022-server_app_v02.js  |   9479|  1/24/21  3:38p |   136| v2.0.10124.01
##DESC     .--------------------+-------+-----------------+------+---------------+
#            Sample ExpressJS app using session variables.  Called by server.js
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2021 8020 Data * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+-------+-------------------+------+-----------+
#            app.get(  '/', ... | Go to  /login.html if no session
#            app.get(  '/login' | Render /login.html
#            app.post( '/login' | Handle  login data; check if a valid user
#            app.get(  '/admin' | Check if user has admin role
#            app.get(  '/next'  | Increment user's page count
#            app.get(  '/logout'| Clear session
#
##CHGS     .--------------------+-------+-------------------+------+-----------+
# .(10123.01  1/23/21 RAM  5:26p| Moved app to seperate file
# .(10123.02  1/23/21 RAM  6:00p| Keep sendError_InvalidRoute in server.js
# .(10124.01  1/24/21 RAM  8:30a| Use res.sendFile instead of res.render
# .(10124.02  1/24/21 RAM 10:30a| Add /next route with counter
# .(10124.03  1/24/21 RAM  1:30p| Add seperate GET /login route

##PRGM     +====================+===============================================+
##ID 21.100. Main               |
##SRCE     +====================+===============================================+
\*/
        var session     =   require( 'express-session' );

//--------- ---------------------------------------------------------------------------------------

function server_app( app ) {                                                        // .(10123.01.1 RAM Beg Moved app to seperate file)

//      ----------------------------------------------------------------------------

        app.use( session( { secret : 'XASDASDA' } ) );
        var ssn;


//      --- ----------------------------------------------

        app.get( '/',       function( req, res ) {
            ssn         =   req.session;

        if (ssn.cnt) {      res.redirect(  '/admin'                          ); }
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

            ssn.email   =   req.body.email;
            ssn.cnt     =   1                                                       // .(10124.02.1 RAM Add counter for this session)
                            res.redirect(  '/admin'                          );     // .(10124.01.2 RAM Was: res.end( 'done' ))

            } ); // eof app.get( '/login', ... )
//          ----------------------------------------------

//      app.get(     '/admin',                  function( req, res ) { ... }        //#.(10124.02.2)
        app.route( [ '/admin', '/next' ] ).get( function( req, res ) {              // .(10124.02.2 RAM Set Multiple routes for multiple methods)
            ssn         =   req.session;

        if (ssn.cnt) {
        var nCnt        =   ssn.cnt++;                                              // .(10124.02.3 RAM Increment counter for this session)
                            res.send(  `<h2>Hello ${ssn.email}</h2>`                // .(10124.02.4 RAM Use send, instead of res.write(); res.end())
                                     + `<a href="/next">Next page (${nCnt})</a> | ` // .(10124.02.5 RAM Added route ./next with counter)
                                     + '<a href="/logout">Logout</a>'        ); }   // .(10124.02.4
//                       // res.end(   '<a href="/logout">Logout</a>'        ); }   //#.(10124.02.4)
          else {            res.write( '<h3>Please login first.</h3>'        );
                            res.end(   '<a href="/">Login</a>'               ); }

            } );  // eof app.get( '/admin', ... )
//          ----------------------------------------------

        app.get( '/logout', function( req, res ) {
                            req.session.destroy( function( err ) {
        if (err) {          console.log(  err ); }
          else {            res.redirect( '/' ); }
                            } );

            } ); // eof app.get( '/logout', ... )
//          ----------------------------------------------

//      ----------------------------------------------------------------------------

        } // eof server_app                                                         // .(10123.01.1 RAM End)
//--------- ---------------------------------------------------------------------------------------

        module.exports  =   server_app

