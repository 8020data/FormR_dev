
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const roles    = require( '../controllers/role.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            roles.create);            // Create a new role
       router.get(    '/',            roles.findAll);           // Retrieve all roles
       router.get(    '/:id',         roles.findOne);           // Retrieve a single role with id
       router.put(    '/:id',         roles.update);            // Update a role with id
       router.delete( '/:id',         roles.delete);            // Delete a role with id
       router.delete( '/',            roles.deleteAll);         // Delete all roles

       app.use(   '/api/roles',                                router );

}

       module.exports = routes
