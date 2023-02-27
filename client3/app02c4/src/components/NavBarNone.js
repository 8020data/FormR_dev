import React from "react";
import { Link } from "react-router-dom";

function NavBarNone() {
  return (
    <nav style={{ paddingLeft: "20px" }}>
      <Link to={"/"}>FormR</Link>

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
      </div>
    </nav>
  );
}

export default NavBarNone;
