import React, { Component }    from "react";
import {                Link } from "react-router-dom";

import AuthService    from "../services/auth.service";

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

        <nav className="navbar navbar-expand navbar-dark bg-dark">

              <Link to={"/"}            className="navbar-brand">FormR</Link>

          <div className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link to={"/home"}      className="nav-link">Home</Link>
              </li>

              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">Tutorials</Link>
              </li>

              <li className="nav-item">
                <Link to={"/members"}   className="nav-link">Members</Link>
              </li>

              <li className="nav-item">
                <Link to={"/user"}      className="nav-link">User</Link>
              </li>

          </div>

          <div className="navbar-nav ml-auto">

              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">{currentUser.username}</Link>
              </li>

              <li className="nav-item">
                <a  href="/login"     className="nav-link" onClick={this.logOut}>LogOut</a>
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


