// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class roleDataService {

  getAll(                  ) { return http.get(   `/roles`                      );  }
  get(    id               ) { return http.get(   `/roles/${id}`                );  }
  create(     data         ) { return http.post(  `/roles`,       data          );  }
  update( id, data         ) { return http.put(   `/roles/${id}`, data          );  }
  delete( id               ) { return http.delete(`/roles/${id}`                );  }
  deleteAll(               ) { return http.delete(`/roles`                      );  }
  findByName( name ) { return http.get(   `/roles?name=${name}` );  }
  }

export default new roleDataService();