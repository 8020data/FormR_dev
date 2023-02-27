
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const { authJwt }   =  require( "../middleware" );

 const tutorials     =  require( '../controllers/tutorial.controller.js' );
 const controller    =  require( '../controllers/board.controller'        );

   var pRouter       =  require( 'express' ).Router( );

       pRouter.post(   '/'                                                     , tutorials.create           );  // Create a new Tutorial
       pRouter.get(    '/'                                                     , tutorials.findAll          );  // Retrieve all Tutorials

//     pRouter.get(    '/published', [authJwt.verifyToken, authJwt.isModerator], tutorials.findAllPublished );  // Retrieve all published Tutorials if moderator  // .(01024.01.1 RAM)
       pRouter.get(    '/published', [authJwt.verifyToken, authJwt.isAdmin]    , tutorials.findAllPublished );  // Retrieve all published Tutorials if moderator  // .(01024.01.1 RAM)

       pRouter.get(    '/:id'                                                  , tutorials.findOne          );  // Retrieve a single Tutorial with id
       pRouter.put(    '/:id'                                                  , tutorials.update           );  // Update a Tutorial with id

//     pRouter.delete( '/:id'      , [authJwt.verifyToken, authJwt.isAdmin]    , tutorials.delete           );  // Delete a Tutorial with id          // .(01027.01.1 RAM)
       pRouter.delete( '/:id'      , [authJwt.verifyToken, authJwt.isAdmin]    , tutorials.delete           );  // Delete a Tutorial with id if Admin // .(01027.01.1 RAM)

//     pRouter.delete( '/'                                                     , tutorials.deleteAll        );  // Delete all Tutorials
       pRouter.delete( '/'         , [authJwt.verifyToken, authJwt.isAdmin]    , tutorials.deleteAll        );  // Delete all Tutorials if Admin      // .(01025.01.1 RAM)

       app.use( '/api/tutorials'                                               , pRouter );  // Use prefix /api/tutorials for all routes in pRouter
//     app.use( "/api/tutorials"   , [authJwt.verifyToken]                     , pRouter );  // Token must be present for all /api/tutorials/* routes 

//     app.get( "/api/test/all"                                                , controller.allAccess       );
//     app.get( "/api/test/user"   , [authJwt.verifyToken]                     , controller.userBoard       );
//     app.get( "/api/test/mod"    , [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard  );
//     app.get( "/api/test/admin"  , [authJwt.verifyToken, authJwt.isAdmin]    , controller.adminBoard      );
 
       }  // eof routes 

       module.exports = routes
//     module.exports =                  app   => { ... }   // Arrow function
//     module.exports = function       ( app )    { ... }   // Anonymous function
//                      function routes( app )    { ... }   // Named function
 