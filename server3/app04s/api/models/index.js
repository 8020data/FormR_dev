//nst Sequelize         = require(  'sequelize' );

const dbConnect         = require(  '../config/db.connect.js' );                          // .(10220.10.1 Switch to db.connect)

const db                = dbConnect( '' )                                                 // .(10220.10.3)   

      db.user           = require( "../models/user.model.js"     )( db, 'users'     )     // .(10220.10.4 RAM Was: (sequelize, Sequelize) )
      db.role           = require( "../models/role.model.js"     )( db, 'roles'     )     // .(10220.10.5 RAM Was: (sequelize, Sequelize) )
//    db.tutorial       = require( "../models/tutorial.model.js" )( db, 'tutorials' )     // .(10220.10.6 RAM Was: (sequelize, Sequelize) )

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

//    db.ROLES          = [ "user", "admin", "moderator" ];
      db.ROLES          = [ "user", "admin", "editor"    ];    // .(10228.03.1 RAM Was: "moderator")

                          trace(  'module.exports' ) 
      module.exports    =  db;

// -------------------------------------------------------------------------------------------------
