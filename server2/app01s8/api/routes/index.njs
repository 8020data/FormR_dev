// -------------------------------------------------------------------------------------
     
       var  FormR       =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs`   ) 
            FormR.init(  __dirname,  __filename ); // FORMR.help()  

//          FormR.setEnv( )                                                             // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)

// -------------------------------------------------------------------------------------

        var pRouter     =  require( 'express').Router()                                 // .(10405.03.1 RAM Beg Create an index script for multiple DB routes)

             pRouter.use(   require( '../routes/world.routes.njs' ) )                 

     module.exports     =  pRouter                                                      // .(10405.03.1 End)

// -------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------

            nDoTests            =  1   // shoRoutes

        if (doTest( 1, __filename )) {

            FormR.shoRoutes( module.exports )
            }

//          ------------------------------------------------------
