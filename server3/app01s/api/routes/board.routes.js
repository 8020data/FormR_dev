const { authJwt } = require( "../middleware" );
const testUsers   = require( "../controllers/board.controller" );

module.exports    = function( app ) {

  app.use( function( req, res, next ) {

    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
       );

    next();
    });

  app.get( "/api/test/all",                                               testUsers.allAccess      );
  app.get( "/api/test/user",  [authJwt.verifyToken],                      testUsers.userBoard      );
  app.get( "/api/test/mod",   [authJwt.verifyToken, authJwt.isModerator], testUsers.moderatorBoard );
  app.get( "/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],     testUsers.adminBoard     );

};
