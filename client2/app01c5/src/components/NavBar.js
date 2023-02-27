import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  // -------------------------------------------------------------
 
  function MenuItem(props) {
    return (
      <li className="nav-item">
        <Link to={"/" + props.name.toLowerCase()} className="nav-link">
          <i> {props.name} </i>
        </Link>
      </li>
    );
  }

  //        -------------------------------------------
  
  var mnuItemsLogo = (
    <a href="/home" className="navbar-brand">
      <img
        src="/favicon-32x32.png"
        alt="FormR"
        className="brand-image img-circle elevation-3"
        style={{ opacity: 0.8 }}
      />
      <span style={{ marginLeft: "5px" }}>FormR</span>
    </a>
  );

  var mnuItemsLeft = (
    <ul className="navbar-nav">
      <MenuItem name="Home" />
    </ul>
  );

  var mnuItemsRight = (
    <ul className="navbar-nav ml-auto">
      <MenuItem name="Register" />
      <MenuItem name="Login" />
      <MenuItem name="Logout" />
      <MenuItem name="Profile" />
    </ul>
  );

  var mnuItemsUserAvatar = (
    <li className="nav-item">
        <a href="/changeprofile" className="navbar-brand">
          <i className="fas fa-user-circle"></i>
        </a>
    </li>
  );
 
  // -------------------------------------------------------------

  return (
    <nav className="navbar navbar-expand navbar-dark">
      {mnuItemsLogo}
      {mnuItemsLeft}
      {mnuItemsRight}
      {mnuItemsUserAvatar}
    </nav>
  );

  // -------------------------------------------------------------
}

export default NavBar;
