
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const roles_tables    = require( '../controllers/roles_tables.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            roles_tables.create);            // Create a new Roles_tables
       router.get(    '/',            roles_tables.findAll);           // Retrieve all Roles_tables
       router.get(    '/:id',         roles_tables.findOne);           // Retrieve a single Roles_tables with id
       router.put(    '/:id',         roles_tables.update);            // Update a Roles_tables with id
       router.delete( '/:id',         roles_tables.delete);            // Delete a Roles_tables with id
       router.delete( '/',            roles_tables.deleteAll);         // Delete all Roles_tables

       app.use(   '/api/roles_tables',                                router );

       
       }

       module.exports = routes
