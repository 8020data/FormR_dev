// import http  from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class MemberDataService {

  getAll(                  ) { return http.get(   `/members`                      );  }
  get(    id               ) { return http.get(   `/members/${id}`                );  }
  create(     data         ) { return http.post(  `/members`,       data          );  }
  update( id, data         ) { return http.put(   `/members/${id}`, data          );  }
  delete( id               ) { return http.delete(`/members/${id}`                );  }
  deleteAll(               ) { return http.delete(`/members`                      );  }
  findByLastName( LastName ) { return http.get(   `/members?LastName=${LastName}` );  }
  }

export default new MemberDataService();