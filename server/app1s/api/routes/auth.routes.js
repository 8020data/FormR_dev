const { verifySignUp } = require( "../middleware" );
const   authUsers      = require( "../controllers/auth.controller" );

module.exports = function( app ) {

  app.use( function( req, res, next ) {

    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      );
    next();  // [authJwt.verifyToken]
    } );

  app.post( "/api/auth/signup", [ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], authUsers.signup );
  app.post( "/api/auth/signin",                                                                                 authUsers.signin );
  };
