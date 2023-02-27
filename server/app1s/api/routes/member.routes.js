// module.exports =                  app   => { ... }   // Arrow function
// module.exports = function       ( app )    { ... }   // Anonymous function
//                  function routes( app )    { ... }   // Named function
// module.exports = routes

function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const members    = require( '../controllers/member.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            members.create);            // Create a new Member
       router.get(    '/',            members.findAll);           // Retrieve all Members
       router.get(    '/published',   members.findAllPublished);  // Retrieve all published Members
       router.get(    '/:id',         members.findOne);           // Retrieve a single Member with id
       router.put(    '/:id',         members.update);            // Update a Member with id
       router.delete( '/:id',         members.delete);            // Delete a Member with id
       router.delete( '/',            members.deleteAll);         // Delete all Members

       app.use(   '/api/members',                                router );
//     app.use(   '/api/members',    [authJwt.verifyToken],      router );

//     app.get(   '/api/test/all',                                               controller.allAccess      );
//     app.get(   '/api/test/user',  [authJwt.verifyToken],                      controller.userBoard      );
//     app.get(   '/api/test/mod',   [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard );
//     app.get(   '/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin],     controller.adminBoard     );
       }

       module.exports = routes
