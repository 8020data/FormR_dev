// --------------------------------------------------------------------------------------------------------

       var  FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs`   ) 
            FormR.init(  __dirname,  __filename ); // FORMR.help()  

//          FormR.setEnv( )                                                                                 // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
//      --------------------------------------------------------------------------------------------------

        var aTable          =  'world/cities'
        var aModel          =  'city'

        var aFName          =  `${aModel}.controllers`
//      var aPrimaryCol     =  'ID'                                                                         // .(10326.03.17)

        var pConfig         = { ControllersFilename: __filename }
            pConfig.Cmd     =  'use default controllers'

        var pModel          =   require( '../models/index.js' )[ aModel ]
  
        var aPrimaryCol     =   pModel && pModel.Primary                                                    // .(10328.01.7 End).(10328.03.2 RAM In case aModel is undefined)
        var aColToSearch    =   pModel && pModel.ToSearch                                                   // .(10418.03.1 RAM Different than PrimaryID Column)

        var Op              =   require( 'sequelize' ).Op;

 //     --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                  Method      Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/${aTable}/model/           ' : [ '      I', 'getModel            ' ]
               , 'http.post    /api/${aTable}/                 ' : [ '      I', 'createOne           ' ]    // .(10326.02.1 RAM Make sure it has the same route as the _default route)
                  }
//      --------------------------------------------------------------------------------------------------

        var pControllers    = { controller1 : {}

//          ----------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( `${aModel}.model` )
        var pModel          =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) // .(10311.06.1 RAM ).(10316.04.1 RAM Use APP_HOME instead of APP_DIR)
                               res.json( JSON.parse( pModel ) )
                } // eof getModel`
//          ------------------------------------------------------------------

          , createOne       :  function createOne( req, res ) { trace( ` ${req.body.Name}` )            // .(10315.12.1 Beg RAM Added)

       if (!req.body[ aColToSearch ]) {                                                                      //  Validate request
                               res.status(400).send( { message: "Primary column, ${aColToSearch}, can not be empty!" } );
            return
            }
      const pBody           =                                                                               //  Create one
//           {  ID          :  req.body.id
             {  Name        :  req.body.Name
             ,  CountryCode :  req.body.CountryCode
             ,  District    :  req.body.District
             ,  Population  :  req.body.Population
                };

            pModel.create( pBody )
     .then( pData => {
                               res.send( pData ); })
    .catch( pErr  => {
                          var  pMsg = { message: ` ** Error occurred while creating a record for table ${aModel}.`, error: fmtObj(pErr).replace( /[\n]/g, '\n  ---' ) }
                               console.log( fmtObj( pMsg ) ); res.status( 500 ).send( pMsg );            // .(10418.06.9 RAM I didn't get the message)
                               } );
             } // eof createOne
//          ------------------------------------------------------------------
        } // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     :   pConfig                                                                     // .(10301.03.3)
                }

                trace(  "\nmodule.exports" )

// --------------------------------------------------------------------------------------------------------

          nDoTests          =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

     var  { getControllers }    =  require( `${FORMRs_4}/controller.fns.njs`  ).fns 
     var  { getAppRoutes   }    =  require( `${FORMRs_4}/route.fns.njs`       ).fns 

            pTableRoutes        =  getControllers( module.exports, 'showem' )
            pRoutes             =  getAppRoutes( pTableRoutes, aTable )                                       // .(10326.01.5 RAM Was setTableRoutes with 'Showem' )
                                   shoRoutes( pRoutes )
            }
//    ---   ------------------------------------------------------------------
