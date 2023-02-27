const db       = require( '../models' );
const Roles_tables   = db.roles_tables;                // .(01028.02.1 RAM Should it be  db.roles_tables)
const Op       = db.Sequelize.Op;

// Create and Save a new Roles_tables
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.roleid) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const roles_tables =            // Create a Roles_tables
         {  
           
         //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.
         id   : req.body.id,
         tableId   : req.body.tableId,
         roleId   : req.body.roleId,
         allowInsert   : req.body.allowInsert,
         allowUpdate   : req.body.allowUpdate,
         allowDelete   : req.body.allowDelete            
        };

  Roles_tables.create( roles_tables )    // Save Roles_tables in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the Roles_tables." });
     });
   };

// Retrieve all Roles_tables from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const roleid = req.query.roleid;
     var condition = roleid ? { roleid: { [Op.like]: `%${roleid}%` } } : null;                              //#.(01028.05.1)

//Roles_tables.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  Roles_tables.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving roles_tables." } ); } );
         };

// Find a single Roles_tables with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  Roles_tables.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a Roles_tables by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//Roles_tables.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  Roles_tables.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Roles_tables was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe Roles_tables was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a Roles_tables with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//Roles_tables.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  Roles_tables.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Roles_tables was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe Roles_tables was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all Roles_tables from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  Roles_tables.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} Roles_tables were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all roles_tables." } ); } );
  };

