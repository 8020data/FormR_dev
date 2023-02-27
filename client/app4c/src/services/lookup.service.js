// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class LookupDataService {

  getAll(                  ) { return http.get(   `/lookups`                      );  }
  get(    id               ) { return http.get(   `/lookups/${id}`                );  }
  create(     data         ) { return http.post(  `/lookups`,       data          );  }
  update( id, data         ) { return http.put(   `/lookups/${id}`, data          );  }
  delete( id               ) { return http.delete(`/lookups/${id}`                );  }
  deleteAll(               ) { return http.delete(`/lookups`                      );  }
  findBytype( type ) { return http.get(   `/lookups?type=${type}` );  }
  }

export default new LookupDataService();