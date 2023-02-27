// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class TableDataService {

  getAll(                  ) { return http.get(   `/tables`                      );  }
  get(    id               ) { return http.get(   `/tables/${id}`                );  }
  create(     data         ) { return http.post(  `/tables`,       data          );  }
  update( id, data         ) { return http.put(   `/tables/${id}`, data          );  }
  delete( id               ) { return http.delete(`/tables/${id}`                );  }
  deleteAll(               ) { return http.delete(`/tables`                      );  }
  findBytitle( title ) { return http.get(   `/tables?title=${title}` );  }
  }

export default new TableDataService();