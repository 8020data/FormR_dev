const db = require("../models");
const Configuration = db.configurations; // .(01028.02.1 RAM Should it be  db.configuration)
const Op = db.Sequelize.Op;

// Create and Save a new Configuration
// -----------------------------------------------------------------------------------------
exports.create = (req, res) => {
  if (!req.body.description) {
    // Validate request
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const configuration =
    // Create a Configuration
    {
      //   <<COLNAME>>   : req.body.<<COLNAME>>ID,  Delete , on last line.
      id: req.body.id,
      description: req.body.description,
      settings: req.body.settings,
    };

  Configuration.create(configuration) // Save Configuration in the database
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Configuration.",
      });
    });
};

// Retrieve all Configurations from the database.
// -----------------------------------------------------------------------------------------
exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description
    ? { description: { [Op.like]: `%${description}%` } }
    : null; //#.(01028.05.1)

  //Configuration.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  Configuration.findAll({ where: condition }) // .(01028.05.2)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message ||
            "Some error occurred while retrieving configurations.",
        });
    });
};

// Find a single Configuration with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id;

  Configuration.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving id = " + id });
    });
};

// Update a Configuration by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

  //Configuration.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  Configuration.update(req.body, { where: { id: id } }) // .(01106.06.1 RAM Found it)
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Configuration was updated successfully." });
      } else {
        res.send({
          message: `Cannot update id = ${id}. Maybe Configuration was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating id = " + id });
    });
};

// Delete a Configuration with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

  //Configuration.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  Configuration.destroy({ where: { id: id } }) // .(01106.06.2)
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Configuration was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete id = ${id}. Maybe Configuration was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete id = " + id });
    });
};

// Delete all Configurations from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {
  Configuration.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({
        message: `${nums} Configurations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message ||
            "Some error occurred while removing all configurations.",
        });
    });
};
