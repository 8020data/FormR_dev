// --------------------------------------------------------------------------------------------------------

       var  FormR               =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs`   ) 
            FormR.init( __dirname, __filename ); // FORMR.help()  

//      --------------------------------------------------------------------------------------------------

//      var pFns            =   require( `${APP_HOME}/api/routes/_route.fns.njs` ).fns  // .(10318.02.4 RAM Not so simple from here).(10328.06.9)
        var pFns            =   require( `${FORMRs_4}/route.fns.njs` ).fns              // .(10328.06.9 RAM Moved again) 

        var aTable          =  'formr/users'                                            // .(10318.01.1 RAM Maybe Want this)
//      var aTable          =  'users'
        var aModel          =  'fruser'                                                 // .(10301.08.1 RAM If this is wrong everything breaks)
//      var aDB             =  'fr'                                                     // .(10318.01.1 RAM Maybe Want this) 
        var aFName          =  `${aModel}.controllers`
        var aPrimaryCol     =  'username'                                               // .(10314.08.2 RAM Needs to be defined)

        var pConfig         = { ControllersFilename: __filename }                       // .(10301.03.1 RAM Let's try saving the file name)
            pConfig.Cmd     =  'replace default controllers'                            // .(10301.03.2 RAM Replace the default Controller Routes)

//      var pModel          =  require( `${APP_HOME}/api/models/index.js` )[ aModel ]   //#.(10109.03.1 RAM Make Generic).(10314.08.3).(10318.02.5).(10414.02.7)
//      var pModel          =  require( `${FORMRs_4_API}/models/index.js` )[ aModel ]   //#.(10414.02.7)
        var pModel          =  require(              `../models/index.js` )[ aModel ]   // .(10414.02.7)

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
                  }

//          pRoutes         =  pFns.setRouteRoles( pRoutes, 'Admin', 'chg', 'all' )      // .(10309.01.2)

//      --------------------------------------------------------------------------------------------------

        var pControllers    = { controller1 : {}

//          ----------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( `${aTable}.model` )
//          var aModel      =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/user.model.json`,      'ASCII' ) //#.(10316.02.1 RAM )
//          var aModel      =  require( 'fs' ).readFileSync( `${FORMRs_4}/FMR_UserModel1-0.json`,           'ASCII' ) //#.(10316.02.1 RAM ).(10318.02.6).(10328.06.11)
//          var aModel      =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/user.model.json`,      'ASCII' ) // .(10316.02.1 RAM ).(10328.06.11).(10414.04.1)
            var aModel_JSON =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) // .(10414.04.1 RAM Use fruser to be conistent. Or it could be ${aModel} as it was)

                               res.json( JSON.parse( aModel_JSON ) )                                                  // .(10414.04.2 RAM Gotcha: var aModel = `{aModel} is undefined)

                } // eof `${aFName}.getModel`
//          ------------------------------------------------------------------

          , createOne       :  function createOne( req, res ) { trace( ` ${req.body.username}` )                // .(10315.12.1 Beg RAM Added)

//     if (!req.body[ aPrimaryCol ]) {                                                                          //  Validate request
//                             res.status(400).send( { message: "Primary column, ${aPrimaryCol}, can not be empty!" } );
//          return;
//          }

       var  pBody           =                                                                                   //  Create a user
//           {  id          :  req.body.id
             {  username    :  req.body.username
             ,  email       :  req.body.email
             ,  password    :  req.body.password
             ,  role        :  req.body.role         ? req.body.role         : "User"
             ,  active      :  req.body.active       ? req.body.active       : "Yes"
             ,  passworddate:  req.body.passworddate ? req.body.passworddate :  fmtDate( 6, 90 )                // .(10315.14.1)
                };

            pModel.create( pBody )                                                                              // .(10109.03.5 RAM Was UserData)
     .then( pData => {         pData  =  pData.toJSON( )                                                        // .(10402.01.1 RAM Convert it so that it's easy to view)
                               res.send( pData ); })
    .catch( pErr  => {
                               res.status( 500 ).send( { message: pErr.message || "Some error occurred while creating the user." } ); } )
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
                           res.status( 500 ).send( { message: pErr.message || "Some error occurred while retrieving users." } ); } );
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
                           res.status( 500 ).send( { message: `Error retrieving id: ${id}` } ); } );
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
                           res.send( pData.toJSON() );            } )
    .catch( pErr  => {
                           res.status( 500 ).send( { message: `Error updating id: ${id}.\n ${pErr}` } ); } );
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
                           res.status( 500 ).send( { message: `Could not delete id: ${id}` } ); } );
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
                          res.status( 500 ).send( { message: `Error retrieving id: ${id}` } ); } );
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

          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

//    var { getControllers }  =  require( `${APP_HOME}/api/Controllers/_controller.fns.njs`  ).fns      // .(10318.02.7)
//    var { setTableRoutes }  =  require( `${APP_HOME}/api/Routes/_route.fns.njs`            ).fns      // .(10318.02.8)
      var { getControllers }  =  require( `${FORMRs_4}/controller.fns.njs`  ).fns                       // .(10318.02.7).(10328.06.12)
      var { setTableRoutes }  =  require( `${FORMRs_4}/route.fns.njs`       ).fns                       // .(10318.02.8).(10328.06.12)

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable, 'ShowEm' )                       // .(10318.04.2 RAM Was: aTable)
            } 
//    ---   ------------------------------------------------------------------

      if (doTest( 2, __filename )) {   // Show initial routes and then change roles for it

//    var { shoTableRoutes }  =  require( `${APP_HOME}/api/Routes/_route.fns.njs`  ).fns                // .(10318.02.9)
//    var { setRouteRoles  }  =  require( `${APP_HOME}/api/Routes/_route.fns.njs`  ).fns                // .(10309.01.3 RAM Wasn't here)    // .(10318.02.108)
      var { shoTableRoutes }  =  require( `${FORMRs_4}/route.fns.njs`       ).fns                       // .(10318.02.8).(10328.06.12)
      var { setRouteRoles  }  =  require( `${FORMRs_4}/route.fns.njs`       ).fns                       // .(10318.02.8).(10328.06.12)

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
