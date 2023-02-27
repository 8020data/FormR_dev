
      FormR              =  require( `${ process.env.FORMR_HOME }/_3/FR.FNSs/FormR.fns.njs` )  
      FormR.init( __dirname, __filename )                                                   // .(10403.05.6 RAM Does it need to run FormR and jstFns again?)

//    FormR.setEnv( )                                                                       // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
// -------------------------------------------------------------------------------------------------

  var dbConnect          =  require( `${FORMRs_4}db.connect3-1.js` )                        // .sequelize// .(10325.04.2 RAM Gotta use FORMRs_4).(10326.02.x).(10328.05.1 RAM We love to change names) 

  var pDB                =  dbConnect( '' )                                                 // .(10220.10.3).(10328.06.4 RAM Back to a normal app)

      pDB.city           =  require( "../models/city.model.js"               )(  pDB,     'city'            )   //#.(10326.03.4 RAM Add World models).(10326.07.x RAM Not in this FormR database)
      pDB.country        =  require( "../models/country.model.js"            )(  pDB,     'country'         )   //#.(10326.03.5).(10326.07.x) 
//    pDB.countrylanguage=  require( "../models/countrylanguage.model.js"    )(  pDB,     'countryLanguage' )   //#.(10326.03.6).(10326.07.x)

// -------------------------------------------------------------------------------------------------

      module.exports     =  pDB;
//                          trace(  '\nmodule.exports' )

// -------------------------------------------------------------------------------------------------

          nDoTests       =  3

      if (doTest( 1, __filename )) {   // format pModel
 
          FormR.Help() 

          FormR.shoModel(  pDB, 'city'    ) 
          FormR.shoModel(  pDB, 'country' ) 
//        FormR.shoModel(  pDB, 'countrylanguage' ) 
                    
//    ------------------------------------------------------------------------
      } // eof Test1 

      if (doTest( 2, __filename )) {   // Check if pDB[ `${aModel} ].authenticate works 
 
      var aModel = 'city'

          pDB[ aModel ].sequelize.authenticate()
   .then( ( )  => {
          console.log( `  Connection to the model, '${aModel}' has been established successfully.` ) 
          } )
  .catch( pErr => {
          console.log( `* Unable to connect to the model, '${aModel}', in the database:`, pErr ) } );

//    ------------------------------------------------------------------------
      } // eof Test2 

      if (doTest( 3, __filename )) {   // Check if pDB[ `${aModel} ].authenticate works 
 
                    testModel_authenticate(  'country', 1 ) 
                    
    async function  testModel_authenticate(   aModel,  pData ) { 
          db_logging( pDB[ aModel ], 'off' )
   try {
    await pDB[ aModel ].sequelize.authenticate()
 } catch( pErr ) {
          console.log( "Unable to connect to the database:", pErr ) }
//      -------------------------------------------          
        } // eof testModel_authenticate
//    ------------------------------------------------------------------------
      } // eof Test3 

      if (doTest( 4, __filename )) {   // Check if pDB[ `${aModel} ].create works 
 
     var aModel = 'city';     aId =  1

                    testModel_getOne(  aModel, aId ) 

//  async function  testModel_getOne(   aModel, aId ) { 
//    var pData = await pDB[ aModel ].findByPk( aId ) 

          function  testModel_getOne(   aModel, aId ) { 
          
                        pDB[ aModel ].findByPk( aId )
   .then( pBody => {
      if (pBody) {
          console.log(  pBody.toJSON( ) ); // This is good!
          console.log(  JSON.stringify( pBody, null, 4 ) ); // This is also good!
      } else { 
          console.log( `* No ${aModel} found for aID, '${aId}'.` ); 
      } } )
  .catch( pErr  => {
          console.log( `* Error retrieving id: '${aId} from model, '${aModel}':`, pErr ); 
          } );          
//      -------------------------------------------          
        } // eof testModel_getOne
//    ------------------------------------------------------------------------
      } // eof Test4 

// -------------------------------------------------------------------------------------------------
     // eof Tests 

