const jwt    = require( 'jsonwebtoken' );
const config = require( '../config/auth.config.js' );
const db     = require( '../models' );
const User   = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
        return res.status(403).send( { message: "No token provided!" } );
  }

  jwt.verify(token, config.secret, (err, decoded) => {

    if (err) {
        return res.status(401).send( { message: "Unauthorized!" } );
        }
    req.userId = decoded.id;
    next();   // isModerator and/or isAdmin 

    });
};

isAdmin = ( req, res, next ) => {

  User.findByPk(req.userId).then( user => {            // SQL Query: findByPk UserId:   promise.then( function( user ) { ... } )

    user.getRoles().then(roles => {                    // SQL Query: getRoles for user: promise.then( function( roles ) { ... } )

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toLowerCase() === "admin") {                          // .(01015.01.1 BT)
          next();                                                               // .(01015.01.2 RAM Pass middleware test) 
          return;
        }
      }
      res.status(403).send( { message: "Require Admin Role!" } );               // .(01015.01.3 RAM Fail middleware test) 
      return;
    });
  });
};

isModerator = ( req, res, next ) => {

  User.findByPk( req.userId ).then( user => {

    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toString().toLowerCase() === "moderator") {           // .(01015.01.2 BT)
          next();                 // User is a moderator 
          return;
          }
        }
      console.log( `Error: req.userId(${req.userId}) is not a moderator` )      
      res.status(403).send( { message: "Require Moderator Role!" } );

    });  // user.getRoles().then( roles => { ... }
  });  // User.findByPk( req.userId ).then( user => { ... }
};   // isModerator = ( req, res, next ) => { ... }

isModeratorOrAdmin = (req, res, next) => {

  User.findByPk(req.userId).then(user => {

    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toLowerCase() === "moderator") {                      // .(01015.01.3 BT)
          next();
          return;
        }
        if (roles[i].name.toLowerCase() === "admin") {                          // .(01015.01.4 BT)
          next();
          return;
        }
      }
      res.status(403).send( { message: "Require Moderator or Admin Role!" } );
    });
  });
};

const authJwt = 
  { verifyToken       : verifyToken
  , isAdmin           : isAdmin
  , isModerator       : isModerator
  , isModeratorOrAdmin: isModeratorOrAdmin
    };

module.exports = authJwt;
