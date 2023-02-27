

        var pModel = 
         { "ModelName": 'countrylanguage'
         , "TableName": 'countrylanguage'
         , "Schema"   :
             { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)' , 'OtherParms()' ]
             , "CountryCode" :[ 'char(3)'     , 'CountryCode'     , 'text'        , 'L03'        , 'NOT NULL PRIMARY KEY' ]
             , "Language"    :[ 'char(30)'    , 'Language'        , 'text'        , 'L30'        , 'NOT NULL PRIMARY KEY' ]
             , "IsOfficial"  :[ 'enum(1)'     , 'IsOfficial'      , 'text'        , 'L01'        , 'NOT NULL' ]
             , "Percentage"  :[ 'float'       , 'Percentage'      , 'decimal'     , 'R20.null .' , 'NOT NULL' ]
            }   }

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  CountryCode : { type          :  pDB.Sequelize.STRING }
             ,  Language    : { type          :  pDB.Sequelize.STRING }
             ,  IsOfficial  : { type          :  pDB.Sequelize.STRING }
             ,  Percentage  : { type          :  pDB.Sequelize.STRING }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'Language'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
