//   ------------------------------------------------------------------------------------------

            TheRouteWdt         =  45
            TheControllerWdt    =  40
            TheControllersFile  = 'controllers'
            TheControllersExt   = '.njs'
            pTableRoutes        = { }
/*
     module.exports        = { fns:    
         {  fixTableRoutes :  fixTableRoutes
         ,  getTableRoutes :  getTableRoutes
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

   { fixTableRoutes: function( aTable, aModel, pRoutes ) {                              // called by _controller.fns.getControllerRoutes
//          console.log( `fixTableRoutes     [1]  aTable: '${aTable}', aModel: '${aModel}',           pRoutes.length: ${ Object.keys(pRoutes).length }`, inspect( pRoutes) ); // return
        Object.keys(  pRoutes ).forEach( aRoute => {
        if (aRoute.match( /api\/[^${]/ )) {                                             // if not /api/${aTable}/action or /route/action, then
            console.log( "** Skipping route that may be a duplicate.")
            return }                                                                    // prevent controller name from duplicating ?? // or pRoutes[ aRoute ][1].match( /\$\{aTable\}/ )
        var aRoles      =                          pRoutes[ aRoute ][ 0 ]
        var aController = `${aModel}.${TheControllersFile}.${ pRoutes[ aRoute ][ 1 ] }` // change  controller name in pTableRoutes (not function name)
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

   , getTableRoutes: function( pTableRoutes, aTable, aCmd ) {                           // called by _controller.fns.getControllerRoutes

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
            } // eof getTableRoutes
//          ----------------------------------------------------------------------

   , setTableRoutes( pTableRoutes_, aTable, pApp ) {                                     // called by routes.njs or ${aTable}.controllers.njs
        if (typeof(aTable) == 'string') {
      if (! pTableRoutes_[ aTable ] ) { console.log( `** The table, '${aTable}', does not exist in pTableRoutes` ); return }
        var pTableRoutes = { }
            pTableRoutes[  aTable  ] =  pTableRoutes_[ aTable ]
        } else {
        var pTableRoutes = pTableRoutes_  
            pApp         = aTable
            }
            delete pTableRoutes[ '_default' ]                                           // .(10208.08.8 ;-) 
            setRoutes(     pTableRoutes,  pApp  )                                       // see below
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
//          console.log( `   The Route:      ${ take( 7, aMethod ) } ${ take( 37, aRoute ) } to: ${aControllerFile} for roles: ${aRoles} ${aMsg}.` )
            }
            } )
     return pRoutes
            }  
//          ----------------------------------------------------------------------

   , chgRouteRoles : chgRouteRoles 

//          ----------------------------------------------------------------------

   , shoTableRoutes( pRoutes, aTable ) {
        if (nObjs( pRoutes) > 1 && aTable) {
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

            aShowEm      =  ''
            TheApp       =  null
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
        
        var mController     =  aController.replace( / /g, '' ).split( '.' )

        var aControllerFile =  mController.slice( 0, -1 ).join( '.')
        var aActionName     =  mController.slice(    -1 ) 

//      var pControllers    =  require( `../Controllers/${aControllerFile}${TheControllersExt}` ).Controllers   //#.(10211.02.x)
        var pControllers    =  require( `../Controllers/${aControllerFile}` ).Controllers                       // .(10211.02.x)
        var xController     =  pControllers[ aActionName ]

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
        var aMsg            =  TheApp ? "    was set" : "will be set"                                                                                // .(10211.03.1)         
        var aControllerFile =  take( 39, aControllerFile + '.' + aActionName )
//          console.log( `   The Route:      ${ take( 7, aMethod ) } ${ take( 22, aRoute ) } to ../Controllers/${aControllerFile} ${aMsg}.` )
//          console.log( `   The Route:      ${ take( 7, aMethod ) } ${ take( 34, aRoute ) } to: ${aControllerFile} for roles: ${aRoles} ${aMsg}.` ) //#.(10211.03.2)         
            console.log( ` A Route: ${ take( 7, aMethod ) } ${ take( 30, aRoute ) } ${aMsg} to: ${aControllerFile} for roles: ${aRoles}.` )          // .(10211.03.2)         
            }              
//          ---------------------------------------------------------------
            } // eof setRoute
//          ----------------------------------------------------------------------

   function fmtRoute( aRoute ) {
        var [ aMethod, aURI ] =  aRoute.replace( /[ ,]+/g, '|' ).split( '|' )
     return take( TheRouteWdt, take( 13, aMethod ) + aURI )
            }
//          ----------------------------------------------------------------------

   function chgRouteRoles( mControllerRoles, aRole, aChg, aActions ) {                  // called by routes.njs or ${aTable}.controllers.njs
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

