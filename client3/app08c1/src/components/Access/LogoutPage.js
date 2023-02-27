// import   React        from "react";
   import   AuthService  from "../../services/AuthService";
   import { useHistory } from "react-router-dom";

function LogoutPage() {
  var history = useHistory();

      AuthService.logout();
      localStorage.message = "You have successfully logged out";
      history.push("/home");
      window.location.reload();
      }
export default LogoutPage;
