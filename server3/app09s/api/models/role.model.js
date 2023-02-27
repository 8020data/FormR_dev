
// const { sequelize, Sequelize } = require( './db.connect.js' )          //#.(10110.01.1 RAM Not needed, sequelize passed from calling program)  
   const   Sequelize              = require( 'sequelize'       )          // .(10110.01.1)  

// module.exports = ( sequelize, Sequelize ) => {                         //#.(10103.02.2 RAM Try this)  
// module.exports = ( ) => {                                              //#.(10103.02.2 RAM Try this)  
// RoleModel = function( sequelize, Sequelize ) {                         //#.(10103.02.2 RAM Try this).(10110.01.2)   
      pModel = function( db ) {                                           // .(10110.01.2 RAM Well, we do need .. )  

//    const pRole          =   db.sequelize.define( "role",               //#.(10110.01.5 RAM    ... sequelize  )   
      const pSchema        =                                              // .(10110.02.1 RAM The Model Schema)   

             {  id         : { type          :  Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
//  ID                     : { type          :  Sequelize.INTEGER         // .(01106.04.RAM Use ID)
                             , primaryKey    :  true
                             , autoIncrement :  true                      // Automatically gets converted to SERIAL for postgres},
                               }

//           ,  <<COLNAME>>FormrNo : { type  :  Sequelize.STRING }, Delete , on last row
             ,  name       : { type          :  Sequelize.STRING }
                } // );                                                   // .(10110.02.2)    




//   return pRole;
     return db.sequelize.define( "role", pSchema );                       // .(10110.02.3 RAM Cleaner this way) 
     };

// module.exports = RoleModel                                             //#.(10103.02.3)  
// module.exports = RoleModel( sequelize, Sequelize)                      //#.(10109.01.2 BTR Add Model).(10110.02.4) 
   module.exports = pModel                                                // .(10109.01.2 BTR Add Model).(10110.02.4)  
