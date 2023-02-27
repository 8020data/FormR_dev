const db       = require( '../models' );
const Project   = db.projects;                // .(01028.02.1 RAM Should it be  db.project)
const Op       = db.Sequelize.Op;

// Create and Save a new Project
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.name) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const project =            // Create a Project
         {  
           
         //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.
         projectId   : req.body.projectId,
         name   : req.body.name,
         client   : req.body.client,
         clientWeb   : req.body.clientWeb,
         projectWeb   : req.body.projectWeb,
         location   : req.body.location,
         projectType   : req.body.projectType,
         industry   : req.body.industry,
         description   : req.body.description,
                     
        };

  Project.create( project )    // Save Project in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the Project." });
     });
   };

// Retrieve all Projects from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const name = req.query.name;
     var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;                              //#.(01028.05.1)

//Project.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  Project.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving projects." } ); } );
         };

// Find a single Project with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  Project.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a Project by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//Project.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  Project.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Project was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe Project was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a Project with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//Project.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  Project.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Project was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe Project was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all Projects from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  Project.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} Projects were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all projects." } ); } );
  };

