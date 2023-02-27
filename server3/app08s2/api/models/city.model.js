

        var pModel = 
         { "ModelName": 'city'
         , "TableName": 'city'
         , "Schema"   :
             { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)' , 'OtherParms()' ]
             , "ID"          :[ 'int'         , 'ID'              , 'id'          , 'R10'        , 'NOT NULL INCREMENT PRIMARY KEY' ]
             , "Name"        :[ 'char(35)'    , 'Name'            , 'text'        , 'L35'        , 'NOT NULL' ]
             , "CountryCode" :[ 'char(3)'     , 'CountryCode'     , 'text'        , 'L03'        , 'NOT NULL' ]
             , "District"    :[ 'char(20)'    , 'District'        , 'text'        , 'L20'        , 'NOT NULL' ]
             , "Population"  :[ 'int'         , 'Population'      , 'number'      , 'R10'        , 'NOT NULL' ]
            }   }

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  ID          : { type          :  pDB.Sequelize.INTEGER
                              , primaryKey    :  true
                              , autoIncrement :  true
                                }
             ,  Name        : { type          :  pDB.Sequelize.STRING }
             ,  CountryCode : { type          :  pDB.Sequelize.STRING }
             ,  District    : { type          :  pDB.Sequelize.STRING }
             ,  Population  : { type          :  pDB.Sequelize.INTEGER }
                }
        var pOptions        = { freezeTableName: true                                   // .(10415.01.1 Prevent pural table name)
                              , timestamps     : false                                  // .(10415.02.1)
                                }                                                   
        var pModel          =   pDB.sequelize.define( aTable, pSchema, pOptions );      // .(10415.01.2) 
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'ID'
            pModel.ToSearch =  'Name'                                                   // .(10418.03.6)
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
