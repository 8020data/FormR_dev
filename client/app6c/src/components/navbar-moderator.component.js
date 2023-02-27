import React, { Component } from "react";
import {             Link } from "react-router-dom";

import AuthService          from "../services/auth.service";


import  NavBarSearch        from './navbar-search.js';
import  NavBarMessages      from './navbar-messages.js';
import  NavBarNotifications from './navbar-notifications.js';

// ----------------------------------------------------------------------------

export default class NavBar extends Component {

  // -------------------------------------------------------------------

  constructor( props ) {

    super( props );

    this.logOut          =  this.logOut.bind( this );

    this.state           =
     {  currentUser      :  { username: undefined }  // .(01107.02.1 RAM Can't be just undefined as it wants currentUser.username even if not called)
        };

    }; // eom constructor( props ) { ... }
      // ---------------------------------------------------------------

  // -------------------------------------------------------------------

  componentDidMount() {

    this.setState(
     {  currentUser      :  AuthService.getCurrentUser()
        } );

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

        <li     className="nav-item">                 {/* Moderator Board */}
          <Link className="nav-link" to={"/mod"}         >Moderator Board</Link>
        </li>


        <NavBarSearch />

      </ul> {/* Left Navbar Links End */}

      <ul       className="navbar-nav ml-auto">       {/* Right navbar links */}


        <NavBarMessages />

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


