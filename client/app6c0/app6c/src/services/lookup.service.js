// import  http from "../http-common";
   import axios from "axios";

var http = axios.create(
//          { baseURL:   "http://localhost:50315/api"            //#.(01108.02.5)
//          { baseURL:    process.env.REACT_APP_API_URL + '/api' // .(01108.02.5)
            { baseURL:    process.env.REACT_APP_API_URL          // .(01108.02.5)
            , headers: { "Content-type": "application/json" }
              } );

class LookupDataService {

  getAll(                  ) { return http.get(   `/api/lookups`              ); }
  get(    id               ) { return http.get(   `/api/lookups/${id}`        ); }
  create(     data         ) { return http.post(  `/api/lookups`,       data  ); }
  update( id, data         ) { return http.put(   `/api/lookups/${id}`, data  ); }
  delete( id               ) { return http.delete(`/api/lookups/${id}`        ); }
  deleteAll(               ) { return http.delete(`/api/lookups`              ); }
  findBytype( type         ) { return http.get(   `/api/lookups?type=${type}` ); }
  }

export default new LookupDataService();