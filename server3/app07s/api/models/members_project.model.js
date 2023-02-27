

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  id          : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  memberId    : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  projectId   : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  sort        : { type          :  pDB.Sequelize.INTEGER }
             ,  role        : { type          :  pDB.Sequelize.STRING }
             ,  duration    : { type          :  pDB.Sequelize.STRING }
             ,  dates       : { type          :  pDB.Sequelize.STRING }
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
