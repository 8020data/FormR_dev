// --------------------------------------------------------------------------------------------------------

        var aTable  =  'users'
        var aModel  =  'users'
        var aFName  =  `${aModel}.controller`
//      var aTests  =   2

//      --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                     Method   Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/${aTable}/findAll/         ' : [ '      E', 'findAll             ' ]    // Retrieve all role records
               , 'http.get     /api/${aTable}/findOne/:id      ' : [ '      E', 'findOne             ' ]    // Retrieve one role record
               , 'http.get     /api/${aTable}/findMany/:ids    ' : [ '      E', 'findMany            ' ]    // Retrieve many role records with ids
               , 'http.put     /api/${aTable}/updateMany/:ids  ' : [ '      E', 'updateMany          ' ]    // Retrieve many role records with ids

               , 'http.get     /api/test/admin                 ' : [ 'A      ', 'adminBoard          ' ]
               , 'http.get     /api/test/mod                   ' : [ '  E    ', 'editorBoard         ' ]    // .(10228.03.x RAM Was moderatorBoard)
               , 'http.get     /api/test/user                  ' : [ '    U  ', 'userBoard           ' ]    
               , 'http.get     /api/test/all                   ' : [ '      I', 'allAccess           ' ]    

//             , 'http.get     /api/auth/admin                 ' : [ 'A      ', 'sendAdminPage       ' ]    // .(10228.05.x Beg RAM Was ${aRole}Board)        
//             , 'http.get     /api/auth/editor                ' : [ '  O    ', 'sendEditorPage      ' ]    
//             , 'http.get     /api/auth/user                  ' : [ '    U  ', 'sendUserPage        ' ]    
//             , 'http.get     /api/auth                       ' : [ '      E', 'sendPublicPage      ' ]    

               , '             remove default getAll           ' : [ ]
               , '                     remove getOne           ' : [ ]
               , '                     remove getMany          ' : [ ]
               , '                     remove deleteMany       ' : [ ]
                  }

            pRoutes = setRoles( pRoutes, 'Admin', 'chg', 'all' )

//      --------------------------------------------------------------------------------------------------

        var pControllers    =
          { controller1     : {}
//          --------------------------------------------------------------------------------------

//        , allAccess       : function allAccess( req, res ) { res.status(200).send( "Public Content."    ); }
//        , userBoard       : function allAccess( req, res ) { res.status(200).send( "User Content."      ); }
//        , adminBoard      : function allAccess( req, res ) { res.status(200).send( "Admin Content."     ); }
//        , moderatorBoard  : function allAccess( req, res ) { res.status(200).send( "Moderator Content." ); }

//        , sendPubicPage   : allAccess( req, res ) { res.status(200).send( "Public Content." ); }
//        , sendUserPage    : allAccess( req, res ) { res.status(200).send( "User Content."   ); }
//        , sendUdminPage   : allAccess( req, res ) { res.status(200).send( "Admin Content."  ); }
//        , sendEditorPage  : allAccess( req, res ) { res.status(200).send( "Editor Content." ); }

          , allAccess(        req, res ) { trace( ); 
                                                    res.status( 200 ).send( "Public Content."    ); }
          , userBoard(        req, res ) { trace(); 
                                                    res.status( 200 ).send( "User Content."      ); }
          , adminBoard(       req, res ) { trace(); 
                                                    res.status( 200 ).send( "Admin Content."     ); }
          , editorBoard(      req, res ) { trace();                                                    // .(10228.03.x RAM Was moderatorBoard)
                                                    res.status( 200 ).send( "Editor Content."    ); }  // .(10228.03.x RAM Was Moderator Content)

          , findAll         : function findAll( req, res ) {

                controller( req, res, 'findAll('     + req.params.id + ')' )

                }    // eof `${aFName}.findAll`
//              ------------------------------------------------------------------------------

          , findOne         : function findOne( req, res ) {

                controller( req, res, 'findOne('     + req.params.id + ')' )

                }    // eof `${aFName}.findOne2`
//              ------------------------------------------------------------------------------

          , findMany        : function findMany( req, res ) {

                controller( req, res, 'getMany('     + req.params.id + ')' )

                }    // eof `${aFName}.findMany`
//              ------------------------------------------------------------------------------

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

                        trace(  "module.exports" )

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
//           ,  Options     : { Cmd: 'replace' }
                }
// --------------------------------------------------------------------------------------------------------

   function controller(  req,  res,  aAction ) {

            pSession    =   req.session;
        var bUser       =  (pSession.user && pSession.user.role) == 'user'

        if (bUser) {
        var nCnt        =   pSession.user.cnt++
                            res.send(  `<h3>Hello ${pSession.user.role}: ${pSession.user.name}</h3>`
                                    +  `user.${aAction}<br>`
                                    +  `<a href="/next">Next page (${nCnt})</a> | `
                                    +  '<a href="/logout">Logout</a>'        ); }
          else {            res.send(  '<h3>Please login as a user.</h3>'
                                    +  '<a href="/">Login</a>'               ); }
               } // eof controller
//          ------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

      if (doTest( 1 )) {

      var { getControllers }  =  require( '../Controllers/_controller.fns.njs'  ).fns
      var { setTableRoutes }  =  require( '../Routes/_route.fns.njs'            ).fns

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable,   'ShowEm' )
            }
//          ------------------------------------------------------

      if (doTest( 2 )) {

      var { shoTableRoutes }  =  require( '../Routes/_route.fns.njs'  ).fns

            shoTableRoutes( pRoutes, aTable ); DoShowEm = true

//                      Routes   Role     Cmd    Controller / Route Actions
//                      ------  -------  -----  -------------------------------
//          setRoles(  pRoutes, 'Admin', 'chg', 'all'                          )  // chg  Gives   access to only one role  for all  actions
            setRoles(  pRoutes, 'Owner', 'add', 'update*,  find*, delete*'     )  // add  Adds    access     for one role  for many actions
            setRoles(  pRoutes, 'User' , 'add', 'updateOne,       deleteOne'   )  // del  Removes access     for one role  for two  actions
            setRoles(  pRoutes, 'User' , 'del', '                 delete*'     )  // del  Removes access     for one role  for one  action
            setRoles(  pRoutes, 'Admin', 'chg', 'createOne,       deleteAll'   )  // chg  Gives   access to only one role  for two  actions, removes all other roles

            shoTableRoutes( pRoutes, aTable )
            }
// --------------------------------------------------------------------------------------------------------

   function setRouteRoles(  aTable, aRole, aChg, aActions ) { trace( )
            setRoles( pTableRoutes[ aTable ], aRole, aChg, aActions )
            }
//          ------------------------------------------------------

   function setRoles( pRoutes, aRole, aChg, aActions ) { trace( )
        if (typeof( DoShowEm ) == 'undefined') { DoShowEm = '' }
      var { chgRouteRoles } = require( '../Routes/_route.fns.njs' ).fns
        Object.entries( pRoutes ).forEach( ( [ aRoute, mController ] ) => { var aOldRoles = mController[0]
            mController = chgRouteRoles( mController, aRole, aChg, aActions )  // [ aRoles, aController, aNotOK ]
        if (mController[0] && String(DoShowEm).match( /^(showem|true)$/i )) {
            console.log( `For Route: ${ aRoute.replace( /[ ]+/, " " ) }', ${aChg} Roles to '${mController[0]}' from '${aOldRoles}.` ) }
            } )
     return pRoutes
            }
//          ------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
