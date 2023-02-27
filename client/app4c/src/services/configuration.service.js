// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class ConfigurationDataService {

  getAll(                  ) { return http.get(   `/configurations`                      );  }
  get(    id               ) { return http.get(   `/configurations/${id}`                );  }
  create(     data         ) { return http.post(  `/configurations`,       data          );  }
  update( id, data         ) { return http.put(   `/configurations/${id}`, data          );  }
  delete( id               ) { return http.delete(`/configurations/${id}`                );  }
  deleteAll(               ) { return http.delete(`/configurations`                      );  }
  findBydescription( description ) { return http.get(   `/configurations?description=${description}` );  }
  }

export default new ConfigurationDataService();