   const   jwt     =  require( 'jsonwebtoken' );
// const   db      =  require( '../models' );
   const   User    =  require( '../models/index.js' ).user;  
// const   config  =  require( '../config/auth.config.js' );                   // .(10227.03.1 RAM Just contains aSecret)
   const   aSecret = 'bezkoder-secret-key'                                     // .(10227.03.2)

// ----------------------------------------------------------------

// verifyToken =         ( req, res, next ) => { ... }
   verifyToken = function( req, res, next )    { 

      let token = req.headers[ 'x-access-token' ];

     if (!token) {        trace(  "No token provided!" )                // .(10227.09.1 RAM)
   return res.status(403).send( { message: "No token provided!" } );
          }

//        jwt.verify( token, aSecret, (err, decoded) => {                 //  .(10227.03.2 RAM Was: config.secret)
          jwt.verify( token, aSecret, function onVerify( err, decoded ) { //  .(10228.04.1 RAM Get rid of anonymous function) 

      if (err) {          trace(  "Authorized Error" )                  // .(10227.09.2)
   return res.status(401).send( { message: "Unauthorized!" } );
          }
          req.userId   =  decoded.id;
                          trace(  `Authorized UserId: ${req.userId}` )  // .(10227.09.3)
          next( );   // isEditor and/or isAdmin 
          } );
        };
// ----------------------------------------------------------------

isAdmin = ( req, res, next ) => { trace()

//          User.findByPk( req.userId ).then( user => {                   //#.(SQL Query: findByPk UserId:   promise.then( function( user ) { ... } )
            User.findByPk( req.userId ).then( function chkUser( user ) {  // .(10228.04.2 RAM Get rid of anonymous function) 

//          user.getRoles().then( roles => {                              //#.(SQL Query: getRoles for user: promise.then( function( roles ) { ... } ).(10228.04.3) 
            user.getRoles().then( function chkRole( roles ) {             // .(10228.04.3 RAM Get rid of anonymous function) 

       for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toLowerCase() === "admin") {                    // .(01015.01.1 BT)
                          trace(  "Authorized" )                        // .(10228.01.2 RAM)
            next();                                                       // .(01015.01.2 RAM Pass middleware test) 
            return;
            }
          }   
                          trace(  "User is not an Admin!" )             // .(10228.01.3 RAM)
            res.status(403).send( { message: "User is not an Admin!" } ); // .(01015.01.3 RAM Fail middleware test) 
            return;
            } );
          } );
       };
// ----------------------------------------------------------------

isEditor = ( req, res, next ) => {                                        // .(10228.03.2 RAM Was: isModerator)

//User.findByPk( req.userId ).then( user => { ... }                       //#.(10228.04.3) 
  User.findByPk( req.userId ).then( function chkUser( user ) {            // .(10228.04.3) 

//  user.getRoles().then( roles => {                                      //#.(SQL Query: getRoles for user: promise.then( function( roles ) { ... } ).(10228.04.3) 
    user.getRoles().then( function chkRole( roles ) {                     // .(10228.04.4 RAM Get rid of anonymous function) 
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toString().toLowerCase() === "editor") {        // .(01015.01.2 BT)
                          trace(  "Authorized" )                        // .(10228.01.2 RAM)
          next();                 // User is an editor 
          return;
          }
        }
//    console.log( `Error: req.userId(${req.userId}) is not an Editor!` ) //#.(10228.01.3 RAM)     
                          trace(  "User is not an Editor!" )            // .(10228.01.3 RAM)
      res.status(403).send( { message: "User is not an Editor!" } );

    });  // user.getRoles().then( roles => { ... }
  });  // User.findByPk( req.userId ).then( user => { ... }
};   // isModerator = ( req, res, next ) => { ... }
// ----------------------------------------------------------------

isEditorOrAdmin = (req, res, next) => {                                   // .(10228.03.2 RAM Was: isModeratorOrAdmin)

  User.findByPk( req.userId ).then( function chkUser( user ) {            // .(10228.04.5) 

    user.getRoles().then( function chkRole( roles ) {                     // .(10228.04.7) 
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toLowerCase() === "editor") {                   // .(01015.01.3 BT)
                          trace(  "Authorized" )                        // .(10228.01.2 RAM)
          next();
          return;
        }
        if (roles[i].name.toLowerCase() === "admin") {                    // .(01015.01.4 BT)
                          trace(  "Authorized" )                        // .(10228.01.2 RAM)
          next();
          return;
        }
      }
                          trace(  "User is not an Editor or an Admin!" ) // .(10228.01.3 RAM)
      res.status(403).send( { message: "User is not an Editor or an Admin!" } );
    });
  });
};
// ----------------------------------------------------------------

const authJwt = 
  { verifyToken       : verifyToken
  , isAdmin           : isAdmin
  , isEditor          : isEditor                                           // .(10228.03.4 RAM Was: isModerator)
  , isEditorOrAdmin   : isEditorOrAdmin                                    // .(10228.03.5 RAM Was: isModeratorOrAdmin)
    };


module.exports = authJwt;

// -------------------------------------------------------------------------------------------------
