      var  pFns                 =
            {  getControllers   :  require( '../Controllers/_controller.fns.njs' ).fns.getControllers
            ,  ...                 require( '../Routes/_route.fns.njs' ).fns
               }
//     var  getAuthRoutes       =  require( '../Routes/auth.routes.js' )                // .(10313.01.3) 
//     var  pAuthRoutes         =  require( '../Routes/auth.routes.js' )                // .(10313.01.3) 

//          aShowEm             =  false                                                //#.(10311.02.4)

//          module.exports      =  setRoutes                                            //#.(10313.01.10)
            module.exports      =  getRoutes()                                          // .(10313.01.10)

// -------------------------------------------------------------------------------------

   function setRoutes( pApp ) { trace( )

            pTableRoutes        =  { }

            getModelRoutes( 'user,auth' )

            delete pTableRoutes.auth['http.post    /api/auth/register/             ' ]  // .(10313.03.2 RAM We don't want to set them again)
            delete pTableRoutes.auth['http.post    /api/auth/login/                ' ]  // .(10313.03.3)

//                    pFns.setTableRoutes(  pTableRoutes, pApp )                        // .(10313.01.4 RAM 2nd arg is either pApp or aTable, pApp)                             
       var  pRoutes = pFns.getAppRoutes(    pTableRoutes )                              //#.(10313.01.4 RAM Maybe laater) 
            
//          pApp.use( '/api/auth',getAuthRoutes( pApp ) )                               //#.(10313.01.5 RAM Adds routes '/api/auth/api/auth') 
//          pApp.use( getAuthRoutes( pApp ) )                                           //#.(10313.01.5 RAM Wipes out the reviously defined routes) 
//          pRoutes = pRoutes.use( { ...pRoutes, ...pAuthRoutes } )                     // .(10313.01.5 RAM Nope, pRoutes is not a real object, but it can use other Routes) 
            pRoutes = pRoutes.use( require( '../Routes/auth.routes.js' ) )              // .(10313.01.5 RAM Appends 2nd set of routes) 

            pApp.use( pRoutes )                                                         // .(10313.01.5) 
            } // eof setRoutes
//          ------------------------------------------------------

   function getRoutes( ) { trace( )                                                     // .(10313.01.12 Beg RAM Return pRoutes, don't need to pass pApp)

            pTableRoutes        =  { }

            getModelRoutes( 'user,auth' )

            delete pTableRoutes.auth['http.post    /api/auth/register/             ' ]  // .(10313.03.2 RAM We don't want to set auth.routes again)
            delete pTableRoutes.auth['http.post    /api/auth/login/                ' ]  // .(10313.03.3)

       var  pRoutes = pFns.getAppRoutes( pTableRoutes )                                 //#.(10313.01.4 RAM Maybe laater) 

            pRoutes = pRoutes.use( require( '../Routes/auth.routes.js' ) )              // .(10313.01.5 RAM Appends 2nd set of routes) 

     return pRoutes                                                                     // .(10313.01.5) 
            } // eof setRoutes                                                          // .(10313.01.12) 
//          ------------------------------------------------------

   function getModelRoutes( aModels ) { trace( aModels )

            aModels.split( /,/ ).forEach( getControllerRoutes )

            } // eof getModelRoutes
//          ------------------------------------------------------

   function getControllerRoutes( aModel) { trace( `\n ${aModel}` )

            pFns.getControllers( aModel, aShowEm )

            } // eof getControllerRoute
//          ------------------------------------------------------

// -------------------------------------------------------------------------------------


























// ------------------------------------------------------------------------------------------------------------------------------------

//          nDoTests            =  1   // showem
//          nDoTests            =  2   // doem all
            nDoTests            =  3   // doem for one table
//          nDoTests            =  4   // doem with setTableRoutes
            aShowEm             =  false                                                // .(10311.02.5)

       var  bNotTesting = ( __filename) != process.mainModule.filename                  // .(10301.04.6 RAM if this script is not called by another)
        if (bNotTesting)  {   return  }

//                                             BRANCH_HOME = process.env.FORMR_HOME     // .(10301.06.1 RAM Gotta know where we are)
                                   require( `${BRANCH_HOME}/_3/NJSs/JScripts2.3.njs` ); 
                                     trace( 'setProjectName', 'FormR' )

        if (doTest( 1, __filename )) {

//      var aModels           = 'user, auth'
        var aModels           = 'user'                                                  // Remember modelnames are singular)

            pTableRoutes      =  getControllerRoutes( aModels, 'dont showem' )

//          pTableRoutes      =  { }
//          pTableRoutes      =  getControllers( 'lookup' ), 'showemx' )                // get Methods, Routes, Roles and Controller Fns
//          pTableRoutes      =  getControllers( 'users'  ), 'showemx' )                // add them to pTableRoutes

            pFns.shoTableRoutes(  pTableRoutes ); // process.exit()

            DoShowEm          =  true

//                           Table    Role     Cmd    Controller / Route Actions
//                           ------  -------  -----  -------------------------------
            setRouteRoles(  'users', 'Admin', 'chg', 'all'                          )   // chg  Gives   access to only one role  for all  actions
            setRouteRoles(  'users', 'Owner', 'add', 'update*,  find*, delete*'     )   // add  Adds    access     for one role  for many actions
            setRouteRoles(  'users', 'User' , 'add', 'updateOne,       deleteOne'   )   // del  Removes access     for one role  for two  actions
            setRouteRoles(  'users', 'User' , 'del', '                 delete*'     )   // del  Removes access     for one role  for one  action
            setRouteRoles(  'users', 'Admin', 'chg', 'createOne,       deleteAll'   )   // chg  Gives   access to only one role  for two  actions, removes all other roles

            pFns.shoTableRoutes(  pTableRoutes, 'users' ); // process.exit()

//          setTableRoutes(  pTableRoutes )
//          setTableRoutes(  pTableRoutes, 'users' )
            pFns.setTableRoutes(  pTableRoutes, 'users', 'showem' )
            }
//          ------------------------------------------------------

      if (doTest( '2,3,4', __filename )) {

            DoShowEm          =  'showset'
        var pExpress          =   require( 'express' )
        var pApp              =   new pExpress
            }

        if (doTest( 2, __filename )) {  //

            pFns.setAppRoutes( pApp )
            }
//          ------------------------------------------------------

        if (doTest( 3, __filename )) {

            pFns.setAppRoutes( pApp, 'auth' )
            }
//          ------------------------------------------------------

        if (doTest( 4, __filename )) {   // Closest to the real thing

            pTableRoutes      =  getControllerRoutes( 'user' )
            pFns.setTableRoutes(      pTableRoutes, app )
            }
//          ------------------------------------------------------

  function  setRouteRoles(  aTable, aRole, aChg, aActions ) { trace()
      if (! pTableRoutes[ aTable ] ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
            }
//          ------------------------------------------------------
