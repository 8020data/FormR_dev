const db       = require( '../models' );
const User_role   = db.user_roles;                // .(01028.02.1 RAM Should it be  db.user_role)
const Op       = db.Sequelize.Op;

// Create and Save a new User_role
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.roleid) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const user_role =            // Create a User_role
         {  
           
         //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.
         userId   : req.body.userId,
         roleId   : req.body.roleId,
                     
        };

  User_role.create( user_role )    // Save User_role in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the User_role." });
     });
   };

// Retrieve all User_roles from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const roleid = req.query.roleid;
     var condition = roleid ? { roleid: { [Op.like]: `%${roleid}%` } } : null;                              //#.(01028.05.1)

//User_role.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  User_role.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving user_roles." } ); } );
         };

// Find a single User_role with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  User_role.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a User_role by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//User_role.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  User_role.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "User_role was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe User_role was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a User_role with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//User_role.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  User_role.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "User_role was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe User_role was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all User_roles from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  User_role.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} User_roles were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all user_roles." } ); } );
  };

