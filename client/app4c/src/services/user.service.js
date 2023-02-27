// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class userDataService {

  getAll(                  ) { return http.get(   `/users`                      );  }
  get(    id               ) { return http.get(   `/users/${id}`                );  }
  create(     data         ) { return http.post(  `/users`,       data          );  }
  update( id, data         ) { return http.put(   `/users/${id}`, data          );  }
  delete( id               ) { return http.delete(`/users/${id}`                );  }
  deleteAll(               ) { return http.delete(`/users`                      );  }
  findByusername( username ) { return http.get(   `/users?username=${username}` );  }
  }

export default new userDataService();