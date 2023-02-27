
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const tables    = require( '../controllers/table.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            tables.create);            // Create a new Table
       router.get(    '/',            tables.findAll);           // Retrieve all Tables
       router.get(    '/:id',         tables.findOne);           // Retrieve a single Table with id
       router.put(    '/:id',         tables.update);            // Update a Table with id
       router.delete( '/:id',         tables.delete);            // Delete a Table with id
       router.delete( '/',            tables.deleteAll);         // Delete all Tables

       app.use(   '/api/tables',                                router );

       
       }

       module.exports = routes
