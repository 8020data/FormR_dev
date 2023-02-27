// const {  verifySignUp } = require( '../middleware' );                                     //#.(10227.03.1 RAM)
   const    verifySignUp   = require( '../middleware/verifySignUp.js'  );                    // .(10227.03.1 RAM) 

// const    controller     = require( '../controllers/auth.controller'      ).;
// const    controller     = require( '../controllers/auth.controller'      ).controllers;
   const    pControllers   = require( '../controllers/auth.controllers.njs' ).Controllers;   // .(10227.04.1 RAM)

// ---------------------------------------------------

   const    setHeader = function( req, res, next ) {                                         // .(10227.05.2 Beg RAM Moved to be a function)
            res.header(
                'Access-Control-Allow-Headers',
                'x-access-token, Origin, Content-Type, Accept'
                 );
            next();  // [authJwt.verifyToken]
            };                                                                               // .(10227.05.2 End)
// ---------------------------------------------------
                        trace(  "module.exports" )
//   module.exports   = setAuthRoutes                                                        // .(10227.05.5 RAM 1st require( this.script ) creates module function, then)_
     module.exports   = getAuthRoutes()                                                      // .(10313.01.1) 
//   module.exports   = getAuthRoutes                                                        // .(10313.01.1) 

// ---------------------------------------------------

   function setAuthRoutes( pApp ) { trace( )                                                  // .(10227.05.5 RAM 2nd the function gets called)

            pApp.use(  setHeader )                                                            // .(10227.05.4)
            pApp.post( '/api/auth/register', [ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], pControllers.register );  // .(10227.04.1 RAM WAS controller).(10228.12.06)
            pApp.post( '/api/auth/login',                                                                                    pControllers.login    );  // .(10228.12.07)
            };
// -------------------------------------------------------------------------------------------------

   function getAuthRoutes( pApp ) { trace( )                                                   // .(10313.01.2 Beg RAM Return pRouter for pApp.use( pRouter ))
//      var pRouter = pApp.router                                                              // .(10313.01.3 RAM v5.0 only) 
        var pRouter = require( 'express').Router()                                             // .(10313.01.3) 

            pRouter.use(  setHeader )                                                       
            pRouter.post( '/api/auth/register', [ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], pControllers.register );  // .(10227.04.1 RAM WAS controller).(10228.12.06)
            pRouter.post( '/api/auth/login',                                                                                    pControllers.login    );  // .(10228.12.07)
     return pRouter 
            };                                                                                // .(10313.01.2 End)
