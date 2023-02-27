// --------------------------------------------------------------------------------------------------------

      if (__filename == process.mainModule.filename) {                                            // .(10317.04.8 RAM Globals are set in Route.njs)
            FORMRs_3        =    `${ process.env.FORMR_HOME }/_3/FR.FNSs/`                           // .(10317.01.1 RAM FormR's Home)
            jstUtils  = require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts2.3.njs` )          // .(10228.11.1 RAM Add global utility fns).(10314.02.1 RAM If global you can use anywhere while debugging)
//          APP_HOME           =     jstUtils.setEnv( __dirname )                                 //#.(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
            FORMRs_4           = `${ APP_HOME.replace( /[\\/]app[0-9]+[sc]/i, '' ) }/_4/FR.fns02s/`    // .(10317.01.1 RAM Server's Home if dynamically assigned)
                                     jstUtils.setEnv(           )                                 // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
                                     trace( 'setProjectName', 'FormR'  )
            }
//      --------------------------------------------------------------------------------------------------

        var pFns            =   require( '../routes/_route.fns.njs' ).fns

//      --------------------------------------------------------------------------------------------------


        var aTable          =  'tutorials'
        var aModel          =  'tutorial'

        var aFName          =  `${aModel}.controllers`
        var aPrimaryCol     =  'title'                                                             // .(10325.03.x RAM Critical)

        var pConfig         = { ControllersFilename: __filename }
            pConfig.Cmd     =  'replace default controllers'

        var pModel          =  require( '../models/index.js' )[ aModel ]                           // gets sequelize for aModel








        var Op              =  require( 'sequelize' ).Op;

//      --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                  Method      Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/${aTable}/model/           ' : [ '      I', 'getModel            ' ]
               , 'http.get     /api/${aTable}/                 ' : [ '      I', 'findAll             ' ]    // .(10314.08.1 RAM Add Controllera for React-Admin)
               , 'http.get     /api/${aTable}/:id              ' : [ '      I', 'findOne             ' ]    // .(10314.08.3)
               , 'http.post    /api/${aTable}/                 ' : [ '      I', 'createOne           ' ]    // .(10314.08.3)
               , 'http.put     /api/${aTable}/:id              ' : [ '      I', 'updateOne           ' ]    // .(10314.08.5)
               , 'http.delete  /api/${aTable}/:id              ' : [ '      I', 'deleteOne           ' ]    // .(10314.08.7)
               , 'http.delete  /api/${aTable}/:id              ' : [ '      I', 'deleteAll           ' ]    // .(10325.03.1)
               , 'http.get     /api/${aTable}/findallpublished ' : [ '      I', 'findAllPublished    ' ]    // .(10325.03.2)
               
                  }
//      --------------------------------------------------------------------------------------------------










//      --------------------------------------------------------------------------------------------------

        var pControllers    = { controller1 : {}

//          ----------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( `${aModel}.model` )
        var pModel          =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) // .(10311.06.1 RAM ).(10316.04.1 RAM Use APP_HOME instead of APP_DIR)
                               res.json( JSON.parse( pModel ) )
                } // eof `${aFName}.getModel`
//          ------------------------------------------------------------------

//                             exports.create   = ( req, res ) => {                                     // Create and Save a new Tutorial
          , createOne       :  function createOne ( req, res )    { trace( `${aModel}.createOne` )      // Create and Save a new Tutorial

          if (!req.body.title) {                                                                        // Validate request
                               res.status(400).send( { message: "Content can not be empty!" });
               return;
               }
         const tutorial      =                                                                          // Create a Tutorial
                { title      : req.body.title
                , description: req.body.description
                , published  : req.body.published ? req.body.published : false
                  };

          pModel.create(       tutorial )                                                               // Save Tutorial in the database

            .then( data  => {
                               res.send(data); })
            .catch(  err => {
                               res.status(500).send( { message: err.message || "Some error occurred while creating the Tutorial." } ); } );

             } // eof createOne
        // --------------------------------------------------------------------------------------

//                             exports.findAll = ( req, res ) => {                                      // Retrieve all Tutorials from the database.
          , findAll         :  function findAll  ( req, res )    { trace( `${aModel}.findAll` )         // Retrieve all Tutorials from the database.

          const title       =  req.query.title;
            var condition   =  title ? { title: { [Op.like]: `%${title}%` } } : null;

          pModel.findAll( {    where: condition  } )

            .then( data  => {
                               res.send( data ); } )
            .catch( err  => {
                               res.status(500).send( { message: err.message || "Some error occurred while retrieving tutorials." } ); } );

             } // eof findAll
        // --------------------------------------------------------------------------------------

//                             exports.findOne = ( req, res ) => {                                      // Find a single Tutorial with an id
          , findOne         :  function findOne  ( req, res )    { trace( `${aModel}.findOne` )         // Find a single Tutorial with an id

          const id          =  req.params.id;

          pModel.findByPk(     id )

            .then( data  => {
                               res.send(data); } )
            .catch( err  => {
                               res.status(500).send( { message: "Error retrieving Tutorial with id=" + id } ); } );

             } // eof findOne
        // --------------------------------------------------------------------------------------

//                             exports.update  = ( req, res ) => {                                      // Update a Tutorial by the id in the request
          , updateOne       :  function updateOne( req, res )    { trace( `${aModel}.updateOne` )       // Update a Tutorial by the id in the request

          const id          =  req.params.id;

          pModel.update(       req.body, { where: { id: id } } )

            .then( num   => { if (num == 1) {
                               res.send( { message: "Tutorial was updated successfully."
                               } );
              } else {
                               res.send( { message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`} );
                               }    } )
            .catch( err  => {
                               res.status(500).send( { message: "Error updating Tutorial with id=" + id } ); } );

             } // eof updateOne
        // --------------------------------------------------------------------------------------

//                             exports.delete  = ( req, res ) => {                                      // Delete a Tutorial with the specified id in the request
          , deleteOne       :  function deleteOne( req, res )    { trace( `${aModel}.deleteOne` )       // Delete a Tutorial with the specified id in the request

          const id          =  req.params.id;

          pModel.destroy(   {  where: { id: id } } )

            .then( num   => { if (num == 1) {
                               res.send({ message: "Tutorial was deleted successfully!" } );
              } else {
                               res.send({ message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!` } );
                  } } )
            .catch( err  => {
                              res.status(500).send({ message: "Could not delete Tutorial with id=" + id } ); } );

             } // eof deleteOne
        // ------------------------------------------------------------------------------------

//                             exports.deleteAll=( req, res ) => {                                      // Delete all Tutorials from the database.
          , deleteAll       :  function deleteAll( req, res )    { trace( `${aModel}.deleteAll` )       // Delete all Tutorials from the database.

                               res.send( { message: `Tutorials would be deleted successfully!` });
                               process.exit()

          pModel.destroy(   {  where: { }, truncate: false } )

            .then( nums  => {
                               res            .send( { message: `${nums} Tutorials were deleted successfully!` });
              } )
            .catch( err  => {
                               res.status(500).send( { message:  err.message || "Some error occurred while removing all tutorials."  } ); } );

             } // eof deleteAll
        // ------------------------------------------------------------------------------------


//                             exports.findAllPublished = ( req, res ) => {                                       // find all published Tutorial
          , findAllPublished:  function findAllPublished  ( req, res )    { trace( `${aModel}.findAllPublished` ) // find all published Tutorial

          pModel.findAll(   {  where: { published: true } })

            .then(  data => {
                               res.send( data ); } )
            .catch( err  => {
                               res.status(500).send( { message: err.message || "Some error occurred while retrieving tutorials." } );} );

             } // eof findAllPublished
        // ------------------------------------------------------------------------------------

//    Action Controller Sample
//    -----------------------------------------------------------------------------------------

          , action          :  function action( req, res ) {                                                         // .(10314.08.9 RAM Add Action Controller for React-Admin)

        var id              =  req.params.id;

            pModel.findByPk( id )

     .then( pData  => {
                               res.send( pData ); } )
    .catch( pErr   => {
                               res.status(500).send( { message: `Error retrieving id: ${id}` } ); } );
            } // eof action
        // ------------------------------------------------------------------------------------

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     :   pConfig                                   // .(10301.03.3)
                }

                trace(  "\nmodule.exports" )

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

      var { getControllers }  =  require( '../Controllers/_controller.fns.njs'  ).fns
      var { setTableRoutes }  =  require( '../Routes/_route.fns.njs'            ).fns

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable, 'ShowEm' )
            }
//    ---   ------------------------------------------------------------------
