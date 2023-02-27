     var   jwt      =  require( 'jsonwebtoken' );
     var   bcrypt   =  require( 'bcryptjs'     );

// const   config   =  require( '../config/auth.config' );                      // config.secret = "bezkoder-secret-key"
// const   config   =  require( '../config/auth.config.js' );                   // .(10227.03.1 RAM Just contains aSecret)
   const   aSecret  = 'bezkoder-secret-key'                                     // .(10227.03.2)

//         bQuiet   =  true

     if (! process.env.DBSN) {
           process.env.DBSN = 'MySQL_AWS_IO' }

// const   db       =  require( '../models' );
   const   User     =  require( '../models/index.js' ).user;                    // .(10228.03.1 RAM Was: db.user)
   const   Role     =  require( '../models/index.js' ).role;                    // .(10228.03.2)

   const   Op       =  require( '../models/index.js' ).Sequelize.Op;            // .(10228.03.3 RAM Was: db.Sequelize.Op)

// --------------------------------------------------------------------------------------------------

     var aTable     = 'auth'
     var aModel     = 'auth'
     var aFName     = `${aModel}.controller`

     var pRoutes    =  // {         aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                       Method      Route                                 Roles      Controller
//                     -----------  --------------------------------       -------    --------------------
                    { 'http.get     /api/${aTable}/register/        ' : [ '      E', 'register            ' ]  // .(10228.12.1)
                    , 'http.get     /api/${aTable}/login/           ' : [ '      E', 'login               ' ]  // .(10228.12.2)
                       }
// --------------------------------------------------------------------------------------------------

    var pControllers = { controller1: { }

//          --------------------------------------------------------------------------------------

//  exports.signup =          ( req, res ) => { // Save User to Database
          , register  : function( req, res ) { trace( )                               // .(10228.12.3)

  User.create( {
         username   : req.body.username,
         email      : req.body.email,
         password   : bcrypt.hashSync(req.body.password, 8)
         } )

    .then( function chkUser( user ) {                                                 // .(10228.04.4 RAM Get rid of anonymous function) 

     if (req.body.roles) {

         Role.findAll( { where: { name: { [Op.or]: req.body.roles } } } )

             .then( roles => { user.setRoles( roles ).then( function setRole( ) {      // .(10228.04.4 RAM Get rid of anonymous function) 
                               trace( "User registered successfully!" )                // .(10228.05.x)// user role = 1
                               res.send( { message: "User registered successfully!" } ); } ); } );

     } else {                  trace( "User registered successfully!" )                // .(10228.05.x)// user role = 1
                               user.setRoles( [1] ).then( () => {
                               res.send( { message: "User registered successfully!" } ); } );
              }
        } )
    .catch( err => {           trace( "Registration failed!" )                         // .(10228.05.x)// user role = 1
                               res.status(500).send({ message: err.message } ); } );

     } // eom register( req, res ) { ... }
//   ------------------------------------------------------------------------------------------

//  exports.signin =          ( req, res ) => {  ... }
          , login   : function( req, res )    { trace( )                                // .(10228.12.4)

  User.findOne( { where: { username: req.body.username } } )

      .then( function chkUser( user ) {                                                 // .(10228.04.4 RAM Get rid of anonymous function) 

        if (!user) {  trace(  "User Not found." )                                       // .(10228.05.x)
                      return res.status(404).send( { message: "User Not found." } ); }

          var passwordIsValid  = bcrypt.compareSync( req.body.password, user.password );
         if (!passwordIsValid) { 
                      trace(  "Invalid Password." )                                     // .(10228.05.x)
                      return res.status(401).send( { accessToken: null, message: "Invalid Password!" } ); }

//        var token = jwt.sign( { id: user.id }, config.secret, { expiresIn: 86400 } )  // 24 hours  
          var token = jwt.sign( { id: user.id }, aSecret      , { expiresIn: 86400 } )  // 24 hours  .(10227.03.3 RAM Was: config.secret) 

          var authorities = [];
              user.getRoles( ).then( function setRoles( roles ) {                       // .(10228.04.4 RAM Get rid of anonymous function) 
         for (let i = 0;  i < roles.length; i++) {
              authorities.push( "ROLE_" + roles[i].name.toUpperCase() );
              }
                      trace(  "Login sucessful." )                                    // .(10228.05.x)
              res.status( 200 ).send(
               {  id         : user.id
               ,  username   : user.username
               ,  email      : user.email
               ,  roles      : authorities
               ,  accessToken: token
                  } );

          } ); // user.getRoles(        ).then( roles => { ... } )
        } )    // User.findOne( { ... } ).then( user  => { ... } )

    .catch( err => {  trace(  "Login failed." )                                      // .(10228.05.x)  
            res.status( 500 ).send( { message: err.message } );
            } );

     }  // eof login( req, res ) { ... }
//   ------------------------------------------------------------------------------------------
            }  // eoo pControllers
// --------------------------------------------------------------------------------------------------

                        trace(  "module.exports" )

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  ControllerFileName : __filename
             ,  Options     : { Cmd: 'replace' }
                }
// --------------------------------------------------------------------------------------------------------

     aTests = 1

 if (doTest( 1 )) {

      var { getControllers }  =  require( '../Controllers/_controller.fns.njs'  ).fns
      var { setTableRoutes }  =  require( '../Routes/_route.fns.njs'            ).fns

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable,   'ShowEm' )
            }
//          ---------------

   function doTest( n ) {
        var bCalled = (__filename != process.mainModule.filename)
        if (bCalled || typeof( aTests ) == 'undefined') { aTests = ',,' } else { aTests = ',' + aTests + ','}
     return aTests.match( `,${n},` )
            }   
// --------------------------------------------------------------------------------------------------------
