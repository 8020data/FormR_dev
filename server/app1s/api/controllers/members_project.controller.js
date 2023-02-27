const db       = require( '../models' );
const Members_project   = db.members_projects;                // .(01028.02.1 RAM Should it be  db.members_project)
const Op       = db.Sequelize.Op;

// Create and Save a new Members_project
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.memberId) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const members_project =            // Create a Members_project
         {  
           
         //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.
         id   : req.body.id,
         memberId   : req.body.memberId,
         projectId   : req.body.projectId,
         sort   : req.body.sort,
         role   : req.body.role,
         duration   : req.body.duration,
         dates   : req.body.dates,
                     
        };

  Members_project.create( members_project )    // Save Members_project in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the Members_project." });
     });
   };

// Retrieve all Members_projects from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const memberId = req.query.memberId;
     var condition = memberId ? { memberId: { [Op.like]: `%${memberId}%` } } : null;                              //#.(01028.05.1)

//Members_project.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  Members_project.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving members_projects." } ); } );
         };

// Find a single Members_project with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  Members_project.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a Members_project by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//Members_project.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  Members_project.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Members_project was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe Members_project was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a Members_project with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//Members_project.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  Members_project.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Members_project was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe Members_project was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all Members_projects from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  Members_project.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} Members_projects were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all members_projects." } ); } );
  };

