      const Router             =  require( 'express' ).Router(  );
      const getRoutes          =  require( `./routes.config.js` );                     // .(10109.02.1 RAM Added)

   function setRoutes( app, aTable, aControllerFile ) {                                // .(10106.02.2 RAM Use for any table)

      const Default_controller =  require( `../controllers/default.controller.js` );   // .(10109.02.2 RAM Use Default Controller methods)
      const Table_controller   =  require( `../controllers/${aControllerFile}`    );   // .(10106.02.3 RAM Was: users = )

        var pRoutes            =  getRoutes( aTable )

            Object.keys( pRoutes ).forEach( aKey => {
              aMethod          =  aKey.replace( / .+$/, '' ).replace( /https?./i, '' )
              aRoute           =  aKey.replace( /^.+ /, '' ).replace( / /,        '' )

              setRoute(  aMethod, aRoute, pRoutes [ aKey ] )
              } )
            app.use(     aTable,  Router );
            }
//          ---------------------------------------------------------------------------

       module.exports  =  setRoutes

//     setRoutes( { use: ( ) => { } }, 'users', 'users.controller.js' )

// ------------------------------------------------------------------------------------------

   function setRoute( aMethod, aRoute, aController ) {
            console.log( `  setRoute[28]  ${aMethod} ${aRoute} ${aController}` )

        var mController       =  aController.split( '.' )
        var aControllerFile   =  mController[0].replace( /_/, '.' ) + '.controller.js'

       switch ( mController[0] ) {
          case 'default_controller'    :  pController = Default_Controller; break;
          case `${aTable}_controller`  :  pController = Table_Controller  ; break;
          default                      :  pController = require( `../controllers/${aControllerFile}`)
          }
//        -----------------------------------------------------------------------------

      var pController   =  pController[ mController[1] ]

       switch ( aMethod ) {
          case 'get'    :  Router.get(    aRoute, pController ); break;
          case 'post'   :  Router.post(   aRoute, pController ); break;
          case 'put'    :  Router.put(    aRoute, pController ); break;
          case 'delete' :  Router.delete( aRoute, pController ); break;
          case 'patch'  :  Router.patch(  aRoute, pController ); break;
          default       :  Router.get(    aRoute, pController )
          }
//        -----------------------------------------------------------------------------
      } // eof setRoute
// ------------------------------------------------------------------------------------------


/*
           Router.post(   '/',          controller.create           ); // Create a new table record
           Router.get(    '/',          controller.findAll          ); // Retrieve all table records
           Router.get(    '/:id',       controller.findOne          ); // Update a table record with id
           Router.put(    '/:id',       controller.update           ); // Delete a table record with id
           Router.delete( '/:id',       controller.delete           ); // Delete all table records
           Router.delete( '/',          controller.deleteAll        ); // Retrieve all published table records

       if (aTable == "tutorials') {
           mRoutes = router.get(    '/published', controller.findAllPublished ); // Retrieve a table record with id
           }


Users:
 {
  'http.delete  /api/users/                ': 'default_controller.deleteAll ',
  'http.delete  /api/users/:id             ': 'user_controller.delete ',
  'http.delete  /api/users/:ids            ': 'default_controller.deleteMany',
  'http.get     /api/users-roles/:id       ': 'role_controller.findRoles',
  'http.get     /api/users/                ': 'user_controller.findAll',
  'http.get     /api/users/:id             ': 'user_controller.findOne',
  'http.get     /api/users/:ids            ': 'default_controller.getdMany  ',
  'http.post    /api/users/                ': 'user_controller.create ',
  'http.put     /api/users/:id             ': 'user_controller.update '
}
Tutorials:
 {
  'http.delete  /api/tutorials/            ': 'default_controller.deleteAll ',
  'http.delete  /api/tutorials/:id         ': 'default_controller.deleteOne ',
  'http.delete  /api/tutorials/:ids        ': 'default_controller.deleteMany',
  'http.get     /api/tutorials/            ': 'default_controller.getdAll   ',
  'http.get     /api/tutorials/:id         ': 'default_controller.getdOne   ',
  'http.get     /api/tutorials/:ids        ': 'default_controller.getdMany  ',
  'http.get     /api/tutorials/published   ': 'tutorial_controller.findAllPublished',
  'http.post    /api/tutorials/            ': 'default_controller.createOne ',
  'http.put     /api/tutorials/:id         ': 'default_controller.updateOne '
}
Whatever:
 {
  'http.delete  /api/whatever/             ': 'default_controller.deleteAll ',
  'http.delete  /api/whatever/:id          ': 'default_controller.deleteOne ',
  'http.delete  /api/whatever/:ids         ': 'default_controller.deleteMany',
  'http.get     /api/whatever/             ': 'default_controller.getdAll   ',
  'http.get     /api/whatever/:id          ': 'default_controller.getdOne   ',
  'http.get     /api/whatever/:ids         ': 'default_controller.getdMany  ',
  'http.post    /api/whatever/             ': 'default_controller.createOne ',
  'http.put     /api/whatever/:id          ': 'default_controller.updateOne '
}

*/