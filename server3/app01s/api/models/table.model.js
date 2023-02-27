module.exports = (sequelize, Sequelize) => {

  const table = sequelize.define( "table", {
    id   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },

    //    <<COLNAME>>   : { type: Sequelize.STRING },   Delete , on last row
    name   : { type: Sequelize.STRING },
    title   : { type: Sequelize.STRING },
    group   : { type: Sequelize.STRING },
    description   : { type: Sequelize.STRING },
    enabled   : { type: Sequelize.STRING },
    url   : { type: Sequelize.STRING }
    
    });

  return table;
};
