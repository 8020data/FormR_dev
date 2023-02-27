// --------------------------------------------------------------------------------------------------------

       var  FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs`   ) 
            FormR.init(  __dirname,  __filename ); // FORMR.help()  

//          FormR.setEnv( )                                                                                 // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
//      --------------------------------------------------------------------------------------------------

        var aTable          =  'world/cities'
        var aModel          =  'city'

        var aFName          =  `${aModel}.controllers`
        var aPrimaryCol     =  'ID'                                                                         // .(10326.03.17)

        var pConfig         = { ControllersFilename: __filename }
            pConfig.Cmd     =  'use default controllers'

        var pModel          =  require( '../models/index.js' )[ aModel ]

        var Op              =  require( 'sequelize' ).Op;

//      --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                  Method      Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/${aTable}/model/           ' : [ '      I', 'getModel            ' ]
               , 'http.post    /api/${aTable}/createOne/       ' : [ '      I', 'createOne           ' ]    // .(10326.02.1 RAM Make sure it has the same route as the _default route)
                  }
//      --------------------------------------------------------------------------------------------------

        var pControllers    = { controller1 : {}

//          ----------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( `${aModel}.model` )
        var pModel          =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) // .(10311.06.1 RAM ).(10316.04.1 RAM Use APP_HOME instead of APP_DIR)
                               res.json( JSON.parse( pModel ) )
                } // eof getModel`
//          ------------------------------------------------------------------

          , createOne       :  function createOne( req, res ) { trace( ` ${req.body.username}` )            // .(10315.12.1 Beg RAM Added)

       if (!req.body[ aPrimaryCol ]) {                                                                      //  Validate request
                               res.status(400).send( { message: "Primary column, ${aPrimaryCol}, can not be empty!" } );
            return
            }
      const pData           =                                                                               //  Create one
             {  ID          :  req.body.id
             ,  name        :  req.body.name
             ,  CountryCode :  req.body.countrycode
             ,  District    :  req.body.district
             ,  Population  :  req.body.population
                };

            pModel.create( pData )
     .then( pData => {
                               res.send( pData ); })
    .catch( pErr  => {
                               res.status(500).send( { message: pErr.message || "Some error occurred while creating the user." } ); } )
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
