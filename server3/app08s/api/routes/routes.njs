// -------------------------------------------------------------------------------------
     
     if (__filename == process.mainModule.filename) {                                            // .(10317.04.8 RAM Globals are set in Route.njs)
           FORMRs_3             = `${ process.env.FORMR_HOME }/_3/FR.FNSs/`                         // .(10317.01.1 RAM FormR's Home) 
           jstUtils  =   require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts2.3.njs` )        // .(10317.01.5 RAM FormR's Utility Functions)
           FORMRs_4             = `${ APP_HOME.replace( /[\\/]app[0-9]+[sc]/i, '' ) }/_4/FR.fns02s/`  // .(10317.01.1 RAM Server's Home if dynamically assigned) 
                                      jstUtils.setEnv(           )                               // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
                                      trace( 'setProjectName', 'FormR'  )
            } 
// -------------------------------------------------------------------------------------

      var  pFns                 =
            {  getControllers   :  require( '../Controllers/_controller.fns.njs' ).fns.getControllers
            ,  ...                 require( '../Routes/_route.fns.njs' ).fns

//          {  getControllers   :  require( `${FORMRs_3}FNS_Controller1-0.njs` ).Fns.getControllers
//          ,  ...                 require( `${FORMRs_3}FNS_Routes1-0.njs` ).Fns
               }

            module.exports      =  getRoutes()                                          // .(10313.01.10)

// -------------------------------------------------------------------------------------
/*                                                                                      // .(10325.01.1 RAM Using getRoutes instead of setRoutes)
   function setRoutes( pApp ) { trace( )

        var pRoutes = getRoutes( )                                                      // .(10315.07.1 RAM That's all it is)
            pApp.use( pRoutes )                                                         // .(10313.01.5)

            } // eof setRoutes
//          ------------------------------------------------------
*/
   function getRoutes( ) { trace( )                                                     // .(10313.01.12 Beg RAM Return pRoutes, don't need to pass pApp)

//          setDatabase( 'formr,world' )                                                // .(10325.02.1 RAM )

//          pTableRoutes = getModelRoutes( 'formr', 'user,role' )                       // .(10325.02.2 RAM Add DB arg)
//          pTableRoutes = getModelRoutes( 'world', ''          )                       // .(10325.02.2 RAM Get all tables for DB: world)
//          pTableRoutes = getModelRoutes( 'user,role,tutorial' )                       // .(10315.06.1 RAM Return pTableRoutes)
//          pTableRoutes = getModelRoutes( 'user,auth,role,fr/users' )                  // .(10318.18.1 RAM Will it work?)
            pTableRoutes = getModelRoutes( 'city,country' )                             // .(10326.03.1 RAM Add World Tables)

//          delete pTableRoutes.auth['http.post    /api/auth/register/             ' ]  // .(10313.03.2 RAM We don't want to set auth.routes again)
//          delete pTableRoutes.auth['http.post    /api/auth/login/                ' ]  // .(10313.03.3)

       var  pAppRoutes   = pFns.getAppRoutes( pTableRoutes )                            //#.(10313.01.4 RAM Maybe later)

//          pAppRoutes   = pAppRoutes.use( require(       '../Routes/auth.routes.js' )) // .(10313.01.5 RAM Appends 2nd set of routes)
            pAppRoutes   = pAppRoutes.use( require( `${FORMRs_4}/FMR_auth.routes.js` )) // .(10313.01.5 RAM Appends 2nd set of routes, Can cause problems due to renamed FName actions)

            pAppRoutes   = pAppRoutes.get( '/hello', function ( req, res ) {            // .(10316.10.1 RAM A Simple routes can be added here)
                       res.send( { message: "Hello from FormR" } ) 
                       } );

     return pAppRoutes                                                                  // .(10313.01.5)
            } // eof setRoutes                                                          // .(10313.01.12)
//          ------------------------------------------------------

   function getModelRoutes( aModels ) { trace( aModels )

            pTableRoutes = { }

            aModels.split( /[, ]/ ).forEach( function getControllerRtes( aModel ) {
               pFns.getControllers( aModel, aShowEm )
               } )

     return pTableRoutes
            } // eof getModelRoutes
//          ------------------------------------------------------

// -------------------------------------------------------------------------------------

















// ------------------------------------------------------------------------------------------------------------------------------------

//          nDoTests            =  1   // showem
            nDoTests            =  2   // doem all
//          nDoTests            =  3   // doem for one table
//          nDoTests            =  4   // doem with setTableRoutes
            aShowEm             =  false                                                // .(10311.02.5)

       var  bNotTesting = ( __filename) != process.mainModule.filename                  // .(10301.04.6 RAM if this script is not called by another)
        if (bNotTesting)  {   return  }

//                                             BRANCH_HOME = process.env.FORMR_HOME     // .(10301.06.1 RAM Gotta know where we are)
//                                 require( `${BRANCH_HOME}/_3/NJSs/JScripts2.3.njs` );
//                                   trace( 'setProjectName', 'FormR' )

        if (doTest( 1, __filename )) {

//      var aModels           = 'user, auth'
//      var aModels           = 'user'                                                  // Remember modelnames are singular)
        var aModel            = 'user'                                                  // Remember modelnames are singular)

//          pTableRoutes      =  getControllerRoutes( aModels, 'dont showem' )                       //#.(10319.08.2)
            pTableRoutes      =  getControllerRoutes( '', aModel, pRoutes, pControllers, pOptions )  // .(10319.08.2 RAM This is it's current signature)

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

            pFns.setAppRoutes( pTableRoutes, pApp )
            }
//          ------------------------------------------------------

        if (doTest( 3, __filename )) {

            pFns.setAppRoutes( pTableRoutes, pApp, 'auth' )
            }
//          ------------------------------------------------------

        if (doTest( 4, __filename )) {   // Closest to the real thing

            pTableRoutes      =  getControllerRoutes( 'user' )     // .(10319.08.3 RAM I don't think so)
            pFns.setTableRoutes( pTableRoutes, pApp )
            }
//          ------------------------------------------------------

  function  setRouteRoles(  aTable, aRole, aChg, aActions ) { trace()
      if (! pTableRoutes[ aTable ] ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
            }
//          ------------------------------------------------------
