import React, { Component } from "react";
import {             Link } from "react-router-dom";

import AuthService    from "../services/auth.service";


//port  NavBarSearch        from './navbar-search.js';                             {/*#.(01113.04.1 RAM Removed for Users) */}
//port  NavBarMessages      from './navbar-messages.js';                           {/*#.(01113.04.2) */}
import  NavBarNotifications from './navbar-notifications.js';

// ----------------------------------------------------------------------------

export default class NavBar extends Component {

  // -------------------------------------------------------------------

  constructor( props ) {

    super( props );

    this.logOut          =  this.logOut.bind( this );

    this.state           =
     {  currentUser      :  { username: undefined }
        };

    }; // eom constructor( props ) { ... }
      // ---------------------------------------------------------------

  // -------------------------------------------------------------------

  componentDidMount() {

    this.setState(
     {  currentUser      :  AuthService.getCurrentUser()
        } );
//    }
    }; // eom componentDidMount() { ... }
      // ---------------------------------------------------------------

  // -------------------------------------------------------------------

  logOut() {

    AuthService.logout();

    }; // eom logout() { ... }
      // -------------------------------------------------------------------

  render() {

    // -----------------------------------------------------------

    const { currentUser } = this.state;

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

        <li     className="nav-item">                 {/* User */}
          <Link className="nav-link" to={"/user"}        >User</Link>
        </li>


{/*     <NavBarSearch />  */}                         {/*#.(01113.04.3) */}

      </ul> {/* Left Navbar Links End */}

      <ul       className="navbar-nav ml-auto">       {/* Right navbar links */}


{/*     <NavBarMessages />    */}                     {/*#.(01113.04.4) */}

        <NavBarNotifications />

        <li     className="nav-item">
          <a    className="nav-link" data-widget="control-sidebar" data-slide="true" href="#/" role="button"><i className="fas fa-th-large" /></a>
        </li>

        <li     className="nav-item">
          <Link className="nav-link" to={"/profile"}     >{currentUser.username}</Link>
        </li>

        <li     className="nav-item">
          <a    className="nav-link" href="/login"         onClick={this.logOut}>LogOut</a>
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


