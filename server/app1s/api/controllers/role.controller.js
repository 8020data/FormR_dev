const db       = require( '../models' );
const role   = db.role;                // .(01028.02.1 RAM Should it be  db.role)
const Op       = db.Sequelize.Op;

// Create and Save a new role
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.name) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const role =            // Create a role
         {  
           
         //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.

         id   : req.body.id,
         name   : req.body.name,         
        };

  role.create( role )    // Save role in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the role." });
     });
   };

// Retrieve all roles from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const name = req.query.name;
     var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;                              //#.(01028.05.1)

//role.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  role.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving roles." } ); } );
         };

// Find a single role with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  role.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a role by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//role.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  role.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "role was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe role was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a role with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//role.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  role.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "role was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe role was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all roles from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  role.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} roles were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all roles." } ); } );
  };

