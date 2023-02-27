       var  FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs`   ) 
            FormR.init( __dirname, __filename ); // FORMR.help()  

//       ----------  =   --------------------------------------------------------

       var  aRoute          = '/api/world/cities'
       var  aHost           = `http://localhost:50882`
       
       var  aData           = '?filter={}&range=[10,19]&sort=["id","ASC"]'
//     var  pData           =  {           Name: 'Reston1' }  // Case is important
       var  pData           =  { ID: 4082, Name: 'Reston2' }  // Primary Key should not be part of updated data 
       
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`       )
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}/4081`     )
            jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`,      aData )
//          jstFns.sndAPI(    'POST',   `${aHost}${aRoute}`,      pData )
//          jstFns.sndAPI(    'PUT',    `${aHost}${aRoute}/4082`, pData )
//          jstFns.sndAPI(    'DELETE', `${aHost}${aRoute}/4082`  )

// ----- ----------  =    ---------------------------------------------------------

