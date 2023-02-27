      const db      =  require("../models/index.js");
      const ROLES   =  db.ROLES;
      const User    =  db.fruser;                                               // .(10331.011.2)

checkDuplicateUsernameOrEmail = ( req, res, next ) => { trace()
 
  User.findOne({   // Username
    where: {
      username: req.body.username
    }
  }).then( function onCheckUsernameInUse( user ) {              // .(10228.03.x) 
    if (user) {  trace(  "Failed! Username is already in use!" )
        res.status(400).send( { message: "Failed! Username is already in use!" } );
        return;
        }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then( function onCheckEmailInUse( user ) {              // .(10228.03.x) 
      if (user) { trace(  "Failed! Email is already in use!" )
          res.status(400).send( { message: "Failed! Email is already in use!" } );
          return;
          }
      trace(  "    Success: Username and Email are not already in use!" )
      next();
    });
  });
};

checkRolesExisted = ( req, res, next ) => { trace( )

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
          trace(  `Failed! Role does not exist = ${req.body.roles[i]}!` )
          res.status(400).send( { message: `Failed! Role does not exist = ${req.body.roles[i]}!` } );
          return;
      }
    }
  }
  
      trace(  "  Success: Role exists" )
      next();
};

const verifySignUp = {
      checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
      checkRolesExisted:             checkRolesExisted
      };

module.exports = verifySignUp;

// -------------------------------------------------------------------------------------------------
