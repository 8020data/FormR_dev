// const  { authJwt } = require( "../middleware" );             //#.(10227.03.2 RAM)
   const    authJwt       = require( '../middleware/authJwt.js' );  // .(10227.03.2 RAM)

// const    controller    = require( "../controllers/user.controller"      );                //#.(10227.04.3 RAM)
// const    controller    = require( '../controllers/user.controller'      ).controllers;    //#.(10227.04.3 RAM)
   const    pControllers  = require( '../controllers/user.controllers.njs' ).Controllers;    // .(10227.04.3 RAM)

   const    setHeader = function( req, res, next ) {                                         // .(10227.05.1 Beg RAM Moved to be a function)
            res.header(
                'Access-Control-Allow-Headers',
                'x-access-token, Origin, Content-Type, Accept'
                 );
            next();  // [authJwt.verifyToken]
            };                                                                               // .(10227.05.1 End)

                        trace(  "module.exports" )
    module.exports    = setUserRoutes 

   function setUserRoutes( app ) { trace( ) 

            app.use(  setHeader )                                                            // .(10227.05.3)

            app.get( "/api/test/all",                                               pControllers.allAccess      );  // .(10227.04.4 Beg RAM Was controller.)
            app.get( "/api/test/user",   [authJwt.verifyToken],                     pControllers.userBoard      );
            app.get( "/api/test/editor", [authJwt.verifyToken, authJwt.isEditor],   pControllers.editorBoard    );  // .(10228.03.6 RAM Was: isModerator and pControllers.moderatorBoard)
            app.get( "/api/test/admin",  [authJwt.verifyToken, authJwt.isAdmin],    pControllers.adminBoard     );
            };
// -------------------------------------------------------------------------------------------------
