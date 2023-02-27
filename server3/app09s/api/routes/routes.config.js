
       var  pTableRoutes =
              { 'default'    :
                  { 'http.post    /api/${aTable}/'     : 'default_controller.createOne '       // Create a new table record
                  , 'http.get     /api/${aTable}/'     : 'default_controller.getdAll   '       // Retrieve all table records
                  , 'http.get     /api/${aTable}/:id'  : 'default_controller.getdOne   '       // Update a table record with id
                  , 'http.get     /api/${aTable}/:ids' : 'default_controller.getdMany  '       // Update a table record with id
                  , 'http.put     /api/${aTable}/:id'  : 'default_controller.updateOne '       // Delete a table record with id
                  , 'http.delete  /api/${aTable}/:id'  : 'default_controller.deleteOne '       // Delete all table records
                  , 'http.delete  /api/${aTable}/:ids' : 'default_controller.deleteMany'       // Delete all table records with id = ids
                  , 'http.delete  /api/${aTable}/'     : 'default_controller.deleteAll '       // Retrieve all published table records
                     }
              , 'users'      :
                  { 'http.post    /api/users/   '      : 'user_controller.create '             // Create a new user record
                  , 'http.get     /api/users/   '      : 'user_controller.findAll'             // Retrieve all user records
                  , 'http.get     /api/users-roles/:id': 'role_controller.findRoles'           // Retrieve all roles for user with id
                  , 'http.get     /api/users/:id'      : 'user_controller.findOne'             // Update a user record with id
                  , 'http.put     /api/users/:id'      : 'user_controller.update '             // Delete a user record with id
                  , 'http.delete  /api/users/:id'      : 'user_controller.delete '             // Delete all user records
                     }
              , 'tutorials'  :
                  { 'http.get     /api/tutorials/published' : 'tutorial_controller.findAllPublished'
                     }
                 }
// -----------------------------------------------------------------------------
/*
   function getRoutes( aTable ) {

        var pRoutes   = { ...pTableRoutes[ 'default' ], ...pTableRoutes[ aTable ] }

            pRoutes   =  Object.keys( pRoutes ).sort().reduce( function( pRoute, aRoute ) {
//          pRoutes   =  Object.keys( pRoutes ).sort().reduce( ( pRoute, aRoute ) => {
                              pRoute[( aRoute + '                   ').substr( 0, 25 )] = pRoutes[ aRoute ];
                                return pRoute;
                              }, { } );
     return pRoutes
            } */

   function getRoutes( aTable ) {
        var pRoutes =  pTableRoutes[ 'default' ]; pDefaultRoutes = { }
            Object.keys( pRoutes ).forEach( aKey => {
                aNewKey = aKey.replace( /\$\{aTable\}/, aTable )
                pDefaultRoutes[ aNewKey ] = pRoutes[ aKey ]
                } )
     return getUnqKeys( pDefaultRoutes, pTableRoutes[ aTable ], 40 )
//   return getUnqKeys( pTableRoutes[ 'default' ], pTableRoutes[ aTable ], 40 )
            }
// -----------------------------------------------------------------------------

     module.exports   =  getRoutes

// -----------------------------------------------------------------------------

if ('test' == 'text') { 

     console.log( "Users:\n",     getRoutes( 'users'     ) )
     console.log( "Tutorials:\n", getRoutes( 'tutorials' ) )
     console.log( "Whatever:\n",  getRoutes( 'whatever'  ) )
     }
/*
// tutorials

  'http.delete  /           ': 'controller.deleteAll',
  'http.delete  /:id        ': 'controller.deleteOne',
  'http.get     /           ': 'controller.getdAll  ',
  'http.get     /:id        ': 'controller.getdOne  ',
  'http.get     /published  ': 'controller.findAllPublished',
  'http.post    /           ': 'controller.createOne',
  'http.put     /:id        ': 'controller.updateOne'




//    users
[{
  'http.delete  /           ': 'controller.deleteAll',
  'http.delete  /:id        ': 'controller.delete ',
  'http.get     /           ': 'controller.findAll',
  'http.get     /:id        ': 'controller.findOne',
  'http.post    /           ': 'controller.create ',
  'http.put     /:id        ': 'controller.update '
}]

*/


   function getUnqKeys(  pObjs1,    pObjs2, nWdt ) {
        var pObjs = { ...pObjs1, ...pObjs2 }; nWdt = nWdt ? nWdt : 25

//   return Object.keys( pObjs ).sort().reduce( function( pObj, aKey ) {
     return Object.keys( pObjs ).reduce( function( pObj, aKey ) {
//          mRoutes   =  Object.keys( pObjs ).sort().reduce( ( pObj, aKey ) => {
                              pObj[ ( aKey + '                   ').substr( 0, nWdt ) ] = pObjs[ aKey ];
                               return pObj;
            }, { } );
            }