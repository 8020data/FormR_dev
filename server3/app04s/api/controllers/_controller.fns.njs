
      var { fixTableRoutes }    =  require( '../Routes/_route.fns.njs' ).fns
      var { getTableRoutes }    =  require( '../Routes/_route.fns.njs' ).fns

            pTableRoutes        =  { }
            pDefaultOptions     =  { Cmd: '' }
            TheControllersFile  = 'controllers'

/*      pModule   =  { fns :
         {  getControllers :  getControllers
            } }
     module.exports        =  pModule
*/
     module.exports        = { fns:   

// ----------------------------------------------------------------------------

// function getControllers( pModule, aShowEm ) {                                         
   { getControllers: function( pModule, aShowEm ) {  trace( )                           // called by routes.njs or ${aTable}.controllers.njs
        if (typeof(pModule) == 'string') { 
        var aControllerFile =  pModule.replace( /.+Controllers\//, ''          )        // controller file is always in Controllers folders
            aControllerFile =  aControllerFile.replace( /\.controllers.n?js/, '' )      // controller file always ends with 'controllers.njs'
            aControllerFile = `../Controllers/${aControllerFile}.controllers.njs`
            pModule         =  require( aControllerFile )
            }
        var aTable          =  pModule.TableName
        var aModel          =  pModule.ModelName
        var pRoutes_        =  pModule.Routes
        var pControllers_   =  pModule.Controllers
        var pOptions        =  pModule.Options ? pModule.Options : pDefaultOptions
//          console.log( `\ngetControllers     [1]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${pOptions.Cmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); // return

      if (! pTableRoutes[ '_default' ] ) {
            getControllerRoutes( '_default' )                                           // get default controller routes if not in pTableRoutes
            }
            getControllerRoutes( aTable, aModel, pRoutes_, pControllers_, pOptions )    // merge routroller routes with default controller routes

        if (String(aShowEm).match( /^showem$/i )) {
//          console.log( `getControllers     [9]  pTableRoutes[ '${aTable}' ] = \n`, fmtObj( pTableRoutes[ aTable ] ) )
//          console.log( `\npTableRoutes[ '${aTable}' ] =\n`, fmtObj( pTableRoutes[ aTable ] ) )  //#.(10208.02.1)
//          shoTableRoutes( pTableRoutes, aTable )                                                 // .(10208.02.1)
            require( '../Routes/_route.fns.njs' ).fns.shoTableRoutes( pTableRoutes, aTable )  // .(10208.02.1)
            }
     return pTableRoutes

          } // eof getControllers
//        ---------------------------------------------------------------------

// , shoTableRoutes: shoTableRoutes      
          
        } // eof fns 
//      ----------------------------------------------------------------------------
//   ----------------------------------------------------------------------------------------
     } // eof module.exports 
// --------------------------------------------------------------------------------------------------------------------------          

   function getControllerRoutes( aTable, aModel, pRoutes_, pControllers_, pOptions ) {   trace( ) // called by getControllers above
            aModel              = ( aModel )      ? aModel        : aTable
        var aCmd                =   pOptions     && pOptions.Cmd  ? pOptions.Cmd  : ''
        var pRoutes_            =   pRoutes_      ? pRoutes_      : require( `../Controllers/${aModel}.controllers.njs` ).Routes
        var pControllers_       =   pControllers_ ? pControllers_ : require( `../Controllers/${aModel}.controllers.njs` ).Controllers

            pControllers_       =   chkControllers( aTable, pRoutes_, pControllers_ )   // check that all routes action names exist as controler functions

        var pControllers        =   { }
        if (aCmd != 'replace') {
        var pControllers        =   renControllerFns( aModel, pControllers_ )           // change controller function names to ActionNames: `${aModel}.controller.${aAction}`
            }

        if (aTable.match( /_default/ )) { aTable = '${aTable}'; aModel = "_default"
//          console.log( `getControllerRoutes[1]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); // return
            pTableRoutes[ '_default'] = fixTableRoutes( aTable, aModel, pRoutes_ )      // change route keys and controller names in pTableRoutes
//          console.log( `getControllerRoutes[2]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pTableRoutes.length: ${ Object.keys(pTableRoutes).length }`, fmtObj( pTableRoutes) ); // return
        } else {
//          console.log( `getControllerRoutes[3]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); // return
            pTableRoutes[   aTable  ] = fixTableRoutes( aTable, aModel, pRoutes_ )      // change route keys and controller names in pTableRoutes
//          console.log( `getControllerRoutes[4]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pTableRoutes.length: ${ Object.keys(pTableRoutes).length }`, fmtObj( pTableRoutes) ); // return
            pTableRoutes[   aTable  ] = getTableRoutes( pTableRoutes, aTable, aCmd )    // merge default controller routes with table routes
            } 
            }
//          ---------------------------------------------------------------------

 function chkControllers( aTable, pRoutes, pControllers ) { trace( )
          Object.entries( pRoutes ).forEach( ( [ aRoute, mRoute ] ) => {
            var aFName      = (mRoute[1] || '').replace( / /g, '')
            if (aFName) {                                                               // the "remove" route has not controller
            var xController = pControllers[ aFName ]
            if (typeof( xController ) != 'function' ) {
                console.log( `** pControllers[ '${aFName}' ] is not defined for table: '${aTable}'. Creating a dummy function.` )
                xController = function( req, res, aAction ) { return }
                renFunction(  aFName, xController )
                pControllers[ aFName ] = xController
                mRoute[ 2 ] = "N/A"
                }
//          console.log( `aRoute: '${aRoute}': ${xController.name}` )
            } } )
     return pControllers
            }
//          ---------------------------------------------------------------------

   function renControllerFns( aModel, pControllers ) { trace( )
          Object.keys( pControllers ).forEach( aFName => {                              // defined controller function name in pControllers
            var xController =  pControllers[ aFName ]                                   // the actual defined function
//          var aActionName = `${aFName}.${xController.name}`                           // new     controller function name, i.e. ActionName
            var aActionName = `${aModel}.${TheControllersFile}.${xController.name}`     // new     controller function name, i.e. ActionName
            renFunction( aActionName, xController )
            } )
     return pControllers
            }
//          ---------------------------------------------------------------------

   function renFunction(  aFName,  xFNC ) {
          Object.defineProperty( xFNC, 'name', { value: aFName, writable: false } )
            }
//          ---------------------------------------------------------------------
/*
   function shoTableRoutes( pRoutes, aTable ) {
        var pTableRoutes = { } // { `${aTable}` : pRoutes }
            pTableRoutes[ aTable ] = pRoutes
            pTableRoutes = aTable ? pTableRoutes : pRoutes
            console.log( "\npTableRoutes =", fmtObj( pTableRoutes ) )
            }
//          ---------------------------------------------------------------------
*/
