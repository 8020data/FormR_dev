// --------------------------------------------------------------------------------------------------------

      if (__filename == process.mainModule.filename) {                                                      // .(10317.04.8 RAM Globals are set in Route.njs)
            FORMRs_3            = `${ process.env.FORMR_HOME }/_3/FR.FNSs/`                                    // .(10317.01.1 RAM FormR's Home) 
            jstUtils  =  require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts2.3.njs` )                   // .(10228.11.1 RAM Add global utility fns).(10314.02.1 RAM If global you can use anywhere while debugging)
            FORMRs_4            = `${ APP_HOME.replace( /[\\/]app[0-9]+[sc][0-9]*/i, '' ) }/_4/FR.fns02s/`       // .(10317.01.1 RAM Server's Home if dynamically assigned).(10327.02.1 RAM Allow for trailing no: e.g. app08s1)
                                 if ( APP_HOME.match(   /_4/ ) ) {                                          // .(10331.02.1 RAM Will we ever get it right)
            FORMRs_4            = `${ APP_HOME.replace( /_4[\\\/]FR.app02s/, '_4/FR.fns02s/' ) }` }                   // .(10331.02.2)
            APP_HOME_API        = `${ APP_HOME}/api`; DB_DIR = ''                                           // .(10329.05.7 RAM Ok, Let's prepare for api/DBSN/.. path)          
          
//                                    jstUtils.setEnv(  )                                                   //#.(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
                                      trace( 'setProjectName', 'FormR'  )
            }
// --------------------------------------------------------------------------------------------------

      var   jwt                 =  require( 'jsonwebtoken' );
      var   bcrypt              =  require( 'bcryptjs'     );

//  const   config              =  require("../config/auth.config");                                        //#.(10227.03.2)
//    var   aSecret             = 'bezkoder-secret-key'                                                     // .(10227.03.2).(10317.01.1)
      var   aJWTkey             =  require( `${FORMRs_3}JWT_Config1-0.njs`).Key                             // .(10317.01.2)

//          bQuiet              =  true

      if (! process.env.DBSN) {
            process.env.DBSN    = 'MySQL_AWS_IO' }

// --------------------------------------------------------------------------------------------------

           AUTH                 = 'auth'                                                                    // .(10330.08.1 RAM Should it 'auth' or 'formr'?)
      var  aTable               =  AUTH                                                                     // .(10329.02.1 RAM Was 'auth').(10330.08.2)
      var  aModel               = 'frauth'                                                                  // .(10329.02.2).(10330.08.3).(10331.06.1 RAM I like frauth, today)

      var  aFName               = `${aModel}.controller`
      var  aPrimaryCol          = 'name'

      var  pConfig              = { ControllersFilename: __filename }                                       // .(10318.09.10 RAM Oops gotta have it now)
           pConfig.Cmd          = 'replace default controllers'

//    var   User                =  require( '../models/user.model.js' )( db, 'Users' );                     //#.(10228.03.1 RAM Was: db.user).(10310.01.2)
//    var   Role                =  require( '../models/role.model.js' )( db, 'Roles' );                     //#.(10228.03.1 RAM Was: db.user).(10310.01.3)
//    var   User                =  require( '../models/index.js' ).user;                                    //#.(10228.03.1 RAM Was: db.user).(10310.01.2)
//    var   Role                =  require( '../models/index.js' ).role;                                    //#.(10228.03.2).(10310.01.3)

//    var   db                  =  require( `${APP_HOME}/api/models/index.js` );                            //#.(10310.01.1 RAM db needs to be passed to the models).(10310.01.1).(10319.06.2)
//    var   db                  =  require( `${FORMR_4}/FR.fns02s/FMR_UserModel1-0.js` );                        //#.(10310.01.1 RAM db needs to be passed to the models).(10310.01.1).(10319.06.2).(10326.07.x RAM This wouldn't even get Roles model)
//    var   db                  =  require( `${FORMR_4}/FormR/models/index.js` );                           // .(10326.07.x RAM Yet another place for it)
      var   db                  =  require( '../models/index.js' );                                         // .(10328.06.6 RAM Back to normal app)

      var   User                =  db.fruser;                                                               //#.(10228.03.1 RAM Was: db.user).(10310.01.2).(10326.07.x RAM And 'fr...' are the actual FormR model names)
      var   Role                =  db.frrole;                                                               // .(10228.03.2).(10310.01.3).(10326.07.x)

//    var   Op                  =  require( '../models/index.js' ).Sequelize.Op;                            //#.(10228.03.3 RAM Was: db.Sequelize.Op).(10310.01.4)
      var   Op                  =  db.Sequelize.Op;                                                         // .(10228.03.3 RAM Was: db.Sequelize.Op).(10310.01.4)

// --------------------------------------------------------------------------------------------------

      var  pRoutes   =  // {         aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                        Method      Route                                 Roles      Controller
//                      -----------  --------------------------------       -------    --------------------
                     { 'http.post    /api/${aTable}/register/        ' : [ '      E', 'register            ' ]  // .(10228.12.1).(10305.03.1 RAM S.B http.post, not get)
                     , 'http.post    /api/${aTable}/login/           ' : [ '      E', 'login               ' ]  // .(10228.12.2).(10305.03.2)
                     , 'http.get     /api/${aTable}/session/         ' : [ '      E', 'session             ' ]  // .(10312.10.1 RAM Let's add it here)
                     , 'http.get     /api/${aTable}/test/            ' : [ '      E', 'controller1         ' ]  // .(10312.11.2 RAM Let's test Controller1)
                        }
// --------------------------------------------------------------------------------------------------

   var pControllers = { 

  controller1 : function( req, res ) { trace( `         req.body` )                     // .(10312.11.1 Beg RAM Create Controller template)

            res.status(  200 ).send(  "Controller1's response" ); return                // Simplest response

     pModel.findAll( )                                                                  // Response after call to database
           .then(  function onSuccess( pRecs )  { trace(  "Controller1 succeeded." )
            res.status(  200 ).json( { pRecs } );
                  } )
           .catch( function onFailure( pErr  )  { trace(  "Controller1 failed."    )                       
            res.status(  500 ).send( { message: pErr.message, err: pErr } );
            } );
     }  // eof controller1( req, res ) { ... }                                          // .(10312.11.1 End) 
//   -----------------------------------------------------------------------------------------

, register  : function( req, res ) { trace( `          ${req.body.username}` )          // .(10228.12.3)

//   var addDate  = function( n, d )  { return fmtDate( 6, new Date( d.setDate( d.getDate() + n ) ) ).substr( 0, 10 ) }
     var addDate  = function( n, d )  { return  fmtDate( 6, d, n ).substr( 0, 10 ) }    // .(10314.06.1 RAM Use fmtDate)

     var pNewUser =
          {  username    :  req.body.username
          ,  email       :  req.body.email
//        ,  roles       :  req.body.roles    
          ,  active      :  req.body.active ? req.body.active : 'yes'                    // .(10314.04.1 RAM Added)             
          ,  role        :  req.body.role   ? req.body.role   : 'user'                   // .(10312.05.1 RAM Added)
          ,  passworddate:  addDate( 90 )                                                // .(10314.06.2) 
          ,  password    :  bcrypt.hashSync(  req.body.password, 8 )
             } 

 User.create( pNewUser )  

     .then( function onAddUser( user ) {                                                // .(10228.04.4 RAM Get rid of anonymous function)

     if (req.body.roles) {

         Role.findAll( { where: { name: { [Op.or]: req.body.roles } } } )

             .then( roles => { user.setRoles( roles )                                   // .(10312.06.1 RAM This Sequilize method stores each role in {req.body.roles} into the related tables 'user_roles')
                                   .then( function setRole( ) {                         // .(10228.04.4 RAM Get rid of anonymous function)
                           var aRoles =  roles.map( ( aRole, i ) => roles[i].name ).join( ',' )        // .(10311.05.5 Beg RAM SAve list of roles)
                           var aMsg   = `              User registered successfully for role(s): ${ aRoles }!` 
                               res.send( { message: aMsg } ); trace( aMsg ); } ); } );  // .(10228.05.x RAM user roles).(10311.05.5 End)

     } else {  //              user.setRoles( [ 1 ]  )                                  //#.(10312.06.1 RAM Not sure how [ 1 ] sets a non-existant role for the new user)
               //                  .then( function setRole1( ) {                        //#.(10228.04.4 RAM Get rid of anonymous function).(10312.06.2)
                           var aMsg   = `              User registered successfully for role: ${ pNewUser.role }!` // .(10312.06.3 RAM Was: .roles[0])
                               res.send( { message: aMsg } ); trace( aMsg );      
               //              } );                                                     // .(10228.05.x RAM user role[1]).(10311.05.5 End)
//                             trace( "User registered successfully!" )                        //#.(10228.05.x RAM user role = 1).(10311.05.6)
//                             res.send( { message: "User registered successfully!" } ); } );  //#.(10311.05.6)
              }
        } )
    .catch( err => {           
                               trace(  "                Registration failed!\n" + err.message ) // .(10228.05.x)
            res.status(  500 ).send({ message: err.message } ); } );

     } // eom register( req, res ) { ... }
//   ------------------------------------------------------------------------------------------


//   ------------------------------------------------------------------------------------------

, login   : function( req, res )    { trace( `   ${req.body.username}` )          // .(10228.12.4)

    User.findOne( { where: { username: req.body.username } } )

    .then( function chkUser( user ) {                                                   // .(10228.04.4 RAM Get rid of anonymous function)

        if (!user) {           trace(  "              User Not found." )                // .(10228.05.x)
                               return res.status(404).send( { message: "User Not found." } ); }

          var passwordIsValid  = bcrypt.compareSync( req.body.password, user.password );
         if (!passwordIsValid) {
                               trace(  "              Invalid Password." )              // .(10228.05.x)
                               return res.status(401).send( { accessToken: null, message: "Invalid Password!" } ); }

//        var token = jwt.sign( { id: user.id }, config.secret, { expiresIn: 86400 } )  //#.(10227.03.3 RAM 86400 = 24 hours)
          var token = jwt.sign( { id: user.id },       aJWTkey, { expiresIn: 86400 } )  // .(10227.03.3 RAM Was: config.secret, 86400 = 24 hours).(10317.01.1 Was aSecret)

          var authorities = [], aRoles = ""                                             // .(10311.05.4)   
              user.getRoles( ).then( function setRoles( roles ) {                       // .(10228.04.4 RAM Get rid of anonymous function)
//                               var aRoles = roles.join( ",")                          //#.(10311.05.3 RAM roles is a array of sequelize objects)                                        
         for (let  i = 0;  i < roles.length;  i++) {
                                          aRoles = `${aRoles},${roles[i].name}`         // .(10311.05.5)   
              authorities.push( "ROLE_" + roles[i].name.toUpperCase() );
              }
//                                    var aRoles =  user.getRoles().join( ",")          //#.(10311.05.1 RAM user.getRoles() is a promise not an array)                                        
                               trace(  `              Login successful for roles: '${aRoles.substr(1)}'.` )   // .(10228.05.x).(10311.05.2)

          var pData =                                                                   // .(10312.01.1 RAM Need to see it when debugging)
               {  id           : user.id
               ,  username     : user.username
               ,  email        : user.email
//             ,  password     : user.password                                          // .(10312.01.1 RAM Don't send this)
               ,  active       : user.active                                            // .(10311.08.1 Add fields for Bruce)
               ,  group        : user.group                                             // .(10312.02.1 RAM Added) 
               ,  role         : user.role                                              // .(10311.08.1 Add fields for Bruce)
               ,  user_roles   : authorities
               ,  passworddate : user.passworddate                                      // .(10311.08.2)
               ,  createdAt    : String(user.createdAt)                                 // .(10311.08.3 string violation: createdAt cannot be an array or an object,
               ,  updatedAt    : String(user.updatedAt)                                 // .(10311.08.4 string violation: updatedAt cannot be an array or an object,)
               ,  accessToken  : token
                  };

              res.status( 200 ).send( pData ) 

          } ); // user.getRoles(        ).then( roles => { ... } )
        } )    // User.findOne( { ... } ).then( user  => { ... } )

    .catch( err => {           trace(  "Login failed." )                                // .(10228.05.x)
                               res.status( 500 ).send( { message: err.message } );
            } );

     }  // eof login( req, res ) { ... }
//   ------------------------------------------------------------------------------------------

, session : function( req, res ) { trace( `       req.headers.x-access-token` )         // .(10312.12.1 Beg RAM)

       var  aToken = req.headers[ 'x-access-token']
       var  pToken = verify( aToken )

        if (pToken.err) {      trace( "       Invalid token" )                                 
            res.status(  500 ).send(   pToken.err     )
                               return 
            }

        if (pToken.id) {                             
//     var  User  =  require( '../models/index.js' ).user

       User.findByPk( pToken.id )
           .then( function chkUserSession( pUser ) {   
            var aRole       =  pUser.role
            var aUsername   =  pUser.username               
            var aMsg        = `              This session is validated for ${aUsername} with ${aRole} privileges.`                                
                               trace( aMsg )
            res.status(  200 ).send(  aMsg )
                               return
                               } )
           .catch( err => {    trace( "Session failed." )                              
            res.status(  500 ).send( { message: "Session failed", err: err } );
                               return
                               } );
            } // eif pToken.id
     } // eof session( req, res ) { ... }
//   ------------------------------------------------------------------------------------------
   } // eoo pControllers
// --------------------------------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
//           ,  ControllerFileName : __filename                           //#.(10301.03.3)
//           ,  Options     : { Cmd: 'replace'                            //#.(10301.03.3)
             ,  Options     :   pConfig                                   // .(10301.03.3)
                }

                        trace(  "\nmodule.exports" )

// --------------------------------------------------------------------------------------------------------

   function verify( aToken, onVerify ) {

        var jwt     =  require( 'jsonwebtoken' )
        var aSecret = 'bezkoder-secret-key' 
      try {
        var pToken  =  jwt.verify( aToken, aSecret )            
   } catch( pErr ) { 
        var pToken  = { message: 'BAD Token', err: pErr } 
            }
    return pToken 

//          ---------------------------------------------------------            

//          jwt.verify( aToken, aSecret, onVerify )     // asyncronously 

   function onVerify( pErr, pDecodedToken ) { 
            console.log( pErr ? { msg: 'BAD Token', err: pErr } : pDecodedToken );
            }
//          ---------------------------------------------------------            
            }
 // --------------------------------------------------------------------------------------------------------





// --------------------------------------------------------------------------------------------------------

     nDoTests = 1

 if (doTest( 1, __filename )) {
  
//   var  { getControllers } =  require( `${APP_HOME}/api/Controllers/_controller.fns.njs`  ).fns
//   var  { getAppRoutes   } =  require( `${APP_HOME}/api/Routes/_route.fns.njs`            ).fns
     var  { getControllers } =  require( `${FORMRs_4}/controller.fns.njs`  ).fns                  // .(10327.04.9 RAM Moved)
     var  { getAppRoutes   } =  require( `${FORMRs_4}/route.fns.njs`       ).fns                  // .(10327.04.10 RAM Moved)

            pTableRoutes     =  getControllers( module.exports, 'showem' )
               shoRoutes(       getAppRoutes(   pTableRoutes ) )
      }
//    --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
