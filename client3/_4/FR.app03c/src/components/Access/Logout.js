   import   React        from "react";
   import { useHistory } from "react-router-dom";
   import   AuthService  from "../../services/AuthService";                                // .(10322.05.02)

   function Logout() {
            AuthService.logout();
        let history = useHistory();

   return (
            <div>
              <button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-success">
                You have successfully logged out.
              </button>

              <button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-success"
              onChange={ (e) => onLogout( e )}
//            onChange={ history.push( "/" ) }
              >
              Ckick here to return to public page.              
              </button>
            </div>  
            );

   function onLogout( e ) {
            history.push("/");                                                              // .(10321.06.1 Was /profile. Let App.js determine where to go.)
            window.location.reload();
            }         

          }


export default Logout;
