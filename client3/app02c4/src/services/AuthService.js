import axios from "axios";
 
const API_URL =  process.env.REACT_APP_API_URL + '/api/auth/'              // .(01108.02.1 RAM get from .ENV file. Using REACT_APP special prefix)

class AuthService {
     
  login(      username, password ) {

     return   axios
      .post(  API_URL + 'login', { username, password })                   // .(10228.12.7 RAM Changed signin to login)

      .then(  response  => {
        if (  response.data.accessToken ) {
              localStorage.setItem( 'user', JSON.stringify( response.data ) );
              }
       return response.data;
              } );
       }

  logout( ) { localStorage.removeItem( 'user' ); }

  register(   username, email, password ) {

     return   axios
      .post(  API_URL + 'register', { username, email, password } );       // .(10228.12.7 RAM Changed signup to register)
        }

  getCurrentUser() {
     return   JSON.parse( localStorage.getItem( 'user' ) );
        }
     }

export default new AuthService();
