import React       from 'react'
import AuthService from "../services/AuthService";

function Logout() {
  AuthService.logout();

  return (<b>You have logged out.</b>);
}
export default Logout;
