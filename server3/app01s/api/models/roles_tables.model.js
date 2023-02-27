module.exports = (sequelize, Sequelize) => {

  const roles_tables = sequelize.define( "roles_tables", {
    id   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },

    //    <<COLNAME>>   : { type: Sequelize.STRING },   Delete , on last row
    tableId   : { type: Sequelize.INTEGER },
    roleId   : { type: Sequelize.INTEGER },
    allowInsert   : { type: Sequelize.STRING },
    allowUpdate   : { type: Sequelize.STRING },
    allowDelete   : { type: Sequelize.STRING }
    
    });

  return roles_tables;
};
