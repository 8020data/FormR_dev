import axios from 'axios';
import authHeader from './auth-header';

//nst API_URL = 'http://localhost:8080/api/test/';                         //#.(01015.01.2
//nst API_URL =  process.env.API_URL + '/api/test/'                        //#.(01015.01.2 RAM get from .ENV file.  Wrong! this is running in the client, not node)
//nst API_URL = '/api/test/'                                               //#.(01015.01.3 RAM Use relative/absolute path).(01015.01.5)
//nst API_URL = 'http://localhost:50315/api/test/'                         // .(01015.01.5 RAM Hard code it)
const API_URL =  process.env.REACT_APP_API_URL + '/api/test/'              // .(01108.02.2 RAM get from .ENV file. Using REACT_APP special prefix)

class BoardService {                                                       // .(01119.02.1 Rename UserService)

  getPublicContent(  ) { 
                         return axios.get( API_URL + 'all');  }
  getUserBoard(      ) { 
                         return axios.get( API_URL + 'user',  { headers: authHeader() });  }
  getModeratorBoard( ) { 
                         return axios.get( API_URL + 'mod',   { headers: authHeader() });  }
  getAdminBoard(     ) { 
                         return axios.get( API_URL + 'admin', { headers: authHeader() });  }
  }

export default new BoardService();                                         // .(01119.02.1
