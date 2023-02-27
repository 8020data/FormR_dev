import axios from "axios";
 
//nst API_URL = "http://localhost:8080/api/auth/";                         //#.(01015.01.1
//nst API_URL =  process.env.API_URL + '/api/auth/'                        //#.(01015.01.1 RAM get from .ENV file.  Wrong! this is running in the client, not node)
//nst API_URL = '/api/auth/'                                               //#.(01015.01.4 RAM Use relative/absolute path).(01015.01.6)
//nst API_URL = 'http://localhost:50315/api/auth/'                         //#.(01015.01.6 RAM Hard code it)
const API_URL =  process.env.REACT_APP_API_URL + '/api/auth/'              // .(01108.02.1 RAM get from .ENV file. Using REACT_APP special prefix)

class AuthService {

//  constructor() {
//     const API_URL =  process.env.REACT_APP_API_URL + '/api/auth/'       // undefined, but it is in App,js
//     const API_URL =  this.state.API_URL + '/api/auth/' ;                // undefined, I guess App,js hasn't been run yet 
//     }
     
  login(      username, password ) {

//   const API_URL = this.state.API_URL + '/api/auth/' ;

     return   axios
      .post(  API_URL + 'signin', { username, password })

      .then(  response  => {
        if (  response.data.accessToken ) {
              localStorage.setItem( 'user', JSON.stringify( response.data ) );
              }
       return response.data;
              } );
       }

  logout( ) { localStorage.removeItem( 'user' ); }

  register(   username, email, password ) {

//   const API_URL = this.state.API_URL + '/api/auth/' ;

     return   axios
      .post(  API_URL + 'signup', { username, email, password } );
        }

  getCurrentUser() {
     return   JSON.parse( localStorage.getItem( 'user' ) );
        }
     }

export default new AuthService();
