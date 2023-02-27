module.exports = (sequelize, Sequelize) => {

  const configuration = sequelize.define( "configuration", {
    id   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },

    //    <<COLNAME>>   : { type: Sequelize.STRING },   Delete , on last row
    description   : { type: Sequelize.STRING },
    settings   : { type: Sequelize.STRING }
    
    });

  return configuration;
};
