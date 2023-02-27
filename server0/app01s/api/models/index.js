const dbConfig          = require( '../config/db.config.js' );
const Sequelize         = require( 'sequelize' );

  var sequelize         = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host              : dbConfig.HOST ,
      dialect           : dbConfig.dialect ,
//    dialectOptions    : { options: { encrypt: true ,                                //#.(10218.03.1 Beg RAM)
//                                     validateBulkLoadParameters: false        
//                                     }          
//                          },                                                        //#.(10218.03.1 End)
//                          options: { validateBulkLoadParameters: 'false' } ,
//    operatorsAliases  :   false,
      pool              :
      { max             : dbConfig.pool.max
      , min             : dbConfig.pool.min
      , acquire         : dbConfig.pool.acquire
      , idle            : dbConfig.pool.idle
        }
      } );

const db = {};

      db.Sequelize      = Sequelize;
      db.sequelize      = sequelize;

      db.user           = require( "../models/user.model.js"     )( sequelize, Sequelize );
      db.role           = require( "../models/role.model.js"     )( sequelize, Sequelize );
      db.tutorials      = require( "../models/tutorial.model.js" )( sequelize, Sequelize );

      db.role.belongsToMany( db.user
        , { through     : "user_roles"
          , foreignKey  : "roleId"
          , otherKey    : "userId"
            } );
      db.user.belongsToMany( db.role
        , { through     : "user_roles"
          , foreignKey  : "userId"
          , otherKey    : "roleId"
            } );

      db.ROLES          = [ "user", "admin", "moderator" ];


      module.exports = db;
