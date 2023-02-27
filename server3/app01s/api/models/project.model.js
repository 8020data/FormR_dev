module.exports = (sequelize, Sequelize) => {

  const project = sequelize.define( "project", {
    projectId   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },

    //    <<COLNAME>>   : { type: Sequelize.STRING },   Delete , on last row
    name   : { type: Sequelize.STRING },
    client   : { type: Sequelize.STRING },
    clientWeb   : { type: Sequelize.STRING },
    projectWeb   : { type: Sequelize.STRING },
    location   : { type: Sequelize.STRING },
    projectType   : { type: Sequelize.STRING },
    industry   : { type: Sequelize.STRING },
    description   : { type: Sequelize.STRING },
    
    });

  return project;
};
