

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  userId      : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  roleId      : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  createdAt   : { type          :  pDB.Sequelize.STRING }
             ,  updatedAt   : { type          :  pDB.Sequelize.STRING }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'roleId'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
