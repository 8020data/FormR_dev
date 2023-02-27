
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const lookups    = require( '../controllers/lookup.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            lookups.create);            // Create a new Lookup
       router.get(    '/',            lookups.findAll);           // Retrieve all Lookups
       router.get(    '/:id',         lookups.findOne);           // Retrieve a single Lookup with id
       router.put(    '/:id',         lookups.update);            // Update a Lookup with id
       router.delete( '/:id',         lookups.delete);            // Delete a Lookup with id
       router.delete( '/',            lookups.deleteAll);         // Delete all Lookups

       app.use(   '/api/lookups',                                router );

       
       }

       module.exports = routes
