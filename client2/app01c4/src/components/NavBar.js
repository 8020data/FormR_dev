import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ paddingLeft: "20px" }}>
      <Link to={"/home"}>FormR</Link>

      <div>
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
      </div>

      <div>
        <li>
          <Link to={"/register"}>Register</Link>
        </li>

        <li>
          <Link to={"/login"}>Login</Link>
        </li>

        <li>
          <Link to={"/logout"}>Logout</Link>
        </li>

        <li>
          <Link to={"/forgotpassword"}>Forgot Password</Link>
        </li>

        <li>
          <Link to={"/resetpassword"}>Reset Password</Link>
        </li>

        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>

        <li>
          <Link to={"/changeprofile"}>Change Profile</Link>
        </li>

      </div>
    </nav>
  );
}

export default NavBar;
