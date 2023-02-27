// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class User_rolesDataService {

  getAll(                  ) { return http.get(   `/user_roles`                      );  }
  get(    id               ) { return http.get(   `/user_roles/${id}`                );  }
  create(     data         ) { return http.post(  `/user_roles`,       data          );  }
  update( id, data         ) { return http.put(   `/user_roles/${id}`, data          );  }
  delete( id               ) { return http.delete(`/user_roles/${id}`                );  }
  deleteAll(               ) { return http.delete(`/user_roles`                      );  }
  findByroleId( roleId ) { return http.get(   `/user_roles?roleId=${roleId}` );  }
  }

export default new User_rolesDataService();