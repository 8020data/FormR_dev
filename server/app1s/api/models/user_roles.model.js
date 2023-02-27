module.exports = (sequelize, Sequelize) => {

  const user_roles = sequelize.define( "user_roles", {
    //id   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
    //             , primaryKey   : true
    //             , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
    //               },

    //    <<COLNAME>>   : { type: Sequelize.STRING },   Delete , on last row
    userId   : { type: Sequelize.INTEGER },
    roleId   : { type: Sequelize.INTEGER },
    
    });

  return user_roles;
};
