
// --------------------------------------------------------------------------------------------------------

        var aTable =  'special'
        var aFName =  `${aTable}.controller`


//      --------------------------------------------------------------------------------------------------

        var pRoutes =
//                     Method   Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/special/                   ' : [ '      E', 'special             ' ]    // Use special route and route
                  }
//      --------------------------------------------------------------------------------------------------

        var pControllers    =

//          --------------------------------------------------------------------------------------

          { special         : function createOne( req, res ) {

                controller( req, res, 'createOne('  + req.params.id + ')' )

                }    // eof `${aFName}.createOne`
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

