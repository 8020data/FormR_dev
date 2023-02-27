

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  id          : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  title       : { type          :  pDB.Sequelize.STRING }
             ,  description : { type          :  pDB.Sequelize.STRING }
             ,  published   : { type          :  pDB.Sequelize.INTEGER }
             ,  createdAt   : { type          :  pDB.Sequelize.STRING }
             ,  updatedAt   : { type          :  pDB.Sequelize.STRING }
             ,  LastUpdated : { type          :  pDB.Sequelize.STRING }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'id'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
