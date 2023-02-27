function routes(app) {
  // class routes {             // .(01022.01.1 RAM Where is app)

  const configurations = require("../controllers/configuration.controller.js");
  const controller = require("../controllers/board.controller");

  var router = require("express").Router();

  router.post("/", configurations.create); // Create a new Configuration
  router.get("/", configurations.findAll); // Retrieve all Configurations
  router.get("/:id", configurations.findOne); // Retrieve a single Configuration with id
  router.put("/:id", configurations.update); // Update a Configuration with id
  router.delete("/:id", configurations.delete); // Delete a Configuration with id
  router.delete("/", configurations.deleteAll); // Delete all Configurations

  app.use("/api/configurations", router);
}

module.exports = routes;
