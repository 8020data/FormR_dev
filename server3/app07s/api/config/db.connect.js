   const    dbConfig  =  require( './db.config.js' );          // .(10314.07.1 RAM Call the old way)
// const    dbConfig  =  require( './db.config.js' )( '' );    //#.(10314.07.1 RAM Old version wasn't a function)

   const    Sequelize =  require( 'sequelize' );

//          -----------------------------------------------------------------

     var    dbOptions =
             {  host               :   dbConfig.HOST
             ,  dialect            :   dbConfig.dialect

//           ,  operatorsAliases   :   false

             ,  logging            :   console.log
//           ,  logging            :   function( str ) { console.log(str) }, // do your own logging
//           ,  logging            :   function( str ) { a = str }

             , pool:
                {  max             :   dbConfig.pool.max
                ,  min             :   dbConfig.pool.min
                ,  acquire         :   dbConfig.pool.acquire
                ,  idle            :   dbConfig.pool.idle
                   }
                }
//          -----------------------------------------------------------------

       if ( dbConfig.dialectOptions) {
            dbOptions.dialectOptions = dbConfig.dialectOptions
            }
//          -----------------------------------------------------------------

        var sequelize              =   new Sequelize(
                dbConfig.DB
             ,  dbConfig.USER
             ,  dbConfig.PASSWORD
             ,  dbOptions
                )
   // ------------------------------------------------------------------------------------------

   module.exports                  =  
//       {  Sequelize              :  Sequelize                    //#.(10110.01.4)
         {  sequelize              :  sequelize                    // .(10110.01.4)
            }
