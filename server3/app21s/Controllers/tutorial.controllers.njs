
// --------------------------------------------------------------------------------------------------------

        var aTable =  'tutorials'
        var aModel =  'tutorial'
        var aFName =  `${aModel}.controller`

//      --------------------------------------------------------------------------------------------------

        var pRoutes =
//                     Method   Route                               Roles      Controller
//                ------------ ------------------------------       -------    -----------------
               { 'http.get     /api/${aTable}/findAll/       ' : [ 'A      ', 'findAll          ' ]    // Retrieve all role records
               , 'http.get     /api/${aTable}/getOne/:id     ' : [ 'A      ', 'getOne2          ' ]    // Retrieve one role record
               , 'http.get     /api/${aTable}/findMany/:ids  ' : [ 'A      ', 'findOne2         ' ]    // Retrieve many role records with ids
               , 'http.get     /api/${aTable}/published/     ' : [ '- - - E', 'findAllPublished ' ]    // Retreive all published records
                  }
//      --------------------------------------------------------------------------------------------------

        var pControllers    =

//          --------------------------------------------------------------------------------------

          { createOne       : function createOne( req, res ) {

                controller( req, res, 'createOne('  + req.params.id + ')' )

                }    // eof `${aFName}.createOne`
//              ------------------------------------------------------------------------------

          , findAll         : function findAll( req, res ) {

                controller( req, res, 'findAll('     + req.params.id + ')' )

                }    // eof `${aFName}.findAll`
//              ------------------------------------------------------------------------------

          , getOne2         : function findOne2( req, res ) {

                controller( req, res, 'getOne2('     + req.params.id + ')' )

                }    // eof `${aFName}.findOne2`
//              ------------------------------------------------------------------------------

          , findAllPublished: function findAllPublished( req, res ) {

                controller( req, res, 'findAllPublished' )

                }    // eof `${aFName}.findAllPublished`
//              ------------------------------------------------------------------------------

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports  =
            { Routes      : pRoutes
            , Controllers : pControllers
              }





// ----------------------------------------------------------------------------

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
//        ------------------------------------------------------

// --------------------------------------------------------------------------------------------------------


















