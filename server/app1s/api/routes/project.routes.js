
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const projects    = require( '../controllers/project.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            projects.create);            // Create a new Project
       router.get(    '/',            projects.findAll);           // Retrieve all Projects
       router.get(    '/:id',         projects.findOne);           // Retrieve a single Project with id
       router.put(    '/:id',         projects.update);            // Update a Project with id
       router.delete( '/:id',         projects.delete);            // Delete a Project with id
       router.delete( '/',            projects.deleteAll);         // Delete all Projects

       app.use(   '/api/projects',                                router );

       
       }

       module.exports = routes
