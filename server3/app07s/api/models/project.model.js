

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  projectId   : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  name        : { type          :  pDB.Sequelize.STRING }
             ,  client      : { type          :  pDB.Sequelize.STRING }
             ,  clientWeb   : { type          :  pDB.Sequelize.STRING }
             ,  projectWeb  : { type          :  pDB.Sequelize.STRING }
             ,  location    : { type          :  pDB.Sequelize.STRING }
             ,  projectType : { type          :  pDB.Sequelize.STRING }
             ,  industry    : { type          :  pDB.Sequelize.STRING }
             ,  description : { type          :  pDB.Sequelize.STRING }
             ,  createdAt   : { type          :  pDB.Sequelize.STRING }
             ,  updatedAt   : { type          :  pDB.Sequelize.STRING }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'projectId'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
