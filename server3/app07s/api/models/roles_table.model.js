

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  id          : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  tableId     : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  roleId      : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  allowInsert : { type          :  pDB.Sequelize.INTEGER }
             ,  allowUpdate : { type          :  pDB.Sequelize.INTEGER }
             ,  allowDelete : { type          :  pDB.Sequelize.INTEGER }
             ,  createdAt   : { type          :  pDB.Sequelize.STRING }
             ,  updatedAt   : { type          :  pDB.Sequelize.STRING }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'id'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
