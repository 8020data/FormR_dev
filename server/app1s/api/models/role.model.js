module.exports = (sequelize, Sequelize) => {

  const role = sequelize.define( "role", {
    id   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },

    //    <<COLNAME>>roleNo   : { type: Sequelize.STRING },   Delete , on last row

    name   : { type: Sequelize.STRING },
    
    });

  return role;
};
