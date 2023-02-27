//   ------------------------------------------------------------------------------------------

            TheRouteWdt         =  45
            TheControllerWdt    =  40
            TheControllersFile  = 'controllers.njs'                                    // .(10211.02.x) 
//          TheControllersExt   = '.njs'                                               //#.(10211.02.x) 
            pTableRoutes        = { }
/*
     module.exports        = { fns:
         {  fixTableRoutes :  fixTableRoutes
         ,  useTableRoutes :  useTableRoutes
         ,  setTableRoutes :  setTableRoutes
         ,  chgRouteRoles  :  chgRouteRoles
         ,  inspect        :  inspect
         ,  take           :  take
            }
*/
//class Routes = {  // ... }                                                            // should we define a class?
    var Routes =

{ fns :

//  ------------------------------------------------------------------------------------------

   { fixTableRoutes: function( aTable, aModel, pRoutes ) {                              // called by _controller.fns.setControllersRoutes
//          console.log( `fixTableRoutes     [1]  aTable: '${aTable}', aModel: '${aModel}',           pRoutes.length: ${ Object.keys(pRoutes).length }`, inspect( pRoutes) ); // return
        var aControllersName = TheControllersFile.replace( /\.n?js/, '' )                           // .(10211.02.1)
        Object.keys(  pRoutes ).forEach( aRoute => {
        if (aRoute.match( /api\/[^${]/ )) {                                             // if not /api/${aTable}/action or /route/action, then
            console.log( "** Skipping route that may be a duplicate.")
            return }                                                                    // prevent controller name from duplicating ?? // or pRoutes[ aRoute ][1].match( /\$\{aTable\}/ )
        var aRoles      =                                   pRoutes[ aRoute ][ 0 ]
        var aController = `${aModel}.${aControllersName}.${ pRoutes[ aRoute ][ 1 ] }`   // change  controller name in pTableRoutes (not function name)
//          console.log( `fixTableRoutes     [2]  aTable: '${aTable}', aModel: '${aModel}',           aController: '${ aController }'` ); // return
        var aNewRoute   =  fmtRoute( aRoute.replace( /\$\{aTable\}/,  aTable ) )        // change default table name in new formatted route, if necessary
            pRoutes[ aNewRoute ] = [ aRoles, take( TheControllerWdt, aController )      // reset table route to new name and new controller name
                                   , pRoutes[ aRoute ][ 2 ] || '   ' ]                  // 'N/A' if controller function doesn't exist
        if (aNewRoute  !=  aRoute) { delete pRoutes[ aRoute ] }                         // delete old route if renamed
            } )
//          console.log( `fixTableRoutes     [3]  aTable: '${aTable}', aModel: '${aModel}',           pRoutes.length: ${ Object.keys(pRoutes).length }`, inspect( pRoutes) ); // return
     return pRoutes
            }
//          ----------------------------------------------------------------------

   , useTableRoutes: function( pTableRoutes, aTable, aCmd ) {                           // called by _controller.fns.setControllersRoutes

        var aDefaultRoutes =  { }
        if (aCmd != 'replace' && aTable != '${aTable}') {
        var pDefaultRoutes =  setNewRoute( '_default', aTable )                         // set default table name to current table name
            }
            pNewRoutes     =  setNewRoute(    aTable    )                               // format route name and roles

            delTableRoutes(   pDefaultRoutes, pNewRoutes )
     return getUnqKeys(       pDefaultRoutes, pNewRoutes, TheRouteWdt )                 // return pTableRoutes for current table

   function setNewRoute( aTable, aNewTable ) {
        var pNewRoutes= (aTable == '_default') ? { } : pTableRoutes[ aTable ];
            Object.keys( pTableRoutes[ aTable ] ).forEach( aRoute => {
        var mOldRoute =  pTableRoutes[ aTable ][ aRoute ]
                     if (aTable == '_default') {
                         aRoute   =   aRoute.replace( /\$\{aTable\}/, aNewTable ) }     // plugin table name into default route
                         aRoute   =   fmtRoute(  aRoute )                               // format new and/or old route key
            pNewRoutes[  aRoute ] = [ fmtRoles(  mOldRoute[ 0 ] )                       // format roles
                       , take( TheControllerWdt, mOldRoute[ 1 ] )                       // format controller name
                                               , mOldRoute[ 2 ] || '   ' ]              // N/A' if controller function doesn't exist
                         } )
     return pNewRoutes }  // eof setNewRoute
            } // eof useTableRoutes
//          ----------------------------------------------------------------------

   , setTableRoutes( pTableRoutes_, aTable, pApp, aShowEm ) {                           // called by routes.njs or ${aTable}.controllers.njs

                                               DoShowEm = ''                                        // .(10211.04.1 Beg RAM )
        if (String(aTable ).match( /^show/)) { DoShowEm = aTable, aTable = pApp, pApp = aShowEm }
        if (String(pApp   ).match( /^show/)) { DoShowEm =                  pApp, pApp = aShowEm }
        if (String(aShowEm).match( /^show/)) { DoShowEm =                               aShowEm }   // .(10211.04.1 End)

        if (typeof(aTable) == 'string') {

      if (! pTableRoutes_[ aTable ] ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
        var pTableRoutes = { }
            pTableRoutes[  aTable  ] =  pTableRoutes_[ aTable ]

        } else {   
        var p = pApp; pApp = aTable; aTable = p                                         // aTable is the pApp object // .(10211.04.2 RAM Need to switch em)                                    
        var pTableRoutes = pTableRoutes_
            }

            delete pTableRoutes[ '_default' ]                                           // .(10208.08.8 ;-)
            setRoutes(     pTableRoutes,  pApp  )                                       // see global function below
            }
//          ----------------------------------------------------------------------

   , setRoles( pRoutes, aRole, aChg, aActions ) {
      var { chgRouteRoles }  =  require( '../Routes/_route.fns.njs' ).fns

          Object.entries( pRoutes ).forEach( ( [ aRoute, mControllerRoles ] ) => {
        var aOldRoles        =  mControllerRoles[0]
            mControllerRoles =  chgRouteRoles( mControllerRoles, aRole, aChg, aActions )  // [ aRoles, aController, aNotOK ]

        if (typeof( DoShowEm ) == 'undefined') { DoShowEm = '' }
        if (mControllerRoles[0] && String(DoShowEm).match( /^(showem|true)$/i )) {
//          console.log( `   For Route: ${ take( 45, aRoute.replace( /[ ]+/, " " ) ) } ${aChg} Roles to '${mControllerRoles[0]}' from '${aOldRoles}.` )
            console.log( `   For Route: ${ fmtRoute( aRoute.replace( /[ ]+/, " " ) ) } ${aChg} Roles to '${mControllerRoles[0]}' from '${aOldRoles}.` )
            }
            } )
     return pRoutes
            }
//          ----------------------------------------------------------------------

   , chgRouteRoles : chgRouteRoles

//          ----------------------------------------------------------------------

   , shoTableRoutes( pRoutes, aTable ) {
         if (nObjs(  pRoutes) > 1 && aTable) {
      if (! pRoutes[ aTable ]  ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
            pRoutes = pRoutes[ aTable ]
            }
        var pTableRoutes = { } // { `${aTable}` : pRoutes }
            pTableRoutes[ aTable ] = pRoutes
            pTableRoutes = aTable ? pTableRoutes : pRoutes
            console.log( "\npTableRoutes =", inspect( pTableRoutes ) )
            }
//          ----------------------------------------------------------------------

   , inspect: inspect
   , take   : take

     } } // eoo Routes.fns
//  ------------------------------------------------------------------------------------------

     module.exports  =  Routes

//  ------------------------------------------------------------------------------------------

            aShowEm      =  ''
            TheApp       =  null

//  ------------------------------------------------------------------------------------------

   function delTableRoutes( pDefaultRoutes, pTableRoutes ) {
        var aActions = Object.keys(  pTableRoutes   ).map(  aRoute => {
                   if (aRoute.match( /remove / )) { delete  pTableRoutes[ aRoute ]
                return aAction = aRoute.replace( /(remove |default )/g, '' ).replace( / /g, '')
                       } } ).join( ',' )
        if (aActions.replace( /,/g, '' )) { aActions  = `,${aActions},`
                       Object.keys(  pDefaultRoutes ).map(  aRoute => {
                       aAction = pDefaultRoutes[ aRoute ][1].replace( /.+\./, '' ).replace( / /g, '')
                   if (0  <= aActions.indexOf( `,${aAction},` ) ) { delete pDefaultRoutes[ aRoute ] }
               }       ) } }
//          ----------------------------------------------------------------------

   function  setRoutes(   pTableRoutes,  pApp ) {
        if (typeof(pApp) == 'string') { aShowEm = pApp }
        if (typeof(pApp) != 'string') { TheApp  = pApp }
        if (typeof(DoShowEm) == 'undefined') { DoShowEm = '' }
        if (String(DoShowEm).match( /^(showem|true|showset)$/i )) { aShowEm = DoShowEm }

            Object.keys( pTableRoutes ).forEach( aTable =>
            Object.keys( pTableRoutes[ aTable ] ).forEach( aRoute =>
               setRoute( aRoute, pTableRoutes[ aTable ][ aRoute ] ) ) )
            }
//          ----------------------------------------------------------------------

  function  setRoute( aRoute, aRoles, aController ) {
        var mController  = (aController ? [ aRoles, aController ] : aRoles) || ['']
            aRoles       =  mController[0] ? mController[0] : '* * * *'
            aController  =  mController[1]
        var aNotOK       =  mController[2] == 'N/A' ? ' ** Dummy Function' : ''

        if (String(aShowEm).match( /^(showem|showset)$/i )) {
//          console.log( `   Set Route: ${aRoute}      to: ${ take( 39, aController ) } for roles: ${aRoles} ${aNotOK}` )
            }
        var mRoute       =  aRoute.split( / +/ )
        var aProtocol    =  mRoute[0].match(   /http[s:/.]+/ ); aProtocol = aProtocol ? aProtocol[0].replace( /[:/.]+/, '' ) : 'none'
        var aMethod      =  mRoute[0].replace( /http[s:/.]+/, '' )
        var aRoute_      =  mRoute[1]

            setRoute_( aProtocol, aMethod, aRoute_, aRoles, aController )
            }
//          ----------------------------------------------------------------------

   function setRoute_( aProtocol, aMethod, aRoute,  aRoles, aController ) {
//          console.log( `  setRoute[28]  ${aProtocol}://${aMethod}  ${aRoute}  ${aController}` )
        var aControllers    =  TheControllersFile.replace( /\.n?js/, '' )                           // .(10211.02.x)

        var mController     =  aController.replace( / /g, '' ).split( '.' )
        var aModelControllers= mController.slice( 0, -1 ).join( '.')                                // .(10211.02.x RAM: Was aControllerFile)
        var aActionName     =  mController.slice(    -1 )
            aModel          =  aModelControllers.replace( '.' + aControllers, '' )                  // .(10211.02.x RAM i.e. ${aModel}.{aControllersName}

//      var pControllers    =  require( `../Controllers/${aControllerName}${TheControllersExt}` ).Controllers  // .(10211.02.x)
        var pControllers    =  require( `../Controllers/${aModel}.${TheControllersFile}` ).Controllers  // .(10211.02.x)

        var xController     =  pControllers[ aActionName ]
            renFunction( aController.replace( / /g, ''), xController )                              // .(10212.03.1 RAM Gotta rename it again)

        if (TheApp) {

          switch ( aMethod ) {
            case 'get'      :  TheApp.get(    aRoute, xController ); break;
            case 'post'     :  TheApp.post(   aRoute, xController ); break;
            case 'put'      :  TheApp.put(    aRoute, xController ); break;
            case 'delete'   :  TheApp.delete( aRoute, xController ); break;
            case 'patch'    :  TheApp.patch(  aRoute, xController ); break;
              default       :  TheApp.get(    aRoute, xController )
              }  } // eif TheApp

        if (String(aShowEm).match( /^(showem|showset)$/i )) {
        var aMsg            =  TheApp ? " was set" : "  will be set"
        var aController     =  take( 39, `${aModel}.${aControllers}.${aActionName}` )               // .(10211.02.x RAM: Was aControllerFile)
//          console.log( `   The Route:      ${ take( 7, aMethod ) } ${ take( 22, aRoute ) } to ../Controllers/${aControllerFile} ${aMsg}.` )
//          console.log( `   The Route:      ${ take( 7, aMethod ) } ${ take( 34, aRoute ) } to: ${aControllerFile} for roles: ${aRoles} ${aMsg}.` )
            console.log( ` A Route: ${ take( 7, aMethod ) } ${ take( 30, aRoute ) } ${aMsg} to: ${aController} for roles: ${aRoles}.` )  // .(10211/02.x RAM was aControllerFile)
            }
//          ---------------------------------------------------------------
            } // eof setRoute
//          ----------------------------------------------------------------------

   function renFunction(  aFName,  xFNC ) {
          Object.defineProperty( xFNC, 'name', { value: aFName, writable: false } )
            }
//          ----------------------------------------------------------------------

   function fmtRoute( aRoute ) {
        var [ aMethod, aURI ] =  aRoute.replace( /[ ,]+/g, '|' ).split( '|' )
     return take( TheRouteWdt, take( 13, aMethod ) + aURI )
            }
//          ----------------------------------------------------------------------

   function chgRouteRoles( mControllerRoles, aRole, aChg, aActions ) {                  // called by routes.njs or ${aTable}.${TheControllersFile}
       var  aRoles    =  mControllerRoles[0], aAction = mControllerRoles[1]
        if (aAction) {
            aAction   =       aAction. replace( /^.+\./, '' ).replace( / /g,     ''  )
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
                   + (aRoles.match( /O/i ) ? 'O ' : '- ')
                   + (aRoles.match( /U/i ) ? 'U ' : '- ')
                   + (aRoles.match( /E/i ) ? 'E'  : '-' )
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

   function inspect(    a ) { return require( 'util' ).inspect( a, { depth: 99 } ) }
   function take   ( n, a ) { return `${a}                                                                       `.substr(0,n) }
   function nObjs  ( pObj ) { var m = inspect( pObj ).match( /{\n/g ); return m ? m.length: 0 }
//  ------------------------------------------------------------------------------------------

