const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)

// ---------------------------------------------------------------
let Employee = sequelize.define("employees", {
  name: Sequelize.STRING,
});

let Project = sequelize.define("projects", {
  name: Sequelize.STRING,
});

Employee.belongsTo(Project);
// ---------------------------------------------------------------


Employee.findAll({include: [Project]}).then(employees => {

  employees.forEach(employee => {

    var employee_project_name = employee.project ? employee.project.name : "No Project"  // .(30228.02.1 RAM May be null)

      console.log(`${employee.name} is in project: ${employee_project_name}`);
  });
}).finally(() => {
  sequelize.close();
});

// ---------------------------------------------------------------
