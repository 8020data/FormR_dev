import React from "react";
import { Link } from "react-router-dom";

function NavBarNone() {
  return (
    <nav class="main-header navbar navbar-expand navbar-dark navbar-dark">

      <Link to={"/"} className="navbar-brand">
        FormR
      </Link>

      <ul class="navbar-nav">

        <li class="nav-item d-none d-sm-inline-block">
        <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </li>

      </ul>


      <ul className="navbar-nav ml-auto">

        <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Register
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/logout"} className="nav-link">
            Logout
          </Link>
        </li>

      </ul>
      
    </nav>
  );
}

export default NavBarNone;
