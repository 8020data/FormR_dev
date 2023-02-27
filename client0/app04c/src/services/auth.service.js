import axios from "axios";

//nst API_URL = "http://localhost:8080/api/auth/";                         //#.(01015.01.1
//nst API_URL =  process.env.API_URL + '/api/auth/'                        //#.(01015.01.1 RAM get from .ENV file.  Wrong! this is running in the client, not node)
//nst API_URL = '/api/auth/'                                               //#.(01015.01.4 RAM Use relative/absolute path).(01015.01.6)
const API_URL = 'http://localhost:50331/api/auth/'                         // .(01015.01.6 RAM Hard code it)

class AuthService {

  login(      username, password ) {

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
     return   axios
      .post(  API_URL + 'signup', { username, email, password } );
        }

  getCurrentUser() {
     return   JSON.parse( localStorage.getItem( 'user' ) );
        }
     }

export default new AuthService();
