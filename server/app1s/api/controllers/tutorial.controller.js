const db       = require( '../models' );
const Tutorial = db.tutorials;
const Op       = db.Sequelize.Op;
// --------------------------------------------------------------------------------------

exports.create = (req, res) => {     // Create and Save a new Tutorial

  if (!req.body.title) {             // Validate request
                      res.status(400).send( { message: "Content can not be empty!" });
       return;
       }
  const tutorial = {                 // Create a Tutorial
       title:         req.body.title,
       description:   req.body.description,
       published:     req.body.published ? req.body.published : false
       };
  Tutorial.create(    tutorial )     // Save Tutorial in the database
    .then(data => {
                      res.send(data); })
    .catch(err => {
                      res.status(500).send( { message: err.message || "Some error occurred while creating the Tutorial." } ); } );
     };
// --------------------------------------------------------------------------------------

exports.findAll = (   req, res  ) => {  // Retrieve all Tutorials from the database.

  const title       = req.query.title;
    var condition   = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll( { where: condition } )
    .then( data => {
                      res.send(data); } )
    .catch( err => {
                      res.status(500).send( { message: err.message || "Some error occurred while retrieving tutorials." } ); } );
     };
// --------------------------------------------------------------------------------------

exports.findOne = (req, res) => {  // Find a single Tutorial with an id
  const id = req.params.id;

   Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
// --------------------------------------------------------------------------------------


exports.update = (req, res) => {  // Update a Tutorial by the id in the request
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
// --------------------------------------------------------------------------------------

exports.delete = (req, res) => {  // Delete a Tutorial with the specified id in the request
  const id = req.params.id;

  Tutorial.destroy({
                      where: { id: id }
      } )
    .then(num => {
      if (num == 1) {
                      res.send({ message: "Tutorial was deleted successfully!" } );
      } else {
                      res.send({ message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!` } );
          }
     } )
    .catch(err => {
                      res.status(500).send({ message: "Could not delete Tutorial with id=" + id } );
     } );
  };
// ------------------------------------------------------------------------------------

exports.deleteAll = (req, res) => {  // Delete all Tutorials from the database.

      res.send( { message: `Tutorials would be deleted successfully!` });
      process.exit() 

  Tutorial.destroy( {
                      where: { },
                      truncate: false
      } )
    .then( nums => {
                     res            .send( { message: `${nums} Tutorials were deleted successfully!` });
      } )
    .catch( err => {
                     res.status(500).send( { message:  err.message || "Some error occurred while removing all tutorials."  } );
    });
};
// --------------------------------------------------------------------------------------

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// --------------------------------------------------------------------------------------
