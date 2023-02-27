
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const { authJwt }   =  require( "../middleware" );

 const tables        =  require( '../controllers/table.controller.js' );    // .(01115.01.1 Added tables route)
 const controller    =  require( '../controllers/user.controller'     );

   var pRouter       =  require( 'express' ).Router( );
 
       pRouter.post(   '/'                                                      , tables.create           );  // Create a new Table
//     pRouter.get(    '/'                                                      , tables.findAll          );  //#.(01117.06.3 Retrieve all Tables or one with name
       pRouter.get(    '/'                                                      , tables.findGrp          );  // .(01117.06.3 RAM Retrieve all Tables or one for group)

//     pRouter.get(    '/enabled'   , [authJwt.verifyToken, authJwt.isModerator], tables.findAllPublished );  // Retrieve all published Tables if moderator   .(01115.02.3 Used Enabled instead of Published)
//     pRouter.get(    '/enabled'   , [authJwt.verifyToken, authJwt.isAdmin]    , tables.findAllEnabled   );  // Retrieve all enabled   Tables if admin   
       pRouter.get(    '/enabled'                                               , tables.findAllEnabled   );  // Retrieve all enabled   Tables 

       pRouter.get(    '/:id'                                                   , tables.findOne          );  // Retrieve a single Table with id
       pRouter.put(    '/:id'                                                   , tables.update           );  // Update a Table with id

//     pRouter.delete( '/:id'       , [authJwt.verifyToken, authJwt.isAdmin]    , tables.delete           );  // Delete a Table with id           
       pRouter.delete( '/:id'       , [authJwt.verifyToken, authJwt.isAdmin]    , tables.delete           );  // Delete a Table with id if Admin  

//     pRouter.delete( '/'                                                      , tables.deleteAll        );  // Delete all Tables
       pRouter.delete( '/'          , [authJwt.verifyToken, authJwt.isAdmin]    , tables.deleteAll        );  // Delete all Tables if Admin      

       app.use(        '/api/tables'                                            , pRouter );  // Use prefix /api/tables for all routes in pRouter
//     app.use(        '/api/tables' ,[authJwt.verifyToken]                     , pRouter );  // Token must be present for all /api/tables/* routes 
 
       }  // eof routes 

//     module.exports =                  app   => { ... }   // Arrow function
//     module.exports = function       ( app )    { ... }   // Anonymous function
//                      function routes( app )    { ... }   // Named function
       module.exports =          routes
 