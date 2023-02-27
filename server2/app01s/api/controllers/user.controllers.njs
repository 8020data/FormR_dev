// --------------------------------------------------------------------------------------------------------

            APP_HOME        =            `${process.env.FORMR_HOME}/server2/app01s`
                                require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns2.3.njs` );
        var pFns            =   require( '../routes/_route.fns.njs' ).fns
                                  trace( 'setProjectName', 'FormR'  )

        var aTable          =  'users'
        var aModel          =  'user'                                                   // .(10301.08.1 RAM If this is wrong everything breaks)
        var aFName          =  `${aModel}.controllers`

        var pConfig         = { ControllersFilename: __filename }                       // .(10301.03.1 RAM Let's try saving the file name)
//          pConfig.Cmd     =  'replace'                                                // .(10301.03.2 RAM Replace the default Controller Routes)

//      --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                  Method      Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/${aTable}/model/           ' : [ '      I', 'getModel            ' ]
//             , 'http.get     "/api/test/all",                ' : [ '      I', 'allAccess           ' ]    // .(10311.03.1 RAM ToDo: If '${}' not in route, fixTableRoutes thinks it is a duplicate)
               , 'http.get     "/api/${aTable}/all",           ' : [ '      I', 'allAccess           ' ]
               , 'http.get     "/api/${aTable}/user",          ' : [ '    U  ', 'userBoard           ' ]
               , 'http.get     "/api/${aTable}/editor",        ' : [ '  E    ', 'adminBoard          ' ]
               , 'http.get     "/api/${aTable}/admin",         ' : [ 'A      ', 'editorBoard         ' ]
//             , 'http.get     "/api/${aTable}/session",       ' : [ '      I', 'session             ' ]
                  }

//          pRoutes         =  pFns.setRouteRoles( pRoutes, 'Admin', 'chg', 'all' )      // .(10309.01.2) 

//      --------------------------------------------------------------------------------------------------

        var pControllers    = { controller1 : {}

//          ----------------------------------------------------------------------------------

//       ,  allAccess       :  function allAccess(   req, res ) { res.status(200).send( "Public Content." ); }
//       ,  userBoard       :  function userBoard(   req, res ) { res.status(200).send( "User Content."   ); }
//       ,  adminBoard      :  function adminBoard(  req, res ) { res.status(200).send( "Admin Content."  ); }
//       ,  editorBoard     :  function editorBoard( req, res ) { res.status(200).send( "Editor Content." ); }

         ,  allAccess       :  ( req, res ) => sendSession( req, res, "Public"  )    // .(10311.06.1 Beg RAM) 
         ,  userBoard       :  ( req, res ) => sendSession( req, res, "User"    ) 
         ,  adminBoard      :  ( req, res ) => sendSession( req, res, "Admin"   ) 
         ,  editorBoard     :  ( req, res ) => sendSession( req, res, "Editor"  )    // .(10311.06.1 End) 
//       ,  session         :  ( req, res ) => sendSession( req, res, "session" )    // .(10311.07.1) 
//       ,  session :  function( req, res ) { 
//                                             sendSession( req, res, "session" )    // .(10311.07.1) 
//                                             }

//          ----------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( "users.model" )
//          var aModel      =  require( 'fs' ).readFileSync( `${BRANCH_HOME}/${APP_DIR}/api/models/user.model.json`, 'ASCII' ) //#.(10311.06.1 RAM )
//          var aModel      =  require( 'fs' ).readFileSync( `${APP_DIR}/api/models/user.model.json`,  'ASCII' )               //#.(10311.06.1 RAM ).(10316.04.1)
            var aModel      =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/user.model.json`, 'ASCII' )               // .(10311.06.1 RAM ).(10316.04.1 RAM Use APP_HOME instead of APP_DIR)
                               res.json( JSON.parse( aModel ) )

                } // eof `${aFName}.getModel`
//          ------------------------------------------------------------------
            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     :   pConfig                                   // .(10301.03.3)
                }

                trace(  "module.exports\n" )

// --------------------------------------------------------------------------------------------------------

   function sendSession( req, res, aRole ) {                              // .(10311.06.2 Beg) 
            trace( ` Session is validated for BezKoder role: ${aRole}.` )
       var  aMsg  = `User is logged in with ${aRole} privlideges.`
            res.status(200).send( aMsg )
            }                                                             // .(10311.06.2 End) 
// -------------------------------------------------------------

   function controller(  req,  res,  aAction ) {

            pSession    =   req.session;
        var bUser       =  (pSession.user && pSession.user.role) == 'user'
        if (bUser) {
        var nCnt        =   pSession.user.cnt++
                            res.send(  `<h3>Hello ${pSession.user.role}: ${pSession.user.name}</h3>`
                                    +  `user.${aAction}<br>`
                                    +  `<a href="/next">Next page (${nCnt})</a> | ` + '<a href="/logout">Logout</a>' ); }
          else {            res.send(  '<h3>Please login as a user.</h3>'           + '<a href="/">Login</a>'        ); }
               } // eof controller
//    ---   ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------


          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

      var { getControllers }  =  require( '../Controllers/_controller.fns.njs'  ).fns
      var { setTableRoutes }  =  require( '../Routes/_route.fns.njs'            ).fns

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable, 'ShowEm' )
            }
//    ---   ------------------------------------------------------------------

      if (doTest( 2, __filename )) {   // Show initial routes and then change roles for it

      var { shoTableRoutes }  =  require( '../Routes/_route.fns.njs'  ).fns
      var { setRouteRoles  }  =  require( '../Routes/_route.fns.njs'  ).fns            // .(10309.01.3 RAM Wasn't here)

            shoTableRoutes( pRoutes, aTable ); DoShowEm = true

//                      Routes   Role     Cmd    Controller / Route Actions
//                      ------  -------  -----  -------------------------------
//          setRouteRoles(  pRoutes, 'Admin', 'chg', 'all'                          )  // chg  Gives   access to only one role  for all  actions
            setRouteRoles(  pRoutes, 'Owner', 'add', 'update*,  find*, delete*'     )  // add  Adds    access     for one role  for many actions
            setRouteRoles(  pRoutes, 'User' , 'add', 'updateOne,       deleteOne'   )  // del  Removes access     for one role  for two  actions
            setRouteRoles(  pRoutes, 'User' , 'del', '                 delete*'     )  // del  Removes access     for one role  for one  action
            setRouteRoles(  pRoutes, 'Admin', 'chg', 'createOne,       deleteAll'   )  // chg  Gives   access to only one role  for two  actions, removes all other roles

            shoTableRoutes( pRoutes, aTable )
            }
// --------------------------------------------------------------------------------------------------------
