import React from "react";

import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";

function ProfilePage() {
  let history = useHistory();

  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    history.push("/home");
    window.location.reload();
  }

  return (
    <div className="col-md-12">
      <div class="card card-info">
      <div class="card-header">
        <h3 class="card-title">User Profile</h3>
      </div>
      <br></br>
      <h5>Username: {currentUser.username}</h5>
      <p>id: {currentUser.id}</p>
      <p>Email: {currentUser.email}</p>
      <p>Active: {currentUser.active}</p>
      <p>Role: {currentUser.role}</p>
      <p>Password Date: {currentUser.passworddate}</p>
      <p>
        Token(20):{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
    </div>

</div>
);
}

export default ProfilePage;
