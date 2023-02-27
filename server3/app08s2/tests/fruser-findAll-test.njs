       var  FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs`   ) 
            FormR.init( __dirname, __filename ); // FORMR.help()  

//       ----------  =   --------------------------------------------------------

       var  aRoute          = '/api/formr/users'
       var  aHost           = `http://localhost:50416`
       
       var  aData           = '?filter={}&range=[0,9]&sort=["id","ASC"]'
       var  aToken          = '' 

//          jstFns.sndAPI(    'GET', `${aHost}${aRoute}`, aData, aToken, onComplete )
            jstFns.sndAPI(    'GET', `${aHost}${aRoute}`, aData )
//          jstFns.sndAPI(    'GET', `${aHost}${aRoute}`  )

  function  onComplete(  pError, pData, aURL ) {
       var  bBefore   =  aURL  ? true : false, bAfter = ! bBefore

        if (bBefore                 ) { console.log( " Request URL:\n     " +       aURL               ) }
        if (bBefore && pError       ) { console.log( " Request Headers:"  + fmtObj( pError,        6 ) ) }
        if (bBefore && pData        ) { console.log( " Request Data:"     + fmtObj( pData ,        6 ) ) }

        if (bAfter  && pError       ) { console.log( " Response Error:"   + fmtObj( pError,        6 ) ) }
        if (bAfter  && pData.body   ) { console.log( ` Response Body (${ pData.body.length }):${ fmtObj( pData.body[0], 6 ) }`) }
        if (bAfter  && pData.headers) { console.log( " Response Headers:" + fmtObj( pData.headers, 6 ) ) }
            }
// ----- ----------  =    ---------------------------------------------------------

