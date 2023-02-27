      var { getControllers }  =  require( '../Controllers/_controller.fns.njs' ).fns
      var { shoTableRoutes }  =  require( '../Routes/_route.fns.njs' ).fns
      var { setTableRoutes }  =  require( '../Routes/_route.fns.njs' ).fns
      var { chgRouteRoles  }  =  require( '../Routes/_route.fns.njs' ).fns
      var { setRoles  }       =  require( '../Routes/_route.fns.njs' ).fns
      var { inspect   }       =  require( '../Routes/_route.fns.njs' ).fns
      var { take   }          =  require( '../Routes/_route.fns.njs' ).fns

//    var   aTests            =  1   // showem
//    var   aTests            =  2   // doem all
//    var   aTests            =  3   // doem for one table
//    var   aTests            =  4   // doem with setTableRoutes

// ------------------------------------------------------------------------------------------------------------------------------------

   function setAppRoutes(  pApp, aModels ) {

        var aModels           =  aModels ? aModels : 'lookup, users'
            pTableRoutes      =  getControllerRoutes( aModels )                  // If there is only one, only one will be in pTableRoutes

        if (aModels.match( /[, ]+/ )) {
            setTableRoutes(      pTableRoutes, pApp )                            // Just do this
        } else {
        var aTable            =  aModels                                         // Opps
            setTableRoutes(      pTableRoutes, aTable, pApp )                    // But I like this option when pTableRoutes has all tables
            } }
//          ------------------------------------------------------

            module.exports    =  setAppRoutes

// ------------------------------------------------------------------------------------------------------------------------------------

       if (doTest( 1 )) {

        var aModels           = 'lookup, users'
//      var aModels           = 'auth'

            pTableRoutes      =  getControllerRoutes( aModels, 'dont showem' )

//          pTableRoutes      =  { }
//          pTableRoutes      =  getControllers( 'lookup' ), 'showemx' )                // get Methods, Routes, Roles and Controller Fns
//          pTableRoutes      =  getControllers( 'users'  ), 'showemx' )                // add them to pTableRoutes

            shoTableRoutes(  pTableRoutes ); // process.exit()

            DoShowEm          =  true

//                           Table    Role     Cmd    Controller / Route Actions
//                           ------  -------  -----  -------------------------------
            setRouteRoles(  'users', 'Admin', 'chg', 'all'                          )   // chg  Gives   access to only one role  for all  actions
            setRouteRoles(  'users', 'Owner', 'add', 'update*,  find*, delete*'     )   // add  Adds    access     for one role  for many actions
            setRouteRoles(  'users', 'User' , 'add', 'updateOne,       deleteOne'   )   // del  Removes access     for one role  for two  actions
            setRouteRoles(  'users', 'User' , 'del', '                 delete*'     )   // del  Removes access     for one role  for one  action
            setRouteRoles(  'users', 'Admin', 'chg', 'createOne,       deleteAll'   )   // chg  Gives   access to only one role  for two  actions, removes all other roles

            shoTableRoutes(  pTableRoutes, 'users' ); // process.exit()

//          setTableRoutes(  pTableRoutes )
//          setTableRoutes(  pTableRoutes, 'users' )
            setTableRoutes(  pTableRoutes, 'users', 'showem' )
            }
//          ------------------------------------------------------

      if (doTest( '2,3,4; )) {

            DoShowEm          =  'showset'
        var express           =   require( 'express' )
        var app               =   new express
            }

        if (doTest( 2 )) {

            setAppRoutes( app )
            }
//          ------------------------------------------------------

        if (doTest( 3 )) {

            setAppRoutes( app, 'auth' )
            }
//          ------------------------------------------------------

        if (doTest( 4 )) {

            pTableRoutes      =  getControllerRoutes( 'lookup' )
            setTableRoutes(      pTableRoutes, app )
            }
//          ------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------

   function getControllerRoutes( aModels, aShowEm ) {
            aModels.split( /[ ,]+/ ).forEach( aModel => {
            pTableRoutes  = getControllers( `${aModel}.controllers.js`, aShowEm )
            } )
     return pTableRoutes
            }
//          ------------------------------------------------------

   function setRouteRoles(  aTable, aRole, aChg, aActions ) {
      if (! pTableRoutes[ aTable ] ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
            }
//          ------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

   function doTest( n ) {
        var bCalled = (__filename != process.mainModule.filename)
        if (bCalled || typeof( aTests ) == 'undefined') { aTests = ',,' } else { aTests = ',' + aTests + ','}
     return aTests.match( `,${n},` )
            }   
// --------------------------------------------------------------------------------------------------------
