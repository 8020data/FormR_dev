
// --------------------------------------------------------------------------------------------------------

//      var aTable          =  '_default'
//      var aModel          =  '_default'
        var aDefault        =  `_default.controller`  // aka FName
        var pDB             =   require( '../models/index.js' )
        var pModel          =   require( '../models/user.model.js' )( pDB, 'user' )
        var pOps            =   pDB.Sequelize.Op;
        var aPrimaryCol     =   pModel.Primary                                                              // .(10326.06.1 RAM Need this)

//      --------------------------------------------------------------------------------------------------

        var pRoutes         =
//                     Method   Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.post    /api/${aTable}/createOne/       ' : [ 'A O - -', 'createOne           ' ]    // Create a new table record
               , 'http.get     /api/${aTable}/findAll/         ' : [ 'A O U E', 'findAll             ' ]    // Retrieve all table records
               , 'http.get     /api/${aTable}/findOne/:id      ' : [ 'A O U -', 'findOne             ' ]    // Retrieve one table record with id
               , 'http.get     /api/${aTable}/findMany/:ids    ' : [ 'A O U -', 'findMany            ' ]    // Retrieve many table records with ids
               , 'http.put     /api/${aTable}/updateOne/:id    ' : [ 'A O U -', 'updateOne           ' ]    // Update a table record with id
               , 'http.put     /api/${aTable}/updateMany/:ids  ' : [ 'A O - -', 'updateMany          ' ]    // Update many table records with ids
               , 'http.delete  /api/${aTable}/deleteOne/:id    ' : [ 'A O U -', 'deleteOne           ' ]    // Delete all table records
               , 'http.delete  /api/${aTable}/deleteMany/:ids  ' : [ 'A O - -', 'deleteMany          ' ]    // Delete all table records with id = ids
               , 'http.delete  /api/${aTable}/deleteAll/       ' : [ 'A - - -', 'deleteAll           ' ]    // Retrieve all published table records
                  }
//      --------------------------------------------------------------------------------------------------

        var pControllers    =

//          ----------------------------------------------------------------------------------

          { createOne       :  function createOne(     req, res ) { trace()

                controller(  req, res, 'createOne' )

                }  // eof `${aDefault}.createOne`
//              ------------------------------------------------------------------------------

          , findAll         :  function findAll(        req, res ) { trace()

                   pModel.findAll( )
                         .then( data => {
                                          res.send( data ); } )
                         .catch( err => {
                                          res.status(500).send( { message: "Error retrieving id = " + id } ); } );

                }  // eof `${aDefault}.getAll`
//              ------------------------------------------------------------------------------

          , findOne         :  function findOne(        req, res ) { trace()

//                 const id  =  req.params.id;                                                              // .(10326.06.1 RAM Need this)
                   const id  =  req.params[ aPrimaryCol ];                                                  // .(10326.06.1 RAM Need this)

                   pModel.findByPk( id )
                         .then( data => {
                                          res.send( data ); } )
                         .catch( err => {
                                          res.status(500).send( { message: `Error retrieving id = '${id}'` } ); } );

                }  // eof `${aDefault}.findOne`
//              ------------------------------------------------------------------------------



          , findMany        :  function findMany(       req, res ) { trace()

                controller(  req, res, 'findMany('    + req.params.ids + ')' )

                }  // eof `${aDefault}.findMany`
//              ------------------------------------------------------------------------------

          , updateOne       :  function updateOne(       req, res ) { trace()

                controller(  req, res, 'updateOne('  + req.params.id  + ')' )

                }  // eof `${aDefault}.updateOne`
//              ------------------------------------------------------------------------------

          , updateMany      :  function updateMany(    req, res ) { trace()

                controller(  req, res, 'updateMany(' + req.params.ids + ')' )

                }  // eof `${aDefault}.updateMany`
//              ------------------------------------------------------------------------------

          , deleteMany      : function deleteMany(    req, res ) { trace()

                controller( req, res, 'deleteMany(' + req.params.ids + ')' )

                }  // eof `${aDefault}.deleteMany`
//              ------------------------------------------------------------------------------

          , deleteOne       : function deleteOne(     req, res ) { trace()

                controller( req, res, 'deleteOne('  + req.params.id  + ')' )

                }  // eof `${aDefault}.deleteOne`
//              ------------------------------------------------------------------------------

          , deleteAll       : function deleteAll(     req, res ) { trace()

                controller( req, res, 'deleteAll' )

                }  // eof `${aDefault}.deleteAll`
//              ------------------------------------------------------------------------------

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

                pConfig     = { ControllersFilename: __filename }                   // .(10301.03.5 RAM Let's try saving the file name)
                pConfig.Cmd =   ''                                                  // .(10301.03.6)

            module.exports  =
             {  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     :   pConfig                                             // .(10301.03.3)
                }

                trace(  "\nmodule.exports" )

//      --------------------------------------------------------------------------------------------------






   function controller( req, res, aAction ) {                                       // .(10126.09.2)

            pSession    =   req.session;                                            // .(10124.08.3)
        var bUser       =  (pSession.user && pSession.user.role) == 'user'          // .(10124.08.4)

        if (bUser) {
        var nCnt        =   pSession.user.cnt++                                     // .(10124.05.3 RAM Increment counter, just for this user)
                            res.send(  `<h3>Hello ${pSession.user.role}: ${pSession.user.name}</h3>`
                                    +  `user.${aAction}<br>`
                                    +  `<a href="/next">Next page (${nCnt})</a> |`
                                    +  `<a href="/logout">Logout</a>`        ); }
          else {            res.send(  '<h3>Please login as a user.</h3>'
                                    +  '<a href="/">Login</a>'               ); }
            } // eof controller
//          ----------------------------------------------------------------------------------

//      --------------------------------------------------------------------------------------------------
