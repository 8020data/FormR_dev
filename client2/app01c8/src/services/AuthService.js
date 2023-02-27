import axios from "axios";
import bcrypt from "bcryptjs"

const API_URL =  process.env.REACT_APP_API_URL + "/api/";   // .(01108.02.1 RAM get from .ENV file. Using REACT_APP special prefix)
const aSalt   = '$2a$04$qy3HhHlVJT/wUB364EVjmu'             // .(10416.04.1 RAM Need this for bcrypt.hash to match)
                
class AuthService {

//  -----------------------------------------------------------------------------

  login( username, password ) {
    password =  bcrypt.hashSync( password, aSalt )          // .(10416.04.4 RAM Was , 8) 

    return axios
      .post(API_URL + "auth/login", { username, password }) // .(10228.12.7 RAM Changed signin to login)

      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
    }
//  -----------------------------------------------------------------------------

  logout() {
    localStorage.removeItem("user");
    }
//  -----------------------------------------------------------------------------

  register(username, email, password) {

    password =  bcrypt.hashSync( password, aSalt )          // .(10416.04.5 RAM Was , 8) 

    return axios.post(API_URL + "auth/register", { username, email, password }); // .(10228.12.7 RAM Changed signup to register)
    }
//  -----------------------------------------------------------------------------

// bt note - if no password change should we have updateCurrentUserNoPassword() ???
  updateCurrentUser(id, username, email, password) {

    password =  bcrypt.hashSync( password, aSalt )                            // .(10416.04.6 RAM Was , 8) 

    var data = {};

    if (username) { data.username = username }
    if (email   ) { data.email    = email }
    if (password) { data.password = password }

    return axios.put( API_URL + `formr/users/${id}`, data);                   // .(10420.02.1RAM Isn't this returning a promote???)

    } //eof updateCurrentUser 
//  -----------------------------------------------------------------------------

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
//  -----------------------------------------------------------------------------

//async  getCurrentUserFromServer( ) {                                        //#.(10419.01.9 RAM async here no workie)
         getCurrentUserFromServer( ) {                                        // .(10419.01.9 Beg RAM Added)
                  
//       return   callAPI( ) 
//async  function callAPI( ) { 

    var  aUser      =  localStorage.getItem( "user" )                         // .(10424.08.1 RAM Keep it safe)    
    var  aToken     =  aUser ? JSON.parse( aUser ).accessToken : ''           // .(10424.08.2)     
    if (!aToken) { 
         return { message: "No token in localStorage"};
        }
    var  pHeaders = { 'cache-control'  : 'no-cache'
//                  , 'content-type'   : 'application/json' 
                    , 'x-access-token' :  aToken
                       }                  
    var  pHTTP =  
      { 'method'    : 'GET'
      , 'url'       : `${API_URL}auth/session/`
      , 'headers'   :  pHeaders
//    , 'params'    : 
  //      { 'search':'parameter' }
         } // eoo pHTTP  
         
//  var  mPromise   =  async axios( pHTTP ) 
    var  mPromise   =  axios( pHTTP ) 
        .then (  function( response )  { onSuccess( response.data ) } )       // ,(10424.08.3 RAM Hope this is ok)
//      .then (          ( response ) => onSuccess( response )   ) 
//      .then (                          onSuccess               ) 
        .catch(          ( error    ) => onFailure( error    )   )

  return mPromise                                                             // .(10424.01.5 RAM Promise is returned immediately)   

function onSuccess( pData ) {                                                 // .(10424.01.5 RAM Promise is "Settled" or "Resolved". But how is it returned)   

     if (pData.accessToken) {
         localStorage.setItem( 'user', JSON.stringify( pData ) );
         console.log( `getCurrentUserFromServer[ 96]  Received data for user ${ pData.id }.` ) 
         return 'Success'
     } else {
                                                                              // .(10424.01.6 RAM Bad data returned )  
    var  aMsg  = "Error: Didn't receive a token from server"  
    var  aUser =  localStorage.getItem( "user" )                              // .(10424.08.1 RAM Keep it safe)    
    var  pUser =  aUser ? JSON.parse( aUser ) : { id: null, role: '' }        // .(10424.01.1 RAM Catastropic if JSON.parse( localStorage.getItem('user') ) fails)              
         pUser.message = aMsg                                                 
         localStorage.setItem( 'user', JSON.stringify( pUser ) );             // .(10424.08.4 RAM Leave currentUser in localStorage)
         console.log( `getCurrentUserFromServer[105]  ${aMsg}` ) 
         return 'Failure: No token'
         }    }

function onFailure( pError ) {                                                // .(10424.01.7 RAM Promise is "Rejected". But how is error msg returned)  
    var  aMsg = "Error: No response from server"  
    var  aUser =  localStorage.getItem( "user" )                              // .(10424.08.1 RAM Keep it safe)    
    var  pUser =  aUser ? JSON.parse( aUser ) : { id: null, role: '' }        // .(10424.01.1 RAM Catastropic if JSON.parse( localStorage.getItem('user') ) fails)              
         pUser.message = aMsg                                                 
         localStorage.setItem( 'user', JSON.stringify( pUser ) );             // .(10424.08.4 RAM currentUser is probably not in localStorage)
         console.log( `getCurrentUserFromServer[115]  ${aMsg}` ) 
         console.log(  pError )
         return 'Failure: Bad API call'
         }         

// return  'it does matter since it will be returned before all the API data is received from the server'
//       } // eof callAPI

    } // eof getCurrentUserFromServer                               // .(10419.01.9 End) 
//  -----------------------------------------------------------------------------

}

export default new AuthService();
