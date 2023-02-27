module.exports = (sequelize, Sequelize) => {

  const lookup = sequelize.define( "lookup", {
    id   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },

    //    <<COLNAME>>   : { type: Sequelize.STRING },   Delete , on last row
    type   : { type: Sequelize.STRING },
    value   : { type: Sequelize.STRING }
    
    });

  return lookup;
};
