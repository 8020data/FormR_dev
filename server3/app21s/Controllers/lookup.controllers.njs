
// ----------------------------------------------------------------------------------------------------------------

        var aTable  =  'lookups'
        var aModel  =  'lookup'
        var aFName  =  `${aModel}.controllers`
//      var aTests  =  '2'

//      --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                     Method   Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               {
                  }

//      --------------------------------------------------------------------------------------------------

        var pControllers    =

//          ------------------------------------------------------------------------------------
          {

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
//           ,  Options     : { Cmd: 'replace' }
                }

        var pRoutes2 =
             { }
        var pRoutes3 =
             { 'http.get     /api/${aTable}/findAll/         ' : [ '      E', 'findAll             ' ]
             , 'http.get     /api/${aTable}/findOne/         ' : [ '      E', 'findOne             ' ] }
        var pRoutes4 =
             { 'http.get     /api/${aTable}/findAll/         ' : [ '      E', 'findAll             ' ]
             , 'http.get     /api/${aTable}/findOne/         ' : [ '      E', 'findOne             ' ] }
        var pRoutes5 =
             { 'http.get     /api/${aTable}/findAll/         ' : [ '      E', 'findAll             ' ] }

        var pControllers4   =
             {  findOne     :   function( req, res, aAction ) { return }
                }

          module.exports1   =
            {  TableName    : 'Tab1', ModelName: 'Mod1', Routes: pRoutes,  Controllers: pControllers }

          module.exports2   =
            { TableName     : 'Tab2', ModelName: 'Mod2', Routes: pRoutes2, Controllers: pControllers, Options: { Cmd: 'replace' } }

          module.exports3   =
            { TableName     : 'Tab3', ModelName: 'Mod3', Routes: pRoutes3, Controllers: pControllers }

          module.exports4   =
            { TableName     : 'Tab4', ModelName: 'Mod4', Routes: pRoutes4, Controllers: pControllers4, Options: { Cmd: 'replace' } }

          module.exports5   =
            { TableName     : 'Tab5', ModelName: 'Mod5', Routes: pRoutes5, Controllers: pControllers, Options: '' }

// ----------------------------------------------------------------------------------------------------------------

 if (typeof( aTests ) == 'undefined') { aTests = '' } else { aTests = ',' + aTests + ','}
 if (aTests.match( /,1,/ )) {

      var { getControllers } =  require( '../Controllers/_controller.fns.njs' ).fns

                                getControllers( module.exports,  'showem' )
            pTableRoutes     =  getControllers( module.exports1, 'showem' )
            pTableRoutes     =  getControllers( module.exports2, 'showem' )
            pTableRoutes     =  getControllers( module.exports3, 'showem' )
            pTableRoutes     =  getControllers( module.exports4, 'showem' )
            pTableRoutes     =  getControllers( module.exports5, 'showem' )
            }
//          ------------------------------------------------------

 if (aTests.match( /,2,/ )) {

      var { getControllers } =  require( '../Controllers/_controller.fns.njs' ).fns
      var { setTableRoutes } =  require( '../Routes/_route.fns.njs'           ).fns
      var { chgRouteRoles  } =  require( '../Routes/_route.fns.njs'           ).fns

            pTableRoutes     =  getControllers( module.exports, 'showem' )
                                setRouteRoles(  aTable, 'everyone', 'chg', 'all' )
                                setTableRoutes( pTableRoutes, aTable,   'ShowEm' )
            }
//          ------------------------------------------------------

   function setRouteRoles(  aTable, aRole, aChg, aActions ) {
            Object.entries( pTableRoutes[ aTable ] ).forEach( ( [ aRoute, mController ] ) => {
//            pTableRoutes[ aTable  ][ aRoute ] = chgRoles( mControllerRoles, aRole, aChg, aActions )
              mController = chgRouteRoles( mController, aRole, aChg, aActions )  // [ aRoles, aController, aNotOK ]
//      var [ aRoles, aController ] = mControllerRoles                                       //
//            mControllerRoles = chgRoles( [ aRoles, aController ], aRole, aChg, aActions )  // mControllerRoles is not updates
            } ) }
//          ------------------------------------------------------
