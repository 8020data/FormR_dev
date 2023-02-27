                      require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns2.3.njs` ) // .Help()
                        trace( 'setProjectName', 'FormR' )                           // .(10301.01.1 RAM Set project name for parsing function call stack)

     var aHost    =  'http://localhost:50308'

     var aRoute   =  '/api/auth/login'

     var pBody    = { 'username'     : 'robin1',
                      'password'     : '1234',
                       }

     var onResponse =  function( pBody ) {
                           console.log( "Signin Response", fmtObj( pBody ) ); 
                           }


        sendAPI( 'POST', aRoute, pBody, onResponse )

// ----- -------- = -- ------------- : -----------------------------------------

function sendAPI( aMethod, aRoute, pBody, xNext  ) {

     var request  =    require( 'request' );

     var aURL     =    aHost + aRoute

     var pHeaders = { 'postman-token': '26bcfea0-4a96-fcb3-32b9-2e779288d419',
                      'cache-control': 'no-cache',
                      'content-type' : 'application/json' }

     var options  = { 'method'       :  aMethod,
                      'url'          :  aURL,
                      'headers'      :  pHeaders,
                      'body'         :  pBody,
                      'json'         :  true
                       }

         request( options, onComplete )

//       -------- = -- -------------------------
         
function onComplete( pError, pResponse, pBody ) {
     if (pError) { throw new Error( pError ); }
       else     { xNext( pBody ) }
         }        
//       -------- = -- -------------------------
         } // eof sendAPI 
// ----- -------- = -- ------------- : -----------------------------------------

