import React from "react";

import { useHistory } from "react-router-dom";
import   AuthService       from "../../services/AuthService";

function ProfilePage() {
  let history = useHistory();

  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    localStorage.message = "You are not logged in"
    history.push("/home");
    window.location.reload();
  }

  return (
    <div>
      <br></br>
      <h4>User: {currentUser.username}</h4>
      <p>id: {currentUser.id}</p>
      <p>Email: {currentUser.email}</p>
      <p>Active: {currentUser.active}</p>
      <p>Role: {currentUser.role}</p>
      <p>PasswordDate: {currentUser.passworddate}</p>
      <p>
        Token:{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
    </div>
  );
}

export default ProfilePage;
