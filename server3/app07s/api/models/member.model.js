

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  MemberID    : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  MemberNo    : { type          :  pDB.Sequelize.INTEGER }
             ,  TitleName   : { type          :  pDB.Sequelize.STRING }
             ,  FirstName   : { type          :  pDB.Sequelize.STRING }
             ,  Middlename  : { type          :  pDB.Sequelize.STRING }
             ,  LastName    : { type          :  pDB.Sequelize.STRING }
             ,  PostName    : { type          :  pDB.Sequelize.STRING }
             ,  Company     : { type          :  pDB.Sequelize.STRING }
             ,  Address1    : { type          :  pDB.Sequelize.STRING }
             ,  Address2    : { type          :  pDB.Sequelize.STRING }
             ,  City        : { type          :  pDB.Sequelize.STRING }
             ,  State       : { type          :  pDB.Sequelize.STRING }
             ,  Zip         : { type          :  pDB.Sequelize.STRING }
             ,  Country     : { type          :  pDB.Sequelize.STRING }
             ,  Phone1      : { type          :  pDB.Sequelize.STRING }
             ,  Phone2      : { type          :  pDB.Sequelize.STRING }
             ,  Fax         : { type          :  pDB.Sequelize.STRING }
             ,  WebSite     : { type          :  pDB.Sequelize.STRING }
             ,  Email       : { type          :  pDB.Sequelize.STRING }
             ,  Skills      : { type          :  pDB.Sequelize.STRING }
             ,  Active      : { type          :  pDB.Sequelize.STRING }
             ,  Bio         : { type          :  pDB.Sequelize.STRING }
             ,  createdAt   : { type          :  pDB.Sequelize.STRING }
             ,  updatedAt   : { type          :  pDB.Sequelize.STRING }
             ,  LastUpdated : { type          :  pDB.Sequelize.STRING }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'MemberID'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
