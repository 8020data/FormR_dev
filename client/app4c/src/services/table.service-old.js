// import http  from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.6)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.6)
            , headers: { "Content-type": "application/json" }
              } );

class TableDataService {                                         // .(01117.01.1 RAM Add Toble Data Service)

  getAll(            ) { return http.get(   `/tables`                );  }
  get(    id         ) { return http.get(   `/tables/${id}`          );  }
  create(     data   ) { return http.post(  `/tables`,       data    );  }
  update( id, data   ) { return http.put(   `/tables/${id}`, data    );  }
  delete( id         ) { return http.delete(`/tables/${id}`          );  }
  deleteAll(         ) { return http.delete(`/tables`                );  }
//findByName( title  ) { return http.get(   `/tables?name=${name}`   );  }  //#.(01117.01.3 Error: ${nmae} is undefined)
  }

export default new TableDataService();