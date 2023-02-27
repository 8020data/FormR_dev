//      --------------------------------------------------------------------------------------------------

      if (__filename == process.mainModule.filename) {                                            // .(10317.04.8 RAM Globals are set in Route.njs)
            FORMRs_3        =    `${ process.env.FORMR_HOME }/_3/FR.FNSs/`                           // .(10317.01.1 RAM FormR's Home) 
            jstUtils  = require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts2.3.njs` )          // .(10228.11.1 RAM Add global utility fns).(10314.02.1 RAM If global you can use anywhere while debugging)
            FORMRs_4           = `${ APP_HOME.replace( /[\\/]app[0-9]+[sc]/i, '' ) }/_4/FR.fns02s/` // .(10317.01.1 RAM Server's Home if dynamically assigned) 
            APP_HOME           = `${ jstUtils.setEnv( __dirname ) }/app08s`                    // .(10319.06.1 RAM Necessary when run in FORMRs_4)
//          APP_HOME           = `${ jstUtils.setEnv(  FORMRs_4 ) }/app08s`                    // .(10319.06.1 RAM Necessary when run in FORMRs_4)
//                                   jstUtils.setEnv(  )                                       //#.(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
                                     trace( 'setProjectName', 'FormR'  )
            }
//      --------------------------------------------------------------------------------------------------

     var  { getControllers } =  require( `${APP_HOME}/api/Controllers/_controller.fns.njs`  ).fns
     var  { getAppRoutes   } =  require( `${APP_HOME}/api/Routes/_route.fns.njs`            ).fns

// -----------------------------------------------------------------------------------------

   const    setHeader = function( req, res, next ) {                                         // .(10227.05.2 Beg RAM Moved to be a function)
            res.header(
                'Access-Control-Allow-Headers',
                'x-access-token, Origin, Content-Type, Accept'
                 );
            next();  // [authJwt.verifyToken]
            };                                                                               // .(10227.05.2 End)
// --------------------------------------------------------------

                            trace(  "module.exports" )

     module.exports      =  getAuthRoutes()                                                  // .(10313.01.1)

// --------------------------------------------------------------

   function getAuthRoutes(  ) { trace( )                                                     // .(10313.01.2 Beg RAM Return pRouter for pApp.use( pRouter ))

        var pRouter   =     require( 'express').Router()                                     // .(10313.01.3)

            pRouter.use(    setHeader )

//          --------------------------------------------------------------------------------

// const    pControllers     =  require( '../controllers/auth.controllers.njs' ).Controllers;// .(10227.04.1 RAM)
   const    pAuthControllers =  require( `${FORMRs_4}/FMR_auth.controllers.njs` );           // .(10319.05.1)

            pTableRoutes     =  {}                                                           // .(10319.05.x RAM Create new set of pTableRoutes
            pTableRoutes     =  getControllers( pAuthControllers )                           // .(10319.05.5)

//          pRouter.use(        getAppRoutes( getControllers( pAuthControllers ) ) )         //#.(10319.05.5)

            delete pTableRoutes.auth['http.post    /api/auth/register/             ' ]       // .(10313.03.2 RAM We don't want to set auth.routes again)
            delete pTableRoutes.auth['http.post    /api/auth/login/                ' ]       // .(10313.03.3)

//          --------------------------------------------------------------------------------

   const    pUserControllers =  require( `${FORMRs_4}/FMR_user.controllers.njs` );           // .(10319.05.2)
// const    pRoleControllers =  require( `${FORMRs_4}/FMR_role.controllers.njs` );           // .(10319.05.3)

//          pTableRoutes     =  {}                                                           // .(10319.05.x RAM Add more routes to pTableRoutes)
            pTableRoutes     =  getControllers( pUserControllers )                           // .(10319.05.4)
//          pTableRoutes     =  getControllers( pRoleControllers )                           // .(10319.05.6)
            
//          pRouter.use(        getAppRoutes( getControllers( pUserControllers ) ) )         //#.(10319.05.4)

//          --------------------------------------------------------------------------------

            pRouter.use(        getAppRoutes(   pTableRoutes ) )                             // .(10319.05.7)

//          --------------------------------------------------------------------------------

   const    verifySignUp     =  require( `${APP_HOME}/api/Middleware/verifySignUp.js`  );    // .(10227.03.1 RAM)

            pRouter.post( '/api/auth/register', [ verifySignUp.checkDuplicateUsernameOrEmail
                                                , verifySignUp.checkRolesExisted ]
                                              ,   pAuthControllers.Controllers.register );   // .(10227.04.1 RAM WAS controller).(10228.12.06).(10319.05.8 RAM Just the one controller)

            pRouter.post( '/api/auth/login'   ,   pAuthControllers.Controllers.login    );   // .(10228.12.07).(10319.05.9) 

//          --------------------------------------------------------------------------------

     return pRouter
            };                                                                               // .(10313.01.2 End)
// -------------------------------------------------------------------------------------------------

          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

            shoRoutes( module.exports )
            }
//    ---   ------------------------------------------------------------------

