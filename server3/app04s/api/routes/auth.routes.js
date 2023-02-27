// const {  verifySignUp } = require( '../middleware' );                   //#.(10227.03.1 RAM)
   const    verifySignUp   = require( '../middleware/verifySignUp.js'  );  // .(10227.03.1 RAM) 

// const    controller     = require( '../controllers/auth.controller'       ).;
// const    controller     = require( '../controllers/auth.controller'     ).controllers;
   const    pControllers   = require( '../controllers/auth.controllers.njs' ).Controllers;  // .(10227.04.1 RAM)

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
     module.exports   = setAuthRoutes                                                        // .(10227.05.5 RAM 1st require( this.script ) creates module function, then)_

// ---------------------------------------------------

   function setAuthRoutes( app ) { trace( )                                                  // .(10227.05.5 RAM 2nd the function gets called)

            app.use(  setHeader )                                                            // .(10227.05.4)
            app.post( '/api/auth/register', [ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], pControllers.register );  // .(10227.04.1 RAM WAS controller).(10228.12.06)
            app.post( '/api/auth/login',                                                                                    pControllers.login    );  // .(10228.12.07)
            };
// -------------------------------------------------------------------------------------------------
