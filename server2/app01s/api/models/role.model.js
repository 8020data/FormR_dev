//   module.exports = ( sequelize, Sequelize ) => {
//   module.exports =  function( pDB, aTable) {
     function setModel( pDB, aTable ) {                                         // .(10220.10.9 RAM Was: ( sequelize, Sequelize ))
  
        var pSchema         =                                                   // .(10220.10.10 RAM Added db.)
             { id           : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true 
                              , autoIncrement :  true
                                }
             , name         : { type          :  pDB.Sequelize.STRING   }
          // . username     : { type          :  pDB.Sequelize.STRING   }       // .(10309.03.5 RAM user.getRoles )
               };

        var pModel          =   pDB.sequelize.define( aTable, pSchema ) 
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'id'
     return pModel                                                              // .(10220.11.1 RAM Removed Specific Table Name)

            }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel

