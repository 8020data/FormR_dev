

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  id          : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  name        : { type          :  pDB.Sequelize.STRING }
             ,  title       : { type          :  pDB.Sequelize.STRING }
             ,  group       : { type          :  pDB.Sequelize.STRING }
             ,  description : { type          :  pDB.Sequelize.STRING }
             ,  enabled     : { type          :  pDB.Sequelize.INTEGER }
             ,  url         : { type          :  pDB.Sequelize.STRING }
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
