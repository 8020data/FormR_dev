import React       from 'react'
import { useHistory } from "react-router-dom";
import   AuthService       from "../../services/AuthService";

function LogoutForm() {
  
  AuthService.logout();

  var history = useHistory();
  localStorage.message = "You have logged out";
  history.push("/home");
  window.location.reload();
}
export default LogoutForm;
