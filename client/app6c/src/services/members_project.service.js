// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class Members_projectDataService {

  getAll(                  ) { return http.get(   `/members_projects`                      );  }
  get(    id               ) { return http.get(   `/members_projects/${id}`                );  }
  create(     data         ) { return http.post(  `/members_projects`,       data          );  }
  update( id, data         ) { return http.put(   `/members_projects/${id}`, data          );  }
  delete( id               ) { return http.delete(`/members_projects/${id}`                );  }
  deleteAll(               ) { return http.delete(`/members_projects`                      );  }
  findBymemberId( memberId ) { return http.get(   `/members_projects?memberId=${memberId}` );  }
  }

export default new Members_projectDataService();