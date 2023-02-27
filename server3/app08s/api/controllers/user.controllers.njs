// --------------------------------------------------------------------------------------------------------

      if (__filename == process.mainModule.filename) {                                            // .(10317.04.8 RAM Globals are set in Route.njs)
            FORMRs_3        =    `${ process.env.FORMR_HOME }/_3/FR.FNSs/`                           // .(10317.01.1 RAM FormR's Home)
            jstUtils  = require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts2.3.njs` )          // .(10228.11.1 RAM Add global utility fns).(10314.02.1 RAM If global you can use anywhere while debugging)
//          APP_HOME           =     jstUtils.setEnv( __dirname )                                 //#.(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
            FORMRs_4           = `${ APP_HOME.replace( /[\\/]app[0-9]+[sc]/i, '' ) }/_4/FR.fns02s/`    // .(10317.01.1 RAM Server's Home if dynamically assigned)
                                     jstUtils.setEnv(           )                                 // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
                                     trace( 'setProjectName', 'FormR'  )
            }
//      --------------------------------------------------------------------------------------------------

        var pFns            =   require( '../routes/_route.fns.njs' ).fns

//      --------------------------------------------------------------------------------------------------

//      var aTable          =  'io/users'                                               // .(10318.01.1 RAM Maybe Want this)
        var aTable          =  'users'
        var aModel          =  'user'                                                   // .(10301.08.1 RAM If this is wrong everything breaks)
//      var aDB             =  'io'                                                     // .(10318.01.1 RAM Maybe Want this)
        var aFName          =  `${aModel}.controllers`
        var aPrimaryCol     =  'username'                                               // .(10314.08.2 RAM Needs to be defined)

        var pConfig         = { ControllersFilename: __filename }                       // .(10301.03.1 RAM Let's try saving the file name)
            pConfig.Cmd     =  'replace default controllers'                            // .(10301.03.2 RAM Replace the default Controller Routes)

        var pModel          =  require( '../models/index.js' )[ aModel ]                // .(10109.03.1 RAM Make Generic).(10314.08.3)








        var Op              =  require( 'sequelize' ).Op;                               // .(10103.03.3).(10314.08.4)

//      --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                  Method      Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/${aTable}/model/           ' : [ '      I', 'getModel            ' ]
               , 'http.get     /api/${aTable}/                 ' : [ '      I', 'findAll             ' ]    // .(10314.08.1 RAM Add Controllera for React-Admin)
               , 'http.get     /api/${aTable}/:id              ' : [ '      I', 'findOne             ' ]    // .(10314.08.3)
               , 'http.post    /api/${aTable}/                 ' : [ '      I', 'createOne           ' ]    // .(10314.08.3)
               , 'http.put     /api/${aTable}/:id              ' : [ '      I', 'updateOne           ' ]    // .(10314.08.5)
               , 'http.delete  /api/${aTable}/:id              ' : [ '      I', 'deleteOne           ' ]    // .(10314.08.7)
               , 'http.get     /api/${aTable}/all              ' : [ '      I', 'allAccess           ' ]
               , 'http.get     /api/${aTable}/user             ' : [ '    U  ', 'userBoard           ' ]
               , 'http.get     /api/${aTable}/editor           ' : [ '  E    ', 'adminBoard          ' ]
               , 'http.get     /api/${aTable}/admin            ' : [ 'A      ', 'editorBoard         ' ]
               , 'http.get     /api/${aTable}/session          ' : [ '      I', 'session             ' ]    // .(10311.07.1 RAM Where did it go again???)
                  }

//          pRoutes         =  pFns.setRouteRoles( pRoutes, 'Admin', 'chg', 'all' )     // .(10309.01.2)

//      --------------------------------------------------------------------------------------------------





//      --------------------------------------------------------------------------------------------------

        var pControllers    = { controller1 : {}

//          ----------------------------------------------------------------------------------

         ,  allAccess       :  ( req, res ) => sendSession( req, res, "Public"  )       // .(10311.06.1 Beg RAM)
         ,  userBoard       :  ( req, res ) => sendSession( req, res, "User"    )
         ,  adminBoard      :  ( req, res ) => sendSession( req, res, "Admin"   )
         ,  editorBoard     :  ( req, res ) => sendSession( req, res, "Editor"  )       // .(10311.06.1 End)
         ,  session         :  ( req, res ) => sendSession( req, res, "session" )       // .(10311.07.1)

//          ----------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( `${aModel}.model` )
        var pModel          =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) // .(10311.06.1 RAM ).(10316.04.1 RAM Use APP_HOME instead of APP_DIR)
                               res.json( JSON.parse( pModel ) )
                } // eof `${aFName}.getModel`
//          ------------------------------------------------------------------



          , createOne       :  function createOne( req, res ) { trace( ` ${req.body.username}` )                // .(10315.12.1 Beg RAM Added)

//     if (!req.body[ aPrimaryCol ]) {                                                                          //  Validate request
//                             res.status(400).send( { message: "Primary column, ${aPrimaryCol}, can not be empty!" } );
//          return;
//          }

      const pData           =                                                                                   //  Create a user
             {  id          :  req.body.id
             ,  username    :  req.body.username
             ,  email       :  req.body.email
             ,  password    :  req.body.password
             ,  role        :  req.body.role         ? req.body.role         : "User"
             ,  active      :  req.body.active       ? req.body.active       : "Yes"
             ,  passworddate:  req.body.passworddate ? req.body.passworddate :  fmtDate( 6, 90 )                // .(10315.14.1)
                };

            pModel.create( pData )                                                                              // .(10109.03.5 RAM Was UserData)
     .then( pData => {
                               res.send( pData ); })
    .catch( pErr  => {
                               res.status(500).send( { message: pErr.message || "Some error occurred while creating the user." } ); } )
             } // eof createOne
//          ------------------------------------------------------------------

//    Retrieve all users from the database.
//    -----------------------------------------------------------------------------------------

          , findAll         :  function findAll( req, res ) {                                                   // .(10314.08.2 RAM Add Controller for React-Admin)

      const pCondition  = { }
      const aPrimaryVal =  req.query[   aPrimaryCol ];                                                          // .(10109.03.4)
        if (aPrimaryVal) { pCondition[  aPrimaryCol ]  = { [Op.like]: `%${aPrimaryVal}%` } }


      const aTable     =   req.originalUrl.replace( /\?.+$/, '').replace( /\/api\//, '')                        // .(10107.01.1 Beg RAM Ass Sort, range and filter)

//      var aFilter    =   req.query.filter

        var mRange     = ( req.query.range || '').replace( /[\[\]]/g,  '' ).split( ',' )
        var mSort      = ( req.query.sort  || '').replace( /[\[\]"]/g, '' ).split( ',' )                        // .(10110.04.1 RAM e.g. '["username","ASC"]')
        var pOrder     = ( req.query.sort ) ? [ mSort ] : [ ]                                                   // .(10119.01.1)

        var pOptions   = { where: pCondition, order: pOrder }                                                   // .(10119.01.2 RAM Was: [ mSort ])
        var nOffset    = ( mRange[0] ||  0 ) * 1                                                                // .(10111.01.1 RAM Support Pagination)
        var nLimit     = ( mRange[1] || 99 ) * 1; nLimit = (nLimit - nOffset) + 1                               // .(10111.01.2)

            pModel.findAndCountAll( { offset: nOffset, limit: nLimit, ...pOptions } )                           // .(10111.01.2)

     .then( pData => {
                       var nBeg  =  mRange[0] || 0, nEnd = mRange[1] || pData.rows.length, nCnt = pData.count   // .(10103.01.3 RAM Get range counts)
                           res.setHeader('Access-Control-Expose-Headers', 'Content-Range'   );                  // .(10103.05.1 RAM Allow use of 'Content-Range' Header)
                           res.setHeader('Accept-Ranges', `${aTable}`                         );                // .(10103.01.4 RAM Both are require for browser, ie. Chrome)
                           res.setHeader('Content-Range', `${aTable} ${nBeg}-${nEnd}/${nCnt}` );                // .(10103.01.5 RAM Send Header)
                           res.send( pData.rows )                                                               // .(10111.01.3 RAM added data.rows)
                           } )
     .catch( pErr => {
                           res.status(500).send( { message: pErr.message || "Some error occurred while retrieving users." } ); } );
             } // eof findAll
//          ------------------------------------------------------------------

//    Find a single user with an id
//    -----------------------------------------------------------------------------------------

          , findOne    :   function findOne( req, res ) {                                                       // .(10314.08.4 RAM Add FindOne Controller for React-Admin)

        var id         =   req.params.id;

            pModel.findByPk( id )
     .then( pData => {
                           res.send( pData ); } )
    .catch( pErr  => {
                           res.status(500).send( { message: `Error retrieving id: ${id}` } ); } );
            } // eof findAll
//          ------------------------------------------------------------------

//    Put (aka UpdateOne) Controller
//    -----------------------------------------------------------------------------------------

          , updateOne  :   function updateOne( req, res ) {                                                     // .(10314.08.6 RAM Add UpdateOne Controller for React-Admin)

        var id         =   req.params.id;
        if (req.body.id) { delete req.body.id }                                                                 // .(10315.013.1 RAM id can't be part of body)

            pModel.update( req.body, { where: { id: id } } )
     .then( ( )   => { return pModel.findByPk( id )      } )
     .then( pData => {
                           res.send( pData );            } )
    .catch( pErr  => {
                           res.status(500).send( { message: `Error updating id: ${id}.\n ${pErr}` } ); } );
            } // eof updateOne
//          ------------------------------------------------------------------

//    Delete Controller
//    -----------------------------------------------------------------------------------------

          , deleteOne  :   function deleteOne( req, res ) {                                                     // .(10314.08.8 RAM Add DeleteOne Controller for React-Admin)

        var id         =   req.params.id;

            pModel.destroy( { where: { id: id } } )                                                             // .(01106.06.2)
     .then( nNum  => { if (nNum == 1) {
                           res.send( { message: `User ${id} was deleted successfully!` } );
                       } else {
                           res.send( { message: `Cannot delete id = ${id}. Maybe user was not found!` } ); } } )
    .catch( pErr  => {
                           res.status(500).send( { message: `Could not delete id: ${id}` } ); } );
            } // eof deleteOne
//          ------------------------------------------------------------------

//    Action Controller
//    -----------------------------------------------------------------------------------------

          , action     :  function action( req, res ) {                                                         // .(10314.08.9 RAM Add Action Controller for React-Admin)
        var id         =   req.params.id;
            pModel.findByPk( id )
     .then( pData => {
                          res.send( pData ); } )
    .catch( pErr  => {
                          res.status(500).send( { message: `Error retrieving id: ${id}` } ); } );
            } // eof action
//          ------------------------------------------------------------------

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     :   pConfig                                   // .(10301.03.3)
                }
                trace(  "\nmodule.exports" )

// --------------------------------------------------------------------------------------------------------

   function sendSession( req, res, aRole ) {                              // .(10311.06.2 Beg)
            trace( ` Session is validated for BezKoder role: ${aRole}.` )
       var  aMsg  = `User is logged in with ${aRole} privlideges.`
            res.status(200).send( aMsg )
            }                                                             // .(10311.06.2 End)
// -------------------------------------------------------------

   function controller(  req,  res,  aAction ) {

            pSession    =   req.session;
        var bUser       =  (pSession.user && pSession.user.role) == 'user'
        if (bUser) {
        var nCnt        =   pSession.user.cnt++
                            res.send(  `<h3>Hello ${pSession.user.role}: ${pSession.user.name}</h3>`
                                    +  `user.${aAction}<br>`
                                    +  `<a href="/next">Next page (${nCnt})</a> | ` + '<a href="/logout">Logout</a>' ); }
          else {            res.send(  '<h3>Please login as a user.</h3>'           + '<a href="/">Login</a>'        ); }
               } // eof controller
//    ---   ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

          nDoTests      =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

      var { getControllers }  =  require( '../Controllers/_controller.fns.njs'  ).fns
      var { setTableRoutes }  =  require( '../Routes/_route.fns.njs'            ).fns

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable, 'ShowEm' )
            }
//    ---   ------------------------------------------------------------------

      if (doTest( 2, __filename )) {   // Show initial routes and then change roles for it

      var { shoTableRoutes }  =  require( '../Routes/_route.fns.njs'  ).fns
      var { setRouteRoles  }  =  require( '../Routes/_route.fns.njs'  ).fns            // .(10309.01.3 RAM Wasn't here)

            shoTableRoutes( pRoutes, aTable ); DoShowEm = true

//                      Routes   Role     Cmd    Controller / Route Actions
//                      ------  -------  -----  -------------------------------
//          setRouteRoles(  pRoutes, 'Admin', 'chg', 'all'                          )  // chg  Gives   access to only one role  for all  actions
            setRouteRoles(  pRoutes, 'Owner', 'add', 'update*,  find*, delete*'     )  // add  Adds    access     for one role  for many actions
            setRouteRoles(  pRoutes, 'User' , 'add', 'updateOne,       deleteOne'   )  // del  Removes access     for one role  for two  actions
            setRouteRoles(  pRoutes, 'User' , 'del', '                 delete*'     )  // del  Removes access     for one role  for one  action
            setRouteRoles(  pRoutes, 'Admin', 'chg', 'createOne,       deleteAll'   )  // chg  Gives   access to only one role  for two  actions, removes all other roles

            shoTableRoutes( pRoutes, aTable )
            }
// --------------------------------------------------------------------------------------------------------
