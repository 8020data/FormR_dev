// --------------------------------------------------------------------------------------------------------

    var aTable = 'auths'
    var aModel = 'auth'
    var aTests =  1

//      --------------------------------------------------------------------------------------------------

    var pRoutes =                                                                       // .(10204.03.1 Beg RAM New format)
//          Method    Route       Roles    Controller
//          -------- ---------   -------   ----------
         { 'http.get /'       : [ '---E', 'root'     ] //
         , 'http.get /login/' : [ 'E',    'login'    ] //
         , 'http.get /admin/' : [ 'A',    'admin'    ] //
         , 'http.get /logout/': [ 'AOU',  'logout'   ] //
         , 'http.get /next/'  : [ 'AOU',  'next'     ] //
            }                                                                           // .(10204.03.1 End)
// --------------------------------------------------------------------------------------------------------

    var pControllers =                                                                  // .(10204.03.2 RAM Was: = { })

//      --------------------------------------------------------------------------------------------------

        { root( req, res ) {                                                            // .(10124.07.2).(10204.03.3)

            if (req.method === 'GET' ) {

                pSession    =   req.session;
            var pUser       =   pSession.user                                           // .(10124.04.1 RAM Add  '/user' route)
            if (pUser) {        res.redirect( `/${pUser.role}`                   ); }   // .(10124.04.2 RAM Was: '/admin' )
              else {            res.redirect( `/login`                           ); }   // .(10124.05.1 RAM Was: sendFile( `${__dirname}/login.html` )

                } // eif root.rontroller.get
    //          ---------------------------------------------------------------------
            } // eof root.controller
//      -------------------------------------------------------------------------

        , login( req, res ) {                                                           // .(10124.07.3).(10204.03.4)

            if (req.method  == 'GET' ) {
                                res.sendFile(  `${__dirname}/login.html`         );
                } // eif login.controller.get
//      -------------------------------------------------------------------------

            if (req.method  == 'POST') {

                pSession    =   req.session;
            var pUser       =   checkUser(  req, res )                                  // .(10124.04.3 RAM Beg: Check for valid user login)
            if (pUser.error) {  res.send( `<h3>${pUser.error}</h3>`
                                        + `<a href="/">Login</a>`                ); }
              else {                                                                    // .(10124.04.3 RAM End)
                pSession.user    =   pUser                                              // .(10124.04.4 RAM Was: pSession.email = req.body.email)
                pSession.user.cnt=   1                                                  // .(10124.02.1 RAM Add counter for this session).(10124.05.1 RAM just for this user)
    //                          res.redirect(  '/admin'                          );     //#.(10124.01.2 RAM Was: res.end( 'done' )).(10124.04.5)
                                res.redirect( `/${pUser.role}`                   ); }   // .(10124.04.5 RAM Was: '/admin' )
                } // eif login.controller.post
    //      -------------------------------------------------------------------------
            } // eof login.controller
//      -------------------------------------------------------------------------

        , admin( req, res ) {                                                           // .(10124.07.4).(10204.03.5)

            if (req.method  == 'GET') {

                pSessio     =   req.session;
            var aRole       =  (pSession.user && pSession.user.role) || ''              // .(10124.03.6)
    //      if (pSession.email) { res.send(  `<h3>Hello ${pSession.email}</h3>` ... }   //#.(10124.02.4 RAM Use send, instead of res.write(); res.end()).(10124.03.6)
            if (aRole    ) {
            var nCnt        =   pSession.user.cnt++                                     // .(10124.05.2 RAM Increment counter, just for this user)
                                res.send(  `<h3>Hello ${aRole}: ${pSession.user.name}</h3>`  // .(10124.04.6 RAM Check for role session)
                                        +  `<a href="/next">Next page (${nCnt})</a> | ` // .(10124.02.5 RAM Added route ./next with counter)
                                        +  '<a href="/logout">Logout</a>'        ); }   // .(10124.02.4

              else {            res.write( '<h3>Please login as an admin.</h3>'  );
                                res.end(   '<a href="/">Login</a>'               ); }
                } // eif admin.controller.get
    //          ----------------------------------------------
            } // eof admin.controller
//      -------------------------------------------------------------------------

        , next( req, res ) {                                                            // .(10124.07.4).(10204.03.6)

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
                } // eif next.controller.get
    //          ----------------------------------------------
            } // eof next.controller
//      -------------------------------------------------------------------------

        , logout( req, res ) {                                                          // .(10124.07.6).(10204.03.7)

            if (req.method  == 'GET') {

                                req.session.destroy( function( err ) {
            if (err) {          console.log(  err ); }
              else {            res.redirect( '/' ); }
                                } );
                } // eif logout.controller.get
    //          ----------------------------------------------
            } // eof logout.controller
//      -------------------------------------------------------------------------

        , checkRole( req, res, next ) { next() }

          } // eoo pControllers
//      -------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     : { Cmd: 'replace' }
                }
// ------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------

 if (typeof( aTests ) == 'undefined') { aTests = '' } else { aTests = ',' + aTests + ','}
 if (aTests.match( /,1,/ )) {

      var { getControllers }  =  require( '../Controllers/_controller.fns.njs'  ).fns
      var { shoTableRoutes }  =  require( '../Routes/_route.fns.njs'            ).fns
      var { setTableRoutes }  =  require( '../Routes/_route.fns.njs'            ).fns

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable, 'showem' )

            shoTableRoutes( pTableRoutes )
            }
//          ------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

