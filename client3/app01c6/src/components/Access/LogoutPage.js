// import   React        from "react";                      // .(10406.02.4 RAM Not needed cuz no return(<render>)  )
   import { useHistory } from "react-router-dom";           // .(10406.02.3 RAM)

   import   AuthService  from "../../services/AuthService";

  function  LogoutPage() {

       var  history = useHistory();                         // .(10406.02.2)

            AuthService.logout()                      

            history.push("/homelogout");                    // .(10406.02.1 RAM Added intermediate page)
            window.location.reload();                       // .(10404.16.1 Force page refresh)
/*
          return (
            <div className="modal-dialog">
              <div className="card card-dark">
                <div className="card-header">
                  <h3 className="card-title">You have successfully logged out</h3>
                </div>
              </div>
            </div>
            );
*/  
            }
 
    export  default LogoutPage;