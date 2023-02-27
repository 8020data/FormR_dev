

        var pModel = 
         { "ModelName": 'country'
         , "TableName": 'country'
         , "Schema"   :
             { "ColName(12)"   :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)' , 'OtherParms()' ]
             , "Code"          :[ 'char(3)'     , 'ID'              , 'text'        , 'L03'        , 'NOT NULL PRIMARY KEY' ]  // .(10326.04.1 RAMChanged Label to ID.  Can we do this?)
             , "Name"          :[ 'char(52)'    , 'Name'            , 'text'        , 'L52'        , 'NOT NULL' ]
             , "Continent"     :[ 'enum(13)'    , 'Continent'       , 'text'        , 'L13'        , 'NOT NULL' ]
             , "Region"        :[ 'char(26)'    , 'Region'          , 'text'        , 'L26'        , 'NOT NULL' ]
             , "SurfaceArea"   :[ 'float'       , 'SurfaceArea'     , 'decimal'     , 'R20.null .' , 'NOT NULL' ]
             , "IndepYear"     :[ 'smallint'    , 'IndepYear'       , 'number'      , 'R05 ##,##0' , '' ]
             , "Population"    :[ 'int'         , 'Population'      , 'number'      , 'R10'        , 'NOT NULL' ]
             , "LifeExpectancy":[ 'float'       , 'LifeExpectancy'  , 'decimal'     , 'R20.null .' , '' ]
             , "GNP"           :[ 'float'       , 'GNP'             , 'decimal'     , 'R20.null .' , '' ]
             , "GNPOld"        :[ 'float'       , 'GNPOld'          , 'decimal'     , 'R20.null .' , '' ]
             , "LocalName"     :[ 'char(45)'    , 'LocalName'       , 'text'        , 'L45'        , 'NOT NULL' ]
             , "GovernmentForm":[ 'char(45)'    , 'GovernmentForm'  , 'text'        , 'L45'        , 'NOT NULL' ]
             , "HeadOfState"   :[ 'char(60)'    , 'HeadOfState'     , 'text'        , 'L60'        , '' ]
             , "Capital"       :[ 'int'         , 'Capital'         , 'number'      , 'R10'        , '' ]
             , "Code2"         :[ 'char(2)'     , 'Code2'           , 'text'        , 'L02'        , 'NOT NULL' ]
            }   }

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  Code        : { type          :  pDB.Sequelize.STRING }
             ,  Name        : { type          :  pDB.Sequelize.STRING }
             ,  Continent   : { type          :  pDB.Sequelize.STRING }
             ,  Region      : { type          :  pDB.Sequelize.STRING }
             ,  SurfaceArea : { type          :  pDB.Sequelize.STRING }
             ,  IndepYear   : { type          :  pDB.Sequelize.INTEGER }
             ,  Population  : { type          :  pDB.Sequelize.INTEGER }
             ,  LifeExpectan: { type          :  pDB.Sequelize.STRING }
             ,  GNP         : { type          :  pDB.Sequelize.STRING }
             ,  GNPOld      : { type          :  pDB.Sequelize.STRING }
             ,  LocalName   : { type          :  pDB.Sequelize.STRING }
             ,  GovernmentFo: { type          :  pDB.Sequelize.STRING }
             ,  HeadOfState : { type          :  pDB.Sequelize.STRING }
             ,  Capital     : { type          :  pDB.Sequelize.INTEGER }
             ,  Code2       : { type          :  pDB.Sequelize.STRING }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'Code'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
