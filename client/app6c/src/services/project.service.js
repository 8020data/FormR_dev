// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class ProjectDataService {

  getAll(                  ) { return http.get(   `/projects`                      );  }
  get(    id               ) { return http.get(   `/projects/${id}`                );  }
  create(     data         ) { return http.post(  `/projects`,       data          );  }
  update( id, data         ) { return http.put(   `/projects/${id}`, data          );  }
  delete( id               ) { return http.delete(`/projects/${id}`                );  }
  deleteAll(               ) { return http.delete(`/projects`                      );  }
  findByname( name ) { return http.get(   `/projects?name=${name}` );  }
  }

export default new ProjectDataService();