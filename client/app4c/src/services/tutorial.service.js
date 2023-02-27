// import http  from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.6)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.6)
            , headers: { "Content-type": "application/json" }
              } );

class TutorialDataService {

  getAll(            ) { return http.get(   `/tutorials`                );  }
  get(    id         ) { return http.get(   `/tutorials/${id}`          );  }
  create(     data   ) { return http.post(  `/tutorials`,       data    );  }
  update( id, data   ) { return http.put(   `/tutorials/${id}`, data    );  }
  delete( id         ) { return http.delete(`/tutorials/${id}`          );  }
  deleteAll(         ) { return http.delete(`/tutorials`                );  }
  findByTitle( title ) { return http.get(   `/tutorials?title=${title}` );  }
  }

export default new TutorialDataService();