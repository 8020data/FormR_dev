const db       = require( '../models' );
const Member   = db.members;                // .(01028.02.1 RAM Should it be db.member)
const Op       = db.Sequelize.Op;

// Create and Save a new Member
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {

  if (!req.body.LastName) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
      return;
      }
   const member =            // Create a Member
         {  MemberID   : req.body.MemberID
         ,  MemberNo   : req.body.MemberNo
         ,  TitleName  : req.body.TitleName
         ,  FirstName  : req.body.FirstName
         ,  Middlename : req.body.Middlename
         ,  LastName   : req.body.LastName
         ,  PostName   : req.body.PostName
         ,  Company    : req.body.Company
         ,  Address1   : req.body.Address1
         ,  Address2   : req.body.Address2
         ,  City       : req.body.City
         ,  State      : req.body.State
         ,  Zip        : req.body.Zip
         ,  Country    : req.body.Country
         ,  Phone1     : req.body.Phone1
         ,  Phone2     : req.body.Phone2
         ,  Fax        : req.body.Fax
         ,  WebSite    : req.body.WebSite
         ,  Email      : req.body.Email
         ,  LastUpdated: req.body.LastUpdated
         ,  Skills     : req.body.Skills
         ,  Active     : req.body.Active
         ,  Bio        : req.body.Bio
            };

  Member.create( member )    // Save Member in the database
        .then( data => {
                                     res.send( data ); })
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the Member." });
     });
   };

// Retrieve all Members from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {

   const LastName = req.query.LastName;
     var condition = LastName ? { LastName: { [Op.like]: `%${LastName}%` } } : null;                              //#.(01028.05.1)
//   var condition = LastName ? { LastName: { [Op.like]: `%${LastName}%` } } : { LastName: { [Op.like]: `%` } };  // .(01028.05.1 RAM Was: null)

//Member.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  Member.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving members." } ); } );
         };

// Find a single Member with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  Member.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving MemberID = " + id } ); } );
  };

// Update a Member by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//Member.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  Member.update( req.body, { where: { MemberID: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Member was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update MemberID = ${id}. Maybe Member was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating MemberID = " + id } ); } );
  };

// Delete a Member with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//Member.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  Member.destroy( { where: { MemberID: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "Member was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete MemberID = ${id}. Maybe Member was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete MemberID = " + id } ); } );
  };

// Delete all Members from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  Member.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} Members were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all members." } ); } );
  };

// find all published Member
// -----------------------------------------------------------------------------------------
exports.findAllPublished = (req, res) => {

  Member.findAll({ where: { published: true } })
        .then(  data => {
                                     res.send( data ); })
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving members." } ); } );
  };
