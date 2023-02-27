import React, { Component } from 'react';
// ort { Link  }            from 'react-router-dom';

import AuthService          from '../services/auth.service';

import NavBarAdmin          from './navbar-admin.component';
import NavBarModerator      from './navbar-moderator.component';
import NavBarUser           from './navbar-user.component';
import NavBarNone           from './navbar-none.component';

//port default function Header() {
export default class Header extends Component {

// ---------------------------------------------------------------

  constructor( props ) {

    super( props );

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

    { rSwitch( aRole,
       { 'admin'        : <NavBarAdmin     />
       , 'moderator'    : <NavBarModerator />
       , 'user'         : <NavBarUser      />
       ,  default       : <NavBarNone      />
          } )
      }
      
    </div>

  ) }

  }
