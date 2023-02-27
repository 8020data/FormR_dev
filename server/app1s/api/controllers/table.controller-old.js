const db       = require( '../models' );       
const Table    = db.tables;                        // .(01115.01.1 Add tables model and api)
const Op       = db.Sequelize.Op;
// --------------------------------------------------------------------------------------

exports.create = (    req, res   ) => {    // Create and Save a new Table

  if (!req.body.title) {                   // Validate request
                      res.status(400).send( { message: "Content can not be empty!" });
       return;
       }
  const pTable     =                       // Create a Table
    { name         : req.body.name
    , title        : req.body.title
    , group        : req.body.group
    , url          : req.body.url          // ,(01117.05.2)
    , description  : req.body.description
    , enabled      : req.body.enabled ? req.body.published : true
      };
  Table.create( pTable )     // Save Table in the database
    .then( data => {
                      res.send( data ); })
    .catch( err => {
                      res.status(500).send( { message: err.message || "Some error occurred while creating the Table." } ); } );
     };
// --------------------------------------------------------------------------------------

exports.findGrp = (   req, res  ) => {                                              // .(01117.06.1 Beg RAM Retrieve all Tables for one Group)

  const aGroup      = (req.query.group || '').toLowerCase();                        // .(01117.06.3.4)
//  var condition   = aGroup ? {   group:   { [Op.like]: `${aGroup}%` } } : null;   //#.(01117.06.3.5)
    var condition   = aGroup ? {   group:   { [Op.like]: `${aGroup}%` } } : null;   // .(01117.06.3.5)
//  var condition   = aGroup ? { '[group]': { [Op.like]: `${aGroup}%` } } : null;   //#.(01117.06.3.6)

  Table.findAll( { where: condition } )
    .then( data => {
                      res.send( data ); } )
    .catch( err => {
                      res.status(500).send( { message: err.message || "Some error occurred while retrieving tutorials." } ); } );
     };                                    // .(01117.06.1 End)  
// --------------------------------------------------------------------------------------

exports.findAll = (   req, res  ) => {     // Retrieve all Tables from the database.

  const title       = req.query.title;
    var condition   = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Table.findAll( { where: condition } )
    .then( data => {
                      res.send( data ); } )
    .catch( err => {
                      res.status(500).send( { message: err.message || "Some error occurred while retrieving tutorials." } ); } );
     };
// --------------------------------------------------------------------------------------

exports.findOne = (   req, res  ) => {  // Find a single Table with an id
  const id      =     req.params.id;

   Table.findByPk(id)
    .then( data => {  
                      res.send( data ); } )
    .catch(err => {   
                      res.status(500).send( { message: "Error retrieving Table with id=" + id } );
     } );
};
// --------------------------------------------------------------------------------------

exports.update  = (   req, res ) => {  // Update a Table by the id in the request
  const id      =     req.params.id;

  Table.update(       req.body, { where: { id: id } } )
    .then(num   =>  {
      if (num == 1) { 
                      res.send( { message: "Table was updated successfully." } );
      } else {        
                      res.send( { message: `Cannot update Table with id=${id}. Maybe Table was not found or req.body is empty!` } );
      } } )
    .catch(err   => { 
                      res.status(500).send( { message: "Error updating Table with id=" + id } );
      } );
 };
// --------------------------------------------------------------------------------------

exports.delete  = (   req, res  ) => {  // Delete a Table with the specified id in the request
  const id       =    req.params.id;

  Table.destroy( {    where: { id: id } } )
    .then(num => {
      if (num == 1) {
                      res.send({ message: "Table was deleted successfully!" } );
      } else {
                      res.send({ message: `Cannot delete Table with id=${id}. Maybe Table was not found!` } );
      } } )
    .catch(err => {
                      res.status(500).send({ message: "Could not delete Table with id=" + id } );
     } );
  };
// ------------------------------------------------------------------------------------

exports.deleteAll = ( req, res ) => {  // Delete all Tables from the database.

      res.send( { message: `Tables would be deleted successfully!` });
      process.exit() 

  Table.destroy( {    where: { },
                      truncate: false
     } )
    .then( nums => {
                      res            .send( { message: `${nums} Tables were deleted successfully!` });
     } )
    .catch( err => {
                      res.status(500).send( { message:  err.message || "Some error occurred while removing all tutorials."  } );
    });
};
// --------------------------------------------------------------------------------------

exports.findAllEnabled = ( req, res ) => {  // find all enabled Tables
  
  Table.findAll({ where: { enabled: true } })
    .then( data => {
                      res.send( data );
     } )
    .catch(err => {
                      res.status( 500 ).send( { message: err.message || "Some error occurred while retrieving tutorials." } );
     } );
};
// --------------------------------------------------------------------------------------
