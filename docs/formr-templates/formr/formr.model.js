module.exports = (sequelize, Sequelize) => {

  const formr = sequelize.define( "formr", {
    id   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },

    //    <<COLNAME>>   : { type: Sequelize.STRING },   Delete , on last row

    
    });

  return formr;
};
