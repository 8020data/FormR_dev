module.exports = (sequelize, Sequelize) => {

  const table  =  sequelize.define( "table", {    // .(01115.02.1 RAM Added model table)
    name         : { type: Sequelize.STRING  },   // .(01115.02.2)
    title        : { type: Sequelize.STRING  },
    group        : { type: Sequelize.STRING  },   // .(01115.02.3)
    url          : { type: Sequelize.STRING  },   // .(01117.05.1 RAM Add column: url)
    description  : { type: Sequelize.STRING  },
    enabled      : { type: Sequelize.BOOLEAN },   // .(01115.02.3)
//  LastUpdated  : { type: Sequelize.STRING  }    // .(01120.01.1 RAM Someone deleted this column)
    });

  return table;
  };
