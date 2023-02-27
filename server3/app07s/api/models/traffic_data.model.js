

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  id          : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  impressions : { type          :  pDB.Sequelize.INTEGER }
             ,  clicks      : { type          :  pDB.Sequelize.INTEGER }
             ,  position    : { type          :  pDB.Sequelize.INTEGER }
             ,  created_at  : { type          :  pDB.Sequelize.STRING }
             ,  updated_at  : { type          :  pDB.Sequelize.STRING }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'id'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
