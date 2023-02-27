
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const formrs    = require( '../controllers/formr.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            formrs.create);            // Create a new Formr
       router.get(    '/',            formrs.findAll);           // Retrieve all Formrs
       router.get(    '/:id',         formrs.findOne);           // Retrieve a single Formr with id
       router.put(    '/:id',         formrs.update);            // Update a Formr with id
       router.delete( '/:id',         formrs.delete);            // Delete a Formr with id
       router.delete( '/',            formrs.deleteAll);         // Delete all Formrs

       app.use(   '/api/formrs',                                router );

       
       }

       module.exports = routes
