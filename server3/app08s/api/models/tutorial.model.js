 
        var pModel =
         { "ModelName": 'tutorial'
         , "TableName": 'tutorials'
         , "Schema"   :
             { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)'             , 'OtherParms()' ]
             , "id"          :[ 'int'         , 'Id'              , 'id'          , 'R10'                    , 'NOT NULL INCREMENT PRIMARY KEY' ]
             , "title"       :[ 'varchar(255)', 'Name'            , 'text'        , 'L15'                    , '' ]
             , "description" :[ 'varchar(255)', 'Description'     , 'text'        , 'L150'                   , '' ]
             , "published"   :[ 'int'         , 'Published'       , 'yorn'        , 'L3'                     , '' ]
             , "createdAt"   :[ 'timestamp'   , 'CreatedAt'       , 'timestamp'   , 'R19 yyyy-mm-dd hh:mm:ss', 'NOT NULL' ]
             , "updatedAt"   :[ 'timestamp'   , 'UpdatedAt'       , 'timestamp'   , 'R19 yyyy-mm-dd hh:mm:ss', 'NOT NULL' ]






                }
         , "HelpMessages":
             { "id"          :  "Tutorial Primary Key"
             , "title"       :  "Tutorial Name"
             , "description" :  "Tutorial Description"
             , "name"        :  "Tutorial is Published (Yes/No)"
             , "createdAt"   :  "Date Tutorial was Created"
             , "updatedAt"   :  "Date Tutorial was Last Updated"



                }
            }
// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema          =
             {  id           : { type          :  pDB.Sequelize.INTEGER
                               , primaryKey    :  true
                               , autoIncrement :  true
                                 }
             ,  title        : { type          :  pDB.Sequelize.STRING  }
             ,  description  : { type          :  pDB.Sequelize.STRING  }
             ,  published    : { type          :  pDB.Sequelize.INTEGER }
             ,  createdAt    : { type          :  pDB.Sequelize.DATE    }
             ,  updatedAt    : { type          :  pDB.Sequelize.DATE    }



                };

        var pModel           =   pDB.sequelize.define( aTable, pSchema )
            pModel.DBSN      =   pDB.sequelize.config.DBSN
            pModel.Primary   =  'id'
     return pModel

            }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel

