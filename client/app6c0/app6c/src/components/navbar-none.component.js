import React, { Component }    from "react";
import {                Link } from "react-router-dom";

// ----------------------------------------------------------------------------

export default class NavBar extends Component {

  // -------------------------------------------------------------------

  render() {

    // -----------------------------------------------------------

    return (

//* <nav        className=                   "navbar navbar-expand"                 >  */} {/* .(01113.01.2 RAM Removed navbar-dark bg-dark) */}
    <nav        className="main-header navbar navbar-expand navbar-blue navbar-dark">      {/* Navbar */}

      <ul       className="navbar-nav mr-auto">       {/* .(01113.02.1 RAM Added mr-auto; Left Navbar Links) */}

        <Link   className="navbar-brand" to={"/"}        >FormR</Link>

        <li     className="nav-item">                 {/* Show/Hide Sidebar */}
          <a    className="nav-link" data-widget="pushmenu" href="#/" role="button"><i className="fas fa-bars" /></a>
        </li>       {/* Push Menu */}

        <li     className="nav-item">                 {/* Home */}
          <Link className="nav-link" to={"/home"}        >Home</Link>
        </li>








      </ul> {/* Left Navbar Links End */}

      <ul       className="navbar-nav ml-auto">       {/* Right navbar links */}






        <li     className="nav-item">
          <a    className="nav-link" data-widget="control-sidebar" data-slide="true" href="#/" role="button"><i className="fas fa-th-large" /></a>
        </li>

        <li     className="nav-item">
          <Link className="nav-link" to={"/login"}       >Login</Link>
        </li>

        <li     className="nav-item">
          <Link className="nav-link" to={"/register"}    >Sign Up</Link>
        </li>

      </ul> {/* Right Navbar Links End */}

    </nav> //* Navbar End *//

      )  // eom return ( ... )
        // -------------------------------------------------------

    }  // eom render() { ... }
      // ---------------------------------------------------------------

  }  // eoc NavBar extends Component { ... }
    // ------------------------------------------------------------------------

// export default NavBar;


