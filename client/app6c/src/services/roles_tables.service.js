// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class Roles_tablesDataService {

  getAll(                  ) { return http.get(   `/roles_tables`                      );  }
  get(    id               ) { return http.get(   `/roles_tables/${id}`                );  }
  create(     data         ) { return http.post(  `/roles_tables`,       data          );  }
  update( id, data         ) { return http.put(   `/roles_tables/${id}`, data          );  }
  delete( id               ) { return http.delete(`/roles_tables/${id}`                );  }
  deleteAll(               ) { return http.delete(`/roles_tables`                      );  }
  findByroleid( roleid ) { return http.get(   `/roles_tables?roleid=${roleid}` );  }
  }

export default new Roles_tablesDataService();