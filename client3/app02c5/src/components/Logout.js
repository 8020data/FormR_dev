import React from "react";
import AuthService from "../services/AuthService";

function Logout() {
  AuthService.logout();

  return (
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal-success">
    You have successfully logged out.
  </button>
);
}
export default Logout;
