module.exports   = ( pDB, aTable ) => {                   // .(10220.10.9 RAM Was: ( sequelize, Sequelize ))
  
  const pModel   =   pDB.sequelize.define( aTable, {      // .(10220.10.10 RAM Added db.)
    id           : { type: pDB.Sequelize.INTEGER, primaryKey: true },
    name         : { type: pDB.Sequelize.STRING }
    } );

  return pModel;                                          // .(10220.11.1 RAM Removed Specific Table Name)
  };
