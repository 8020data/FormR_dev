// db.config.js
module.exports = {
  
  HOST: "45.32.219.12",
  USER: "nimdas",
  PASSWORD: "FormR!1234",
  DB: "sequelize1",

  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }    
  };

