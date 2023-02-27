module.exports = (sequelize, Sequelize) => {

  const tutorial = sequelize.define( "tutorial", {
    title        : { type: Sequelize.STRING   },
    description  : { type: Sequelize.STRING   },
    published    : { type: Sequelize.BOOLEAN  },
//  LastUpdated  : { type: Sequelize.STRING   }    // .(01106.03.1 RAM Added)
    });

  return tutorial;
};
