module.exports = (sequelize, Sequelize) => {

  const members_project = sequelize.define( "members_project", {
    id   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },

    //    <<COLNAME>>   : { type: Sequelize.STRING },   Delete , on last row
    memberId   : { type: Sequelize.INTEGER },
    projectId   : { type: Sequelize.INTEGER },
    sort   : { type: Sequelize.STRING },
    role   : { type: Sequelize.STRING },
    duration   : { type: Sequelize.STRING },
    dates   : { type: Sequelize.STRING },
    
    });

  return members_project;
};
