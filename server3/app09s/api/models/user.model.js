
// const { sequelize, Sequelize } = require( './db.connect.js' )          //#.(10110.01.1 RAM Not needed, sequelize passed from calling program)  
   const   Sequelize              = require( 'sequelize'       )          // .(10110.01.1)  
   const   db                     = require( '../config/db.connect.js' )  // .(10110.03.1 RAM I guess we do need it again whether is called from models/index, or controllers/)
                                                                          //           models/index.js[4]    db.users =  require( './user.model.js'    )
                                                                          //           user.controller.js[4] user     =  require( '../models/index.js' ).user  

// module.exports  = ( sequelize, Sequelize ) => {                        //#.(10103.02.2 RAM Try this)  
// module.exports  = ( ) => {                                             //#.(10103.02.2 RAM Try this)  
// UserModel = function( sequelize, Sequelize ) {                         //#.(10103.02.2 RAM Try this).(10110.01.2)  
//    const pModel = function( db ) {                                     // .(10110.01.2 RAM Well, we do need .. )  
      const setModel = function( db ) {                                   // .(10110.01.2 RAM Well, we do need .. ).(10110.03.2)  

//    const pUser          =   db.sequelize.define( "user",               //#.(10110.01.5 RAM    ... sequelize  )   
      const pSchema        =                                              // .(10110.02.1 RAM The Model Schema)   

             {  id         : { type          :  Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
//  ID                     : { type          :  Sequelize.INTEGER         // .(01106.04.RAM Use ID)
                             , primaryKey    :  true
                             , autoIncrement :  true                      // Automatically gets converted to SERIAL for postgres},
                               }

//           ,  <<COLNAME>>FormrNo : { type  :  Sequelize.STRING }, Delete , on last row
             ,  username   : { type          :  Sequelize.STRING }
             ,  email      : { type          :  Sequelize.STRING }
             ,  password   : { type          :  Sequelize.STRING }
             ,  active     : { type          :  Sequelize.STRING }
                } // );                                                   // .(10110.02.2)    

//   return pUser;
     return db.sequelize.define( "user", pSchema );                       // .(10110.02.3 RAM Cleaner this way) 
     };

// module.exports = UserModel                                             //#.(10103.02.3)  
// module.exports = UserModel( sequelize, Sequelize)                      // .(10103.02.3).(10110.02.4)  
// module.exports = pModel                                                // .(10110.02.4).(10110.03.3)   
   module.exports = setModel( db )                                        // .(10110.03.3)   
