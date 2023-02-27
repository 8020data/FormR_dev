module.exports   = ( pDB, aTable ) => {                   // .(10220.10.7 RAM Was: ( sequelize, Sequelize ))
	
  const pModel   =   pDB.sequelize.define( aTable, {      // .(10220.10.8 RAM Added db. and aTable)
    username     : { type: pDB.Sequelize.STRING },
    email        : { type: pDB.Sequelize.STRING },
    password     : { type: pDB.Sequelize.STRING }
    } );

  return pModel;                                          // .(10220.11.3 RAM Removed Specific Table Name)
  };
