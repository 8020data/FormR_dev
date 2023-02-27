// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class FormrDataService {

  getAll(                  ) { return http.get(   `/formrs`                      );  }
  get(    id               ) { return http.get(   `/formrs/${id}`                );  }
  create(     data         ) { return http.post(  `/formrs`,       data          );  }
  update( id, data         ) { return http.put(   `/formrs/${id}`, data          );  }
  delete( id               ) { return http.delete(`/formrs/${id}`                );  }
  deleteAll(               ) { return http.delete(`/formrs`                      );  }
  findBy<<SEARCHCOL>>( <<SEARCHCOL>> ) { return http.get(   `/formrs?<<SEARCHCOL>>=${<<SEARCHCOL>>}` );  }
  }

export default new FormrDataService();