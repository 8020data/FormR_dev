      var { getControllers }  =  require( '../Controllers/_controller.fns.njs' ).fns
      var { shoTableRoutes }  =  require( '../Routes/_route.fns.njs' ).fns
      var { setTableRoutes }  =  require( '../Routes/_route.fns.njs' ).fns
      var { chgRouteRoles  }  =  require( '../Routes/_route.fns.njs' ).fns
      var { setRoles  }       =  require( '../Routes/_route.fns.njs' ).fns
      var { inspect   }       =  require( '../Routes/_route.fns.njs' ).fns
      var { take   }          =  require( '../Routes/_route.fns.njs' ).fns

      var   aTests            =  1   // showem
//    var   aTests            =  2   // doem all -- gotten from .json list
//    var   aTests            =  3   // doem for one table
//    var   aTests            =  4   // doem with setTableRoutes, quietly
            DoShowEm          =  ''

// ------------------------------------------------------------------------------------------------------------------------------------

   function setAppRoutes(  pApp, aModels ) {

        var aModels           =  aModels ?  aModels : 'lookup, users'
            pTableRoutes      =  getRoutes( aModels )                                   // If there is only one, only one will be in pTableRoutes

            setTableRoutes(      pTableRoutes, pApp, DoShowEm )                         // Set routes for Express App
            }
//          ------------------------------------------------------

            module.exports    =  setAppRoutes

// ------------------------------------------------------------------------------------------------------------------------------------

        if (doTest( 1 )) {

        var aModels           = 'auth'

            pTableRoutes      =  getRoutes( aModels, 'dont showem' )

            shoTableRoutes(  pTableRoutes ); // process.exit()

//          setTableRoutes(  pTableRoutes, 'showem' )                                   // Just display message re route will be set
            setTableRoutes(  pTableRoutes, 'auths', 'showem' )                           // Just do one table
            }
//          ------------------------------------------------------

        if (doTest( '2,3,4' )) {

            DoShowEm          =  'showset'
        var cExpress          =   require( 'express' )
        var pApp              =   new cExpress
            }

        if (doTest( '2')) {

            setAppRoutes( pApp )
            }
//          ------------------------------------------------------

        if (doTest( '3' )) {

            setAppRoutes( pApp, 'auth' )
            }
//          ------------------------------------------------------

        if (doTest( '4' )) {

            DoShowEm          =  ''
            pTableRoutes      =  getRoutes(  'auth' )
            setTableRoutes(      pTableRoutes, pApp )
            }
//          ------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------

   function getRoutes( aModels, aShowEm ) {
            aModels.split( /[ ,]+/ ).forEach( aModel => {
            pTableRoutes  = getControllers( `${aModel}`, aShowEm )
            } )
     return pTableRoutes
            }
//          ------------------------------------------------------

   function doTest( n ) {
        var bCalled = (__filename != process.mainModule.filename)
        if (bCalled || typeof( aTests ) == 'undefined') { aTests = ',,' } else { aTests = (',' + aTests + ',').replace( /,+/g, ',' ) }
        if (String(n).match( /,/)) {
    return `,${n},`.match( aTests   ) != null }
    return  aTests .match( `,${n},` ) != null
            }
//          ------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

