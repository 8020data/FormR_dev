
function routes( app ) {
// class routes {             // .(01022.01.1 RAM Where is app)

 const members_projects    = require( '../controllers/members_project.controller.js'   );
 const controller = require( '../controllers/board.controller'        );

   var router     = require( 'express' ).Router( );

       router.post(   '/',            members_projects.create);            // Create a new Members_project
       router.get(    '/',            members_projects.findAll);           // Retrieve all Members_projects
       router.get(    '/:id',         members_projects.findOne);           // Retrieve a single Members_project with id
       router.put(    '/:id',         members_projects.update);            // Update a Members_project with id
       router.delete( '/:id',         members_projects.delete);            // Delete a Members_project with id
       router.delete( '/',            members_projects.deleteAll);         // Delete all Members_projects

       app.use(   '/api/members_projects',                                router );

       
       }

       module.exports = routes
