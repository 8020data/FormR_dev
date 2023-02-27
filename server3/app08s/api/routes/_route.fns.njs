//   ------------------------------------------------------------------------------------------

            TheRouteWdt         =  45
            TheControllerWdt    =  40
            TheControllersName  = 'controllers'
//          TheControllersExt   = '.njs'
//          aShowEm             =  getEnvVar(  'SHOW_ROUTES').match( /true|1/i ) ? 'showEm' : (typeof(aShowEm) == 'undefined' ? '' : aShowEm )  // .(10311.02.1)
//          aShowEm             =  getEnvVar(   'DO_TRACING').match( /true|1/i ) ? 'showEm' : (typeof(aShowEm) == 'undefined' ? '' : aShowEm )  // .(10315.06.1)
            aShowEm             = `${process.env.DO_TRACING}`.match( /true|1/i ) ? 'showEm' : (typeof(aShowEm) == 'undefined' ? '' : aShowEm )  // .(10319.01.1)

            pTableRoutes        = { }
/*
     module.exports        = { fns:
         {  fixTableRoutes :  fixTableRoutes
         ,  getTableRoutes :  getTableRoutes
         ,  setTableRoutes :  setTableRoutes
         ,  chgRouteRoles  :  chgRouteRoles
            }
*/
//class Routes = {  // ... }                                                            // should we define a class?
    var Routes =

{ fns :

//  ------------------------------------------------------------------------------------------

   { fixTableRoutes: function( aTable, aModel, pRoutes ) { trace( aModel )              // called by _controller.fns.getControllerRoutes
//          console.log(    `fixTableRoutes     [1]  aTable: '${aTable}', aModel: '${aModel}', pRoutes.length: ${ Object.keys(pRoutes).length }`, inspect( pRoutes) ); // return
//          aTable      =  aMatch( /_default/ ) ? '${aTable}' : aTable                  // .(10311.03.1)
        Object.keys(  pRoutes ).forEach( function fixTableRoute( aRoute ) {
//      if (    aRoute.match( /api\/[^${]/ )) {                                         // if not /api/${aTable}/action or /route/action, then
        if (aRoute == 'ControllersFile') { return }                                     // .(10318.06.2 RAM This is what happens when you stick ControllersFile into pTableRoutes)
        var bNotAPI = aRoute.match( /^\/*((?!api).)*$/ ) != null                        // Allow for /route/action            .(10318.03.1)
    if (! ( aRoute.match( /\/api.*\/\${aTable}/ ) || bNotAPI )) {                       // if not /api/${aTable}/action, then .(10318.03.2 RAM or DB in route, i.e. /api/fr/${aTable}/action)
            aRoute  = aRoute.replace( / +/g, ' ' ).replace( / $/, '')
            console.log( ` ** Skipping route, ${aRoute}. It that may be a duplicate.`)
            return }                                                                    // prevent controller name from duplicating ?? // or pRoutes[ aRoute ][1].match( /\$\{aTable\}/ )
        var aRoles      =                            pRoutes[ aRoute ][ 0 ]
        var aController = `${aModel}.${TheControllersName}.${ pRoutes[ aRoute ][ 1 ] }` // change  controller name in pTableRoutes (not function name)
//          console.log( `fixTableRoutes     [2]  aTable: '${aTable}', aModel: '${aModel}',           aController: '${ aController }'` ); // return
        var aNewRoute   =  fmtRoute( aRoute.replace( /\$\{aTable\}/,  aTable ) )        // change default table name in new formatted route, if necessary
            pRoutes[ aNewRoute ] = [ aRoles, take( TheControllerWdt, aController )      // reset table route to new name and new controller name
                                   , pRoutes[ aRoute ][ 2 ] || '   ' ]                  // 'N/A' if controller function doesn't exist
        if (aNewRoute  !=  aRoute) { delete pRoutes[ aRoute ] }                         // delete old route if renamed
            } )
//          console.log( `fixTableRoutes     [3]  aTable: '${aTable}', aModel: '${aModel}', pRoutes.length: ${ Object.keys(pRoutes).length }`, inspect( pRoutes) ); // return
     return pRoutes
            }
//          ----------------------------------------------------------------------

   , getTableRoutes: function( pTableRoutes, aTable, aCmd ) { trace( aTable )           // called by _controller.fns.getControllerRoutes

        var aDefaultRoutes =  { }
       if ((aCmd.match( /^replace/ ) == null) && aTable != '${aTable}') {               // if using _default TableRoutes, i.e. "don't replace default contollers"
        var pDefaultRoutes =  setNewRoutes( '_default', aTable )                        // set default table name to current table name
            }
            pNewRoutes     =  setNewRoutes(   aTable    )                               // format route name and roles

            delTableRoutes(   pDefaultRoutes, pNewRoutes )
     return getUnqKeys(       pDefaultRoutes, pNewRoutes, TheRouteWdt )                 // return pTableRoutes for current table

   function setNewRoutes( aTable, aNewTable ) {
        var pNewRoutes= (aTable  == '_default') ? { } : pTableRoutes[ aTable ];
            Object.keys( pTableRoutes[ aTable ] ).forEach( function setNewRoute( aRoute ) {
        if (aRoute   == 'ControllersFile') { return }                                   // .(10318.06.2 RAM This is what happens when you stick ControllersFile into pTableRoutes)
        var mOldRoute =  pTableRoutes[ aTable ][ aRoute ]
                     if (aTable  == '_default') {
                         aRoute   =   aRoute.replace( /\$\{aTable\}/, aNewTable ) }     // insert table name into default route
                         aRoute   =   fmtRoute(  aRoute )                               // format new and/or old route key
            pNewRoutes[  aRoute ] = [ fmtRoles(  mOldRoute[ 0 ] )                       // format roles
                       , take( TheControllerWdt, mOldRoute[ 1 ] )                       // format controller name
                                               , mOldRoute[ 2 ] || '   ' ]              // N/A' if controller function doesn't exist
                         } )
     return pNewRoutes }  // eof setNewRoutes
            } // eof getTableRoutes
//          ----------------------------------------------------------------------

   , setTableRoutes( pTableRoutes_, aTable, pApp ) {  trace( `\n` )                     // called by routes.njs or ${aTable}.controllers.njs
        if (typeof(aTable) == 'string') {
      if (! pTableRoutes_[ aTable ] ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
        var pTableRoutes = { }
            pTableRoutes[  aTable  ] =  pTableRoutes_[ aTable ]
        } else {
        var pTableRoutes = pTableRoutes_
            pApp         = aTable
            }
     delete pTableRoutes[ '_default' ]                                                  // .(10208.08.8 ;-)
            setAppRoutes(  pTableRoutes,  pApp  )                                       // see below
            }
//          ----------------------------------------------------------------------

   , getAppRoutes( pTableRoutes_, aTable ) {  trace( `\n` )                             // called by routes.njs or ${aTable}.controllers.njs
        if (typeof(aTable) == 'string') {                                               // .(10319.06.1 RAM Let aTable be a list)
      if (! pTableRoutes_[ aTable ] ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
        var pTableRoutes = { }
            pTableRoutes[  aTable  ] =  pTableRoutes_[ aTable ]
        } else {
        var pTableRoutes = pTableRoutes_
            }

     delete pTableRoutes[ '_default' ]                                                  // .(10208.08.8 ;-)
        var pRoutes = getAppRoutes_( pTableRoutes )                                     // .(10314.01.1 RAM So you can see the result when debugging)
    return  pRoutes                                              // see below
            }
//          ----------------------------------------------------------------------

   , setAppRoutes  : setAppRoutes                                                       // .(10213.15.1 RAM For testing?)
   , getAppRoutes_ : getAppRoutes_                                                      // .(10313.15.1 RAM Another way)

//          ----------------------------------------------------------------------

   , setRouteRoles( pRoutes, aRole, aChg, aActions ) { trace( )                         // .(10309.01.1 RAM Was setRoles, changed due to name conflict)
        if (typeof( DoShowEm ) == 'undefined') { DoShowEm = '' }
//    var { chgRouteRoles }  = require( '../Routes/_route.fns.njs' ).fns

          Object.entries( pRoutes ).forEach( ( [ aRoute, mControllerRoles ] ) => {
        var aOldRoles        = mControllerRoles[0]
            mControllerRoles = chgRouteRoles( mControllerRoles, aRole, aChg, aActions ) // [ aRoles, aController, aNotOK ]

        if (typeof( DoShowEm ) == 'undefined') { DoShowEm = '' }
        if (mControllerRoles[0] && String(DoShowEm).match( /^(showem|true)$/i )) {
            console.log( `   For Route: ${ fmtRoute( aRoute.replace( /[ ]+/, " " ) ) } ${aChg} Roles to '${mControllerRoles[0]}' from '${aOldRoles}.` )
            }
            } )
     return pRoutes
            }
//          ----------------------------------------------------------------------

   , chgRouteRoles : chgRouteRoles

//          ----------------------------------------------------------------------

   , shoTableRoutes( pRoutes, aTable ) { trace()
          if (nObjs( pRoutes) > 1 && aTable) {
      if (! pRoutes[  aTable ]  ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
            pRoutes = pRoutes[ aTable ]
            }
        var pTableRoutes = { } // { `${aTable}` : pRoutes }
            pTableRoutes[  aTable ] = pRoutes
            pTableRoutes = aTable ?   pTableRoutes : pRoutes
            console.log( "\npTableRoutes =", fmtObj( pTableRoutes ) )
            }
//          ----------------------------------------------------------------------
     } } // eoo Routes.fns
//  ------------------------------------------------------------------------------------------

     module.exports  =  Routes

//  ------------------------------------------------------------------------------------------

   function delTableRoutes( pDefaultRoutes, pTableRoutes ) { trace()
        var aActions = Object.keys(  pTableRoutes   ).map(  aRoute => {
        if (aRoute.match( /remove / )) { delete  pTableRoutes[ aRoute ]
     return aAction = aRoute.replace( /(remove |default )/g, '' ).replace( / /g, '') } } ).join( ',' )
        if (aActions.replace( /,/g, '' )) { aActions  = `,${aActions},`
            Object.keys(  pDefaultRoutes ).map(  aRoute => {
            aAction = pDefaultRoutes[ aRoute ][1].replace( /.+\./, '' ).replace( / /g, '')
        if (0  <= aActions.indexOf( `,${aAction},` ) ) { delete pDefaultRoutes[ aRoute ] }
            } ) } }
//          ----------------------------------------------------------------------

//          aShowEm      =   (process.env.SHOW_ROUTES .match( /true|1/i  )) ? 'showset' : aShowEm; bOnce = 1    //#.(10311.02.2).(10315.12.1)
//          aShowEm      =   (getEnvVar( 'DO_TRACING').match( /showset/i )) ? 'showset' : aShowEm               //#.(10311.02.2).(10315.12.1).(10315.06.1)
            aShowEm      = `${process.env.DO_TRACING}`.match( /showset/i )  ? 'showset' : aShowEm               // .(10311.02.2).(10315.12.1).(10315.06.1).(10319.01.2 RAM Undefined var doesn't fail in `${}`)

            TheApp       =  null; bOnce = 1

  function  getAppRoutes_(  pTableRoutes, aTable ) {                                                            // .(10313.02.1 Beg RAM Return pRouter)
            TheApp       =  require( 'express' ).Router()                                                       // .(10313.02.2 RAM aka pRouter)
//          setAppRoutes(   pTableRoutes, aTable )                                                              //#.(10319.03.1 RAM ??)
            setAppRoutes(   pTableRoutes, TheApp )                                                              // .(10319.03.1)
     return TheApp
            }
//          ----------------------------------------------------------------------

  function  setAppRoutes(   pTableRoutes,  pApp, aTable ) {                                                 // .(10319.04.1 RAM Added aTable)
        if (typeof(pApp) == 'object') { TheApp  = pApp }                                                    // .(10313.02.1 RAM Was: != 'string')
        if (typeof(DoShowEm) == 'undefined') { DoShowEm = '' }
        if (String(DoShowEm).match( /^(showem|true|showset)$/i )) { aShowEm = DoShowEm }
        if (aTable) { var p = { }; p[ aTable ] = pTableRoutes[ aTable ]; pTableRoutes = p }                 // .(10319.04.2)

                                        trace( `${ Object.keys( pTableRoutes ).length } Tables` )        
        if (typeof(pApp) == 'string') { aShowEm = pApp }
            Object.keys( pTableRoutes ).forEach( function setAppRoute( aTable ) { trace( `${ Object.keys( pTableRoutes[ aTable] ).length - 1 } Routes for '${aTable}'`)
            Object.keys( pTableRoutes[ aTable ] ).forEach( function setRoute_( aRoute ) {
           var aControllersFile = pTableRoutes[ aTable ].ControllersFile                                    // .(10318.09.1 RAM OK!)


               setRoute( aRoute,  pTableRoutes[ aTable ][ aRoute ],  aControllersFile ) } ) } )             //#.(10318.09.2 RAM Added aControllersFile)
//             setRoute( aRoute,  pTableRoutes[ aTable ][ aRoute ]                    ) } ) } )             // .(10318.09.2 RAM Added aControllersFile)

        if (String(aShowEm).match( /^show/i )){ console.log( "" ) }
            }
//          ----------------------------------------------------------------------

//function  setRoute( aRoute, aRoles, aController,  aControllersFile ) { trace( bOnce )                     //#.(10318.09.3)
  function  setRoute( aRoute,         mController,  aControllersFile ) { trace( bOnce )                     // .(10318.09.3)
//      var mController  = (aController ? [ aRoles, aController ] : aRoles) || ['']                         //#.(10318.09.3 RAM Don't know why mController passed seperately)
        var aRoles       =  mController[0] ? mController[0] : '* * * *'
        var aController  =  mController[1]
        var aNotOK       =  mController[2] == 'N/A' ? ' ** Dummy Function' : ''

        if (String(aShowEm).match( /^(showem|showset)$/i )) {
//          console.log( `   Set Route: ${aRoute}      to: ${ take( 39, aController ) } for roles: ${aRoles} ${aNotOK}` )
            }
        var mRoute       =  aRoute.split( / +/ )
        var aProtocol    =  mRoute[0].match(   /http[s:/.]+/ );  aProtocol = aProtocol ? aProtocol[0].replace( /[:/.]+/, '' ) : 'none'
        var aMethod      =  mRoute[0].replace( /http[s:/.]+/, '' )
        var aRoute_      =  mRoute[1]

        if (aController.match( /_default/)) {                                                               // .(10326.01.1 Beg RAM Need to switch to _default Controlls File)
//          aControllersFile = `${FORMRs_4}/FMR_default.controllers.njs`                                    //#.(10326.01.3 RAM Breakes of the require( ../...)s below) 
//          aControllersFile = `../controllers/_default.controllers.njs`                                    //#.(10326.01.3 RAM using pFS below so it can't be a relative path) 
            aControllersFile = `${APP_HOME}/api/controllers/_default.controllers.njs`                       // .(10326.01.3) 
            }                                                                                               // .(10326.01.1 End)
        if (aRoute_) {
            setRte( aProtocol, aMethod, aRoute_, aRoles, aController, aControllersFile )                    // .(10318.09.3)
            } }
//          ----------------------------------------------------------------------

   function setRte( aProtocol, aMethod, aRoute,  aRoles, aController, aControllersFile ) { trace( bOnce, `${aProtocol}, '${aMethod}', '${aRoute}', '${aRoles}', '${ aController.replace( / /g, '' ) }'` ); bOnce = 0  // .(10318.09.4)
//                                                                       trace( -1, `controller: ${aController}` )
        var mController     =  aController.replace( / /g, '' ).split( '.' )

//      var aControllersFile=  mController.slice( 0, -1 ).join( '.')                                            // .(10318.09.5)
        var aActionName     =  mController.slice(    -1 )[0]

//     if (!require('fs').existsSync( `${APP_HOME}/api/Controllers/${aControllerFile}${TheControllersExt}` )) { //#.(10311.01.1 Beg RAM Catch this error).(10318.09.6)
       if (!require('fs').existsSync(                                aControllersFile                      )) { // .(10311.01.1 Beg RAM Catch this error).(10318.09.6)
        if (aControllersFile == '') {                                                                           // .(10326.01.1 RAM Was: aControllerFile. Why did this error not show up before?)
            console.log( ` ** There is no controllers file associated with the controller method: '${ aController }'.` )

        } else {
//          console.log( ` ** The controllers file, '${aControllerFile}${TheControllersExt}', does not exist.` )// #.(10318.09.7)
            console.log( ` ** The controllers file, '${aControllersFile}', does not exist.` )                   // .(10318.09.7)
            }
            return }                                                                                            // .(10311.01.1 End)

//      var pControllers    =  require( `../Controllers/${aControllerFile}${TheControllersExt}` ).Controllers   //#.(10211.02.x)
//      var pControllers    =  require( `../Controllers/${aControllerFile}` ).Controllers                       // .(10211.02.x)
        var pControllers    =  require(                   aControllersFile  ).Controllers                       // .(10211.02.x).(10318.09.8)
        var xController     =  pControllers[ aActionName ]

        if (TheApp && xController) {                                                                            // .(10301.13.1 RAM )

          switch ( aMethod ) {
            case 'get'      :  TheApp.get(    aRoute, xController ); break;
            case 'post'     :  TheApp.post(   aRoute, xController ); break;
            case 'put'      :  TheApp.put(    aRoute, xController ); break;
            case 'delete'   :  TheApp.delete( aRoute, xController ); break;
            case 'patch'    :  TheApp.patch(  aRoute, xController ); break;
              default       :  TheApp.get(    aRoute, xController )
              }  } // eif TheApp

      if (! xController ) {                                                                                                                           // .(10301.13.2)
            console.log( `The Route: ${ take( 7, aMethod ) } ${ take( 30, aRoute ) } *** does NOT have a controller function.` )                      // .(10301.13.3)
      } else {                                                                                                                                        // .(10301.13.4)
//      if (String(aShowEm).match( /^(showem|showset)$/i )) {
        if (String(aShowEm).match( /^showset/i )) {
        var aMsg =  TheApp ? "    was set" : "will be set"                                                                                            // .(10211.03.1)
//      var aControllerFile = take( 39, aControllersFile + '.' + aActionName )                                                                        //#.(10323.01.1)
        var aControllerName = take( 39, xController.name ) // aController.replace( / +/, ' ' )                                                                   // .(10323.01.1)
//          console.log( `    The Route:      ${ take( 7, aMethod ) } ${ take( 22, aRoute ) } to ../Controllers/${aControllerFile} ${aMsg}.` )
//          console.log( `    The Route:      ${ take( 7, aMethod ) } ${ take( 34, aRoute ) } to: ${aControllerFile} for roles: ${aRoles} ${aMsg}.` ) //#.(10211.03.2)
//          console.log( `  A Route: ${ take( 7, aMethod ) } ${ take( 30, aRoute ) } ${aMsg} to: ${aControllersFile} for roles: ${aRoles}.` )         //#.(10211.03.2).(10323.01.2)
            console.log( `  A Route: ${ take( 7, aMethod ) } ${ take( 30, aRoute ) } ${aMsg} to: ${aControllerName} for roles: ${aRoles}.` )          // .(10323.01.2)
        }   }                                                                                                                                         // .(10301.13.5)
//          ---------------------------------------------------------------
            } // eof setRoute
//          ----------------------------------------------------------------------

   function fmtRoute( aRoute ) {
        var [ aMethod, aURI ] =  aRoute.replace( /[ ,]+/g, '|' ).split( '|' )
              aURI            =  aURI.replace(   /"/g, '' )                                                         // .(10311.03.2 RAM Remove any quotes)
     return take( TheRouteWdt, take( 13, aMethod ) + aURI )
            }
//          ----------------------------------------------------------------------

   function chgRouteRoles( mControllerRoles, aRole, aChg, aActions ) {  trace()                                     // called by routes.njs or ${aTable}.controllers.njs
       var  aRoles    =    mControllerRoles[0], aAction = mControllerRoles[1]
        if (aAction) {
            aAction   =        aAction.replace( /^.+\./, '' ).replace( / /g,     ''  )
            aActions  = '(' + aActions.replace( /\*/g, '.+' ).replace( /[, ]+/g, '|' ).replace( /^\|/, '' ) + ')'   // .(10204.01.1 RAM Get rid of /(|delete+)/ )
       if ( aAction.match( new RegExp(  aActions ) )  ||  aActions == '(all)' ) {
            if (aChg == 'add') {  aRoles  =  aRoles + ' '  + aRole.substr(0,1);        }
            if (aChg == 'del') {  aRoles  =  aRoles.replace( aRole.substr(0,1), '*' ); }
            if (aChg == 'chg') {  aRoles  =  aRole.substr(0,1) }
            mControllerRoles[0] = fmtRoles ( aRoles )
            } }
     return mControllerRoles
            }
//          ----------------------------------------------------------------------

   function fmtRoles( aRoles ) {
            aRoles =  aRoles || ''
            aRoles = (aRoles.match( /A/i ) ? 'A ' : '- ')
                   + (aRoles.match( /E/i ) ? 'E ' : '- ')
                   + (aRoles.match( /U/i ) ? 'U ' : '- ')
                   + (aRoles.match( /I/i ) ? 'I'  : '-' )
     return aRoles
            }
//          ----------------------------------------------------------------------

   function getUnqKeys(  pObjs1,    pObjs2, nWdt ) {
        var pObjs = { ...pObjs1, ...pObjs2 }; nWdt = nWdt ? nWdt : TheRouteWdt
     return Object.keys( pObjs ).reduce( function( pObj, aKey ) {                       // return new unique objects
            pObjs[ aKey ][1] = take( TheControllerWdt, pObjs[ aKey ][1] )               // .(10207.01.3 RAM ??? Kludge to fix aRoute width)
            pObj[ ( aKey + '                                                          ' ).substr( 0, nWdt ) ] = pObjs[ aKey ];
     return pObj;
            }, { } );  // eof pObjs.reduce
            }
//          ----------------------------------------------------------------------

   function nObjs  ( pObj ) { var m = require( 'util').inspect( pObj ).match( /{\n/g ); return m ? m.length: 0 }  // .(10301.07.1 RAM Wouild fmtObj work?)

//  ------------------------------------------------------------------------------------------

   function getEnvVar( aVar ) {
        var aVal = typeof( process.env[ aVar ] ) != 'undefined' ? process.env[ aVar ] : ''
     return aVal
            }