const db       = require( '../models' );
const Table   = db.tables;                // .(01028.02.1 RAM Should it be  db.table)
const Op       = db.Sequelize.Op;

// Create and Save a new Table
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.title) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const table =            // Create a Table
         {  
           
         //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.
         id   : req.body.id,
         name   : req.body.name,
         title   : req.body.title,
         group   : req.body.group,
         description   : req.body.description,
         enabled   : req.body.enabled,
         url   : req.body.url
                     
        };

  Table.create( table )    // Save Table in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the Table." });
     });
   };

// Retrieve all Tables from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const title = req.query.title;
     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;                              //#.(01028.05.1)

//Table.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  Table.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving tables." } ); } );
         };

// Find a single Table with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  Table.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a Table by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//Table.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  Table.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Table was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe Table was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a Table with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//Table.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  Table.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Table was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe Table was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all Tables from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  Table.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} Tables were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all tables." } ); } );
  };

