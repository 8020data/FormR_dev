
      var { fixTableRoutes }    =  require( '../Routes/_route.fns.njs' ).fns
      var { getTableRoutes }    =  require( '../Routes/_route.fns.njs' ).fns

            pTableRoutes        =  { }
            pDefaultOptions     =  { Cmd: '' }
            TheControllersName  = 'controllers'    // .(10319.13.1 RAM It's not used everywere)

/*      pModule   =  { fns :
         {  getControllers :  getControllers
            } }
     module.exports        =  pModule
*/
     module.exports        = { fns:   

// ----------------------------------------------------------------------------

   { getControllers:  function( pModule, aShowEm ) {  trace( )                                // called by routes.njs or ${aTable}.controllers.njs
//          pDefaultOptions = { Cmd: '', ControllersFilename: '../controllers/_default.controllers.njs' }                //#.(10301.03.3).(10318.02.9)
            pDefaultOptions = { Cmd: '', ControllersFilename: `${APP_HOME}/api/controllers/_default.controllers.njs` }   // .(10301.03.3).(10318.02.9)
//          pDefaultOptions = { Cmd: '', ControllersFilename: `${FORMRs_4}/FMR_default.controllers.njs` }                // .(10301.03.3).(10318.02.9)

        if (typeof(pModule) == 'string') { var reModel = new RegExp( `${pModule}.controllers?[^_]\.n?js`)
 
//      var aControllerFile  =  pModule.replace( /.+Controllers\//, ''          )             // controller file is always in Controllers folders
//          aControllerFile  =  aControllerFile.replace( /\.controllers.n?js/, '' )           // controller file always ends with 'controllers.njs'
//          aControllerFile  = `../controllers/${aControllerFile}.controllers.njs`

//      var mControllerFiles =  require('fs').readdirSync( process.argv[1].replace( /[\\\/]routes.+/, '/controllers') )          // .(10301.03.3 RAm Search controllers folder for '${aModel}.controller.n*js')
//      var mControllerFiles =  require('fs').readdirSync( `../controllers` )                                                    // .(10301.03.3 RAM Search controllers folder for '${aModel}.controller.n*js')
//      var mControllerFiles =  require('fs').readdirSync( `${BRANCH_HOME}/${APP_DIR}/api/controllers` )                         // .(10301.03.3 RAM Search controllers folder for '${aModel}.controller.n*js')
        var mControllerFiles =  require('fs').readdirSync( `${APP_HOME}/api/controllers` )                                       // .(10301.03.3 RAM Search controllers folder for '${aModel}.controller.n*js').(10316.04.2 RAM Use APP_HOME)
//      var aControllersFile =  mControllerFiles.filter( aFile  => aFile.match( new RegExp( `${pModule}.controllers[^_].+`) ) )  //#.(10303.13.1 RAM Don't find old versions).(10316.04.2)
        var aControllersFile =  mControllerFiles.filter( aFile  => aFile.match( reModel ) )                                      // .(10303.13.1 RAM Don't match old versions).(10316.04.2 RAM Move it to above)
            pModule          =  require( `../controllers/${aControllersFile[0]}` )
            }
//      var aControllersFile =  pModule.options.ControllersFilename                                         // .(10301.03.3)
        var aTable           =  pModule.TableName                                                           // .(10318.04.1 RAM Let's not use aModel for key in pTableRoutes)                                                     
//      var aTable           =  pModule.ModelName  // pModule.TableName                                     //#.(10318.04.1 RAM Let's use aModel for key in pTableRoutes)                                                     
        var aModel           =  pModule.ModelName
        var pRoutes_         =  pModule.Routes
        var pControllers_    =  pModule.Controllers
        var pOptions         =  pModule.Options ? pModule.Options : pDefaultOptions
//          console.log( `\ngetControllers     [1]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${pOptions.Cmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); // return

      if (! pTableRoutes[ '_default' ] ) {
//          getControllerRoutes( '_default' )                                                 // get default controller routes if not in pTableRoutes
            getControllerRoutes( '_default',  null,  null,  null,   pDefaultOptions )         // .(10303.03.8 RAM Need _defaultController Filename).(10303.09.1 RAM Don't use empty {})
            }
            getControllerRoutes( aTable, aModel, pRoutes_,  pControllers_, pOptions )         // merge routroller routes with default controller routes

        if (String(aShowEm).match( /^showset$/i )) {                                          // .(10315.13.1 RAM Changed from showem)
//          console.log( `getControllers     [9]  pTableRoutes[ '${aTable}' ] = \n`, fmtObj( pTableRoutes[ aTable ] ) )
//          console.log( `\npTableRoutes[ '${aTable}' ] =\n`, fmtObj( pTableRoutes[ aTable ] ) )   //#.(10208.02.1)
//          shoTableRoutes( pTableRoutes, aTable )                                                 // .(10208.02.1)
            require( '../Routes/_route.fns.njs' ).fns.shoTableRoutes( pTableRoutes, aTable )  // .(10208.02.1)
            }
     return pTableRoutes

          } // eof getControllers
//        ---------------------------------------------------------------------
          
        } // eof fns 
//      ----------------------------------------------------------------------------
//   ----------------------------------------------------------------------------------------
     } // eof module.exports 
// --------------------------------------------------------------------------------------------------------------------------          

   function getControllerRoutes( aTable, aModel, pRoutes_, pControllers_, pOptions ) {   trace( ) // called by getControllers above
            aModel              =   aModel        ? aModel        : aTable                        // .(10319.08.1 RAM Only works if aModel is passed as '')           
        var aCmd                =   pOptions     && pOptions.Cmd  ? pOptions.Cmd  : ''

        var aControllersFile    =   pOptions.ControllersFilename                                                                        // .(10303.06.2)
//      var pRoutes_            =   pRoutes_      ? pRoutes_      : require( `../Controllers/${aModel}.controllers.njs` ).Routes        // .(10303.06.3)
//      var pControllers_       =   pControllers_ ? pControllers_ : require( `../Controllers/${aModel}.controllers.njs` ).Controllers   // .(10303.06.4)
        var pRoutes_            =   pRoutes_      ? pRoutes_      : require(    aControllersFile ).Routes                               // .(10303.06.3)
        var pControllers_       =   pControllers_ ? pControllers_ : require(    aControllersFile ).Controllers                          // .(10303.06.4)

            pControllers_       =   chkControllers( aTable, pRoutes_, pControllers_ )   // check that all routes action names exist as controler functions

        var pControllers        =   { }
        if (aCmd.match(   /'^replace/ ) == null) {                                                      // .(10319.11.2 RAM Beware FName might not be found in chkControllers)
        var pControllers        =   renControllerFns( aModel, pControllers_ )                           // change controller function names to ActionNames: `${aModel}.controller.${aAction}`
            }

        if (aTable.match( /_default/ )) { aTable = '${aTable}'; aModel = "_default"
//          console.log( `getControllerRoutes[1]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); // return
//          pTableRoutes[ '_default' ] = fixTableRoutes( aTable, aModel, pRoutes_, aControllersFile )   // .(10303.06.5)   // change route keys and controller names in pTableRoutes
            pTableRoutes[ '_default' ] = fixTableRoutes( aTable, aModel, pRoutes_ )                     // change route keys and controller names in pTableRoutes
//          console.log( `getControllerRoutes[2]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pTableRoutes.length: ${ Object.keys(pTableRoutes).length }`, fmtObj( pTableRoutes) ); // return
            pTableRoutes[ '_default' ].ControllersFile = aControllersFile                               // .(10318.06.1)
        } else {
//          console.log( `getControllerRoutes[3]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); // return
//          pTableRoutes[   aTable   ] = fixTableRoutes( aTable, aModel, pRoutes_, aControllersFile )   // .(10303.06.6)   // change route keys and controller names in pTableRoutes
            pTableRoutes[   aTable   ] = fixTableRoutes( aTable, aModel, pRoutes_ )                     // change route keys and controller names in pTableRoutes
//          console.log( `getControllerRoutes[4]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pTableRoutes.length: ${ Object.keys(pTableRoutes).length }`, fmtObj( pTableRoutes) ); // return
            
            pTableRoutes[   aTable   ] = getTableRoutes( pTableRoutes, aTable, aCmd )                   // merge default controller routes with table routes
//          pTableRoutes[   aTable   ].ControllersFile = aControllersFile                               // .(10318.05.1 RAM Ok, let's save it)
            pTableRoutes[   aTable   ].ControllersFile = aControllersFile                               // .(10318.06.1)
        }   } 
//          ---------------------------------------------------------------------

 function chkControllers( aTable, pRoutes, pControllers ) { trace( aTable )
          Object.entries( pRoutes ).forEach( function chkController( [ aRoute, mRoute ] ) {
            if (aRoute     == 'ControllersFile') { return }                                             // .(10318.06.3 RAM This is what happens when you stick ControllersFile into pTableRoutes)
            var aFName      = (mRoute[1] || '').replace( / /g, '')
            var aFName      =  aFName.replace( /.+controllers*\./, '' )                                 // .(10319.11.1 RAM If the action has been renamed, strip leading `${aMode}.controller.`)
            if (aFName) {                                                                               // the "remove" route has no controller
            var xController =  pControllers[ aFName ]
            if (typeof( xController ) != 'function' ) {
                console.log( ` ** pControllers[ '${aFName}' ] is not defined for table: '${aTable}'. Creating a dummy function.` )
                xController =  function( req, res, aAction ) { return }
                renFunction(   aFName,    xController )
                pControllers[  aFName ] = xController
                mRoute[ 2 ] = "N/A"
                }
//          console.log( `aRoute: '${aRoute}': ${xController.name}` )
            } } )
     return pControllers
            }
//          ---------------------------------------------------------------------

   function renControllerFns( aModel, pControllers ) { trace( aModel )
          Object.keys( pControllers ).forEach( function renControllerFn( aFName ) {     // defined controller function name in pControllers
            var xController =  pControllers[ aFName ]                                   // the actual defined function
//          var aActionName = `${aFName}.${xController.name}`                           // new     controller function name, i.e. ActionName
            var aActionName = `${aModel}.${TheControllersName}.${xController.name}`     // new     controller function name, i.e. ActionName
        if (xController.name) {                                                              // it may not be defined 
            renFunction( aActionName, xController ) }
            } )
     return pControllers
            }
//          ---------------------------------------------------------------------

   function renFunction(  aFName,  xFNC ) {

       try{ Object.defineProperty( xFNC, 'name', { value: aFName, writable: false } ) }
       catch(e) { 
            console.log( e )
            }
            }
//          ---------------------------------------------------------------------
