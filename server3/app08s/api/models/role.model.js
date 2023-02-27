 
        var pModel =
         { "ModelName": 'user'
         , "TableName": 'users'
         , "Schema"   :
             { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)'             , 'OtherParms()' ]
             , "id"          :[ 'int'         , 'Id'              , 'id'          , 'R10'                    , 'NOT NULL INCREMENT PRIMARY KEY' ]
             , "name"        :[ 'varchar(255)', 'Name'            , 'text'        , 'L15'                    , '' ]
             , "createdAt"   :[ 'timestamp'   , 'CreatedAt'       , 'timestamp'   , 'R19 yyyy-mm-dd hh:mm:ss', 'NOT NULL' ]
             , "updatedAt"   :[ 'timestamp'   , 'UpdatedAt'       , 'timestamp'   , 'R19 yyyy-mm-dd hh:mm:ss', 'NOT NULL' ]






                }
         , "HelpMessages":
             { "id"          :  "Role Primary Key"
             , "name"        :  "Role Name"
             , "createdAt"   :  "Date Role was Created"
             , "updatedAt"   :  "Date Role was Last Updated"






                }
            }
// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema          =
             {  id           : { type          :  pDB.Sequelize.INTEGER
                               , primaryKey    :  true
                               , autoIncrement :  true
                                 }
             ,  name         : { type          :  pDB.Sequelize.STRING }
             ,  createdAt    : { type          :  pDB.Sequelize.DATE   }
             ,  updatedAt    : { type          :  pDB.Sequelize.DATE   }






                };

        var pModel           =   pDB.sequelize.define( aTable, pSchema )
            pModel.DBSN      =   pDB.sequelize.config.DBSN
            pModel.Primary   =  'id'
     return pModel

            }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel

