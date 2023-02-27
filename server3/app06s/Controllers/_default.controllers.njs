
// --------------------------------------------------------------------------------------------------------

//      var aTable          =  '_default'
//      var aModel          =  '_default'
        var aDefault        =  `_default.controller`  // aka FName

//      --------------------------------------------------------------------------------------------------

        var pRoutes         =
//                     Method   Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.post    /api/${aTable}/createOne/       ' : [ 'A O - -', 'createOne           ' ]    // Create a new table record
               , 'http.get     /api/${aTable}/getAll/          ' : [ 'A O U E', 'getAll              ' ]    // Retrieve all table records
               , 'http.get     /api/${aTable}/getOne/:id       ' : [ 'A O U -', 'getOne              ' ]    // Retrieve one table record with id
               , 'http.get     /api/${aTable}/getMany/:ids     ' : [ 'A O U -', 'getMany             ' ]    // Retrieve many table records with ids
               , 'http.put     /api/${aTable}/updateOne/:id    ' : [ 'A O U -', 'updateOne           ' ]    // Update a table record with id
               , 'http.put     /api/${aTable}/updateMany/:ids  ' : [ 'A O - -', 'updateMany          ' ]    // Update many table records with ids
               , 'http.delete  /api/${aTable}/deleteOne/:id    ' : [ 'A O U -', 'deleteOne           ' ]    // Delete all table records
               , 'http.delete  /api/${aTable}/deleteMany/:ids  ' : [ 'A O - -', 'deleteMany          ' ]    // Delete all table records with id = ids
               , 'http.delete  /api/${aTable}/deleteAll/       ' : [ 'A - - -', 'deleteAll           ' ]    // Retrieve all published table records
                  }
//      --------------------------------------------------------------------------------------------------

        var pControllers    =

//          ----------------------------------------------------------------------------------

          { createOne       : function createOne(     req, res ) {

                controller( req, res, 'createOne' )

                }  // eof `${aDefault}.createOne`
//              ------------------------------------------------------------------------------

          , getAll          : function getAll(        req, res ) {

                controller( req, res, 'getAll' )

                }  // eof `${aDefault}.getAll`
//              ------------------------------------------------------------------------------

          , getOne          : function getOne(        req, res ) {

                controller( req, res, 'getOne('     + req.params.id  + ')' )

                }  // eof `${aDefault}.getOne`
//              ------------------------------------------------------------------------------

          , getMany         : function getMany(       req, res ) {

                controller( req, res, 'getMany('    + req.params.ids + ')' )

                }  // eof `${aDefault}.getMany`
//              ------------------------------------------------------------------------------

          , updateOne       : function getAll(        req, res ) {

                controller( req, res, 'updateOne('  + req.params.id  + ')' )

                }  // eof `${aDefault}.updateOne`
//              ------------------------------------------------------------------------------

          , updateMany      : function updateMany(    req, res ) {

                controller( req, res, 'updateMany(' + req.params.ids + ')' )

                }  // eof `${aDefault}.updateMany`
//              ------------------------------------------------------------------------------

          , deleteMany      : function deleteMany(    req, res ) {

                controller( req, res, 'deleteMany(' + req.params.ids + ')' )

                }  // eof `${aDefault}.deleteMany`
//              ------------------------------------------------------------------------------

          , deleteOne       : function deleteOne(     req, res ) {

                controller( req, res, 'deleteOne('  + req.params.id  + ')' )

                }  // eof `${aDefault}.deleteOne`
//              ------------------------------------------------------------------------------

          , deleteAll       : function deleteAll(     req, res ) {

                controller( req, res, 'deleteAll' )

                }  // eof `${aDefault}.deleteAll`
//              ------------------------------------------------------------------------------

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports  =
            { Routes      : pRoutes
            , Controllers : pControllers
              }
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
