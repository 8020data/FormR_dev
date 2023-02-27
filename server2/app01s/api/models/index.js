const dbConnect         =  require(  '../config/db.connect.js' );                          // .(10220.10.1 Switch to db.connect)

const db                =  dbConnect( '' )                                                 // .(10220.10.3)

//    db.user           =  require( "../models/user.model.js"     )( sequelize, Sequelize );
//    db.role           =  require( "../models/role.model.js"     )( sequelize, Sequelize );
//    db.tutorials      =  require( "../models/tutorial.model.js" )( sequelize, Sequelize );

      db.user           =  require( "../models/user.model.js"     )( db, 'users'     )     // .(10220.10.4 RAM Was: (sequelize, Sequelize) )
      db.role           =  require( "../models/role.model.js"     )( db, 'roles'     )     // .(10309.03.1 RAM Need this)

// -------------------------------------------------------------------------------------------------

      db.role.belongsToMany( db.user                                                       // .(10309.03.2 Beg RAM Need this)
        , { through     : "user_roles"
          , foreignKey  : "roleId"
          , otherKey    : "userId"
            } );
      db.user.belongsToMany( db.role
        , { through     : "user_roles"
          , foreignKey  : "userId"
          , otherKey    : "roleId"
            } );

      db.ROLES          = [ "user", "admin", "editor" ];                                   // .(10309.03.2 End)

// -------------------------------------------------------------------------------------------------

      module.exports    =  db;
//                         trace(  'module.exports\n' )

   if ('test' == 'text') {

         testModel( ) 

   async function testModel() { 

// const jane  = await   User.create( { name: "Jane"  } );

     var pUser = await db.user.create( { name: "Robin" } ) 
         console.log(  pUser.toJSON( ) ); // This is good!
         console.log(  JSON.stringify( pUser, null, 4)); // This is also good!
         }


         }


