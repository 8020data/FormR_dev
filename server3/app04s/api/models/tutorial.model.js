module.exports   = ( pDB, aTable ) => {                   // .(10220.10.11 RAM Was: ( sequelize, Sequelize ))

  const pModel   =   pDB.sequelize.define( aTable, {      // .(10220.10.8 RAM Added db. and aTable)
    title        : { type: pDB.Sequelize.STRING  },
    description  : { type: pDB.Sequelize.STRING  },
    published    : { type: pDB.Sequelize.BOOLEAN },
//  LastUpdated  : { type: pDB.Sequelize.STRING  }        // .(01106.03.1 RAM Added)
    } );

  return pModel;                                          // .(10220.11.2 RAM Removed Specific Table Name)
  };
