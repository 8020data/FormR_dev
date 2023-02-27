const db       = require( '../models' );
const Lookup   = db.lookups;                // .(01028.02.1 RAM Should it be  db.lookup)
const Op       = db.Sequelize.Op;

// Create and Save a new Lookup
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.type) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const lookup =            // Create a Lookup
         {  
           
         //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.
         id   : req.body.id,
         type   : req.body.type,
         value   : req.body.value            
        };

  Lookup.create( lookup )    // Save Lookup in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the Lookup." });
     });
   };

// Retrieve all Lookups from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const type = req.query.type;
     var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;                              //#.(01028.05.1)

//Lookup.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  Lookup.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving lookups." } ); } );
         };

// Find a single Lookup with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  Lookup.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a Lookup by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//Lookup.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  Lookup.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Lookup was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe Lookup was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a Lookup with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//Lookup.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  Lookup.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Lookup was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe Lookup was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all Lookups from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  Lookup.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} Lookups were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all lookups." } ); } );
  };

