
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const user_roles    = require( '../controllers/user_roles.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            user_roles.create);            // Create a new User_roles
       router.get(    '/',            user_roles.findAll);           // Retrieve all User_roles
       router.get(    '/:id',         user_roles.findOne);           // Retrieve a single User_roles with id
       router.put(    '/:id',         user_roles.update);            // Update a User_roles with id
       router.delete( '/:id',         user_roles.delete);            // Delete a User_roles with id
       router.delete( '/',            user_roles.deleteAll);         // Delete all User_roles

       app.use(   '/api/user_roles',                                router );

       
       }

       module.exports = routes
