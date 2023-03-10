import React, { Component }    from "react";
import {                Link } from "react-router-dom";

// ----------------------------------------------------------------------------

export default class NavBar extends Component {

  // -------------------------------------------------------------------

  render() {

    // -----------------------------------------------------------

    return (

        <nav className="navbar navbar-expand navbar-dark bg-dark">

              <Link to={"/"}            className="navbar-brand">FormR</Link>

          <div className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link to={"/home"}      className="nav-link">Home</Link>
              </li>

          </div>

          <div className="navbar-nav ml-auto">

            <li className="nav-item">
              <Link to={"/login"}    className="nav-link">Login</Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">Sign Up</Link>
            </li>

          </div>

        </nav>

      )  // eom return ( ... )
        // -------------------------------------------------------

    }  // eom render() { ... }
      // ---------------------------------------------------------------

  }  // eoc NavBar extends Component { ... }
    // ------------------------------------------------------------------------

// export default NavBar;


