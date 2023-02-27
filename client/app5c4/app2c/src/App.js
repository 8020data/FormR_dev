import React,    { Component } from "react";
import { Switch, Route       } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService     from "./services/auth.service";

import Home            from "./components/home.component";

import Login           from "./components/login.component";
import Register        from "./components/register.component";
import Profile         from "./components/profile.component";

import AddTutorial     from "./components/add-tutorial.component";
import Tutorial        from "./components/tutorial.component";
import TutorialsList   from "./components/tutorials-list.component";

import AddMember       from "./components/add-member.component";
import Member          from "./components/member.component";
import MembersList     from "./components/members-list.component";

import BoardUser       from "./components/board-user.component";
import BoardModerator  from "./components/board-moderator.component";
import BoardAdmin      from "./components/board-admin.component";

import NavBarAdmin     from "./components/navbar-admin.component";
import NavBarModerator from "./components/navbar-moderator.component";
import NavBarUser      from "./components/navbar-user.component";
import NavBarNone      from "./components/navbar-none.component";

// ------------------------------------------------------------------------

class App extends Component {

// ---------------------------------------------------------------

  constructor( props ) {

    super( props );

//  console.log( "Hello" )
//  console.log( process.env )
//  window.API_URL = process.env.REACT_APP_API_URL
//  console.log( "window.API_URL: " + window.API_URL )
//  window.API_URL = process.env.

//  this.logOut        =    this.logOut.bind( this );

    this.state =
     { currentUser  :  undefined
     , isUser       :  false
     , isModerator  :  false
     , isAdmin      :  false
     , aRole        :  undefined
     , API_URL      :  process.env.REACT_APP_API_URL   // Not necessary, besides who knows when this is run
       };

    }; // eom constructor( props ) { ... }
// ---------------------------------------------------------------

  componentDidMount() {

    const user      =  AuthService.getCurrentUser();

    if (user) {

    this.setState(
//   {  currentUser :  user  }
     {  isUser      :  user ? true : false
     ,  isModerator :  user.roles.includes( 'ROLE_MODERATOR' )
     ,  isAdmin     :  user.roles.includes( 'ROLE_ADMIN'     )
        } );
      }

    }; // eom componentDidMount() { ... }
// ---------------------------------------------------------------

  logOut() {

    AuthService.logout();

    }  // eom logout() { ... }
// ---------------------------------------------------------------

  render() {

//  const { currentUser,  isUser,  isModerator,  isAdmin } = this.state;
    const {               isUser,  isModerator,  isAdmin } = this.state;
    const   aRole      =  isAdmin ? 'admin' : ( isModerator ? 'moderator' : ( isUser ? 'user' : '' ) )

/*  var     pNavBar
    switch( aRole ) {
      case 'admin'     :  pNavBar = <NavBarAdmin />; break;
      case 'moderator' :  pNavBar = <NavBar      />; break;
      case 'user'      :  pNavBar = <NavBar      />; break;
      default          :  pNavBar = <NavBar      />;
      } */

    function rSwitch( aCase, pCases ) {
        var  pCase = pCases[ aCase ]; return pCase ? pCase : pCases.default
             }

    return (

      <div>

   {/*  <pNavBar /> */}

   { rSwitch( aRole,
      { 'admin'        : <NavBarAdmin     />
      , 'moderator'    : <NavBarModerator />
      , 'user'         : <NavBarUser      />
      ,  default       : <NavBarNone      />
         } )
      }

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]}      component={Home} />
            <Route exact path="/login"              component={Login} />
            <Route exact path="/register"           component={Register} />
            <Route exact path="/profile"            component={Profile} />

            <Route       path="/user"               component={BoardUser} />
            <Route       path="/mod"                component={BoardModerator} />
            <Route       path="/admin"              component={BoardAdmin} />

            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/addtutorial"        component={AddTutorial} />
            <Route       path="/tutorials/:id"      component={Tutorial} />

            <Route exact path={["/", "/members"]}   component={MembersList} />
            <Route exact path="/addmember"          component={AddMember} />
            <Route       path="/members/:id"        component={Member} />
          </Switch>
        </div>

      </div>

    );  // eom return ( ... )
// ---------------------------------------------------------------

  }  // eom render() { ... }
// ----------------------------------------------------------------------

}  // eoc App extends Component { ... }
// ----------------------------------------------------------------------------

export default App;
