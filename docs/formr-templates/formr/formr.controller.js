const db       = require( '../models' );
const Formr   = db.formrs;                // .(01028.02.1 RAM Should it be  db.formr)
const Op       = db.Sequelize.Op;

// Create and Save a new Formr
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.<<SEARCHCOL>>) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const formr =            // Create a Formr
         {  
           
         //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.
            
        };

  Formr.create( formr )    // Save Formr in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the Formr." });
     });
   };

// Retrieve all Formrs from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const <<SEARCHCOL>> = req.query.<<SEARCHCOL>>;
     var condition = <<SEARCHCOL>> ? { <<SEARCHCOL>>: { [Op.like]: `%${<<SEARCHCOL>>}%` } } : null;                              //#.(01028.05.1)

//Formr.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  Formr.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving formrs." } ); } );
         };

// Find a single Formr with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  Formr.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a Formr by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//Formr.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  Formr.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Formr was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe Formr was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a Formr with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//Formr.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  Formr.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Formr was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe Formr was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all Formrs from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  Formr.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} Formrs were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all formrs." } ); } );
  };

