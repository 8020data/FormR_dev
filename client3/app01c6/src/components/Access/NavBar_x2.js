   import   React               from "react";
   import { Link }              from "react-router-dom";
   import   AuthService         from "../services/AuthService.js";

function  NavBar() {

//   var  currentUser = ""
     var  isUser      =  false
     var  isAdmin     =  false
     var  isEditor    =  false
     var  isPublic    =  true
//   var  aRole       =  undefined

     var  pUser       =  AuthService.getCurrentUser();

      if (pUser) {
          isUser      =  true;
          isEditor    =  pUser.role.match( /editor/i ) != null   // .(10403.02.1 RAM Was: user.roles.includes( "ROLE_EDITOR" )) 
          isAdmin     =  pUser.role.match( /admin/i  ) != null   // .(10403.02.1 RAM Was: user.roles.includes( "ROLE_ADMIN"  )) 

     var  aAvatar     =  <i className="fas fa-user-circle" style={{ marginTop: '7px' }}></i>                      // .(10403.04.1 Beg RAM Use Avatars) 
      if (pUser.username.match( /admin/i )) {
          aAvatar     =  <img src="/avatars/rm10403_Robin-Avatar1_32x32.png" style={{ marginTop: '3px' }}></img>
          }
      if (pUser.username.match( /robin/i )) {
          aAvatar     =  <img src="/avatars/rm10403_Robin-Avatar2_32x32.png" style={{ marginTop: '3px' }}></img>
          }
      if (pUser.username.match( /bruce/i )) {
          aAvatar     =  <img src="/avatars/rm10403_Bruce-Avatar1_32x32.png" style={{ marginTop: '3px' }}></img>
          }                                                                                                       // .(10403.04.1 End) 

//        currentUser =  pUser.username 
      } else {
          isPublic    =  true    
          }

 //       aRole       =  isAdmin  ? "admin"  : ""
 //       aRole       =  isEditor ? "editor" : aRole
 //       aRole       =  isUser   ? "user"   : aRole

// -------------------------------------------------------------

     var  itmHome     = <li className="nav-item">
                          <Link   to={"/home"}    className="nav-link">
                            Home
                          </Link>
                        </li>

     var  itmAdmin    = <li className="nav-item">
                          <Link   to={"/admin"}    className="nav-link">
                            Admin
                          </Link>
                        </li>

     var  itmEditor   = <li className="nav-item">
                          <Link   to={"/editor"}   className="nav-link">
                            Editor
                          </Link>
                        </li>

     var  itmRegister = <li className="nav-item">
                          <Link   to={"/register"} className="nav-link">
                            Register
                          </Link>
                        </li>

     var  itmLogin    = <li className="nav-item">
                          <Link   to={"/login"}    className="nav-link">
                            Login
                          </Link>
                        </li>

     var  itmLogout   = <li className="nav-item">
                          <Link   to={"/logout"}   className="nav-link">          
                            Logout
                          </Link>
                        </li>

     var  itmAvatar   = <li className="nav-item">
                          <a href="/profile"       className="navbar-brand">      {/* .(10403.02.1 RAM Was /login) */}
                            { aAvatar }                                           {/* .(10403.04.2) */}
                          </a>
                        </li>

// -------------------------------------------------------------

     var  mnuItems1   = ''
     var  mnuItems2   = ''

//        ----------------------------------------

      if (isPublic) {
          mnuItems1   = <ul className="navbar-nav"></ul>
          mnuItems2   = <ul className="navbar-nav ml-auto">
                          { itmRegister }
                          { itmLogin    }
                          { itmAvatar   }
                        </ul>
          }
//        ----------------------------------------

      if (isUser) {
          mnuItems1   = <ul className="navbar-nav">
                          { itmHome     }
                        </ul>  
          mnuItems2   = <ul className="navbar-nav ml-auto">
                          { itmLogout   }
                          { itmAvatar   }
                        </ul>
          }
//        ----------------------------------------

      if (isAdmin) {
          mnuItems1   = <ul className="navbar-nav">
                          { itmAdmin    }
                        </ul>  
          mnuItems2   = <ul className="navbar-nav ml-auto">
                          { itmLogout   }
                          { itmAvatar   }
                        </ul>
          }
//        ----------------------------------------

      if (isEditor) {
          mnuItems1   = <ul className="navbar-nav">
                          { itmEditor   }
                        </ul>  
          mnuItems2   = <ul className="navbar-nav ml-auto">
                          { itmLogout   }
                          { itmAvatar   }
                        </ul>
          }
// -------------------------------------------------------------

      return (

        <nav className="navbar navbar-expand navbar-dark">

          <a href="/home" className="navbar-brand">
            <img
                src="/favicon-32x32.png"
                alt="FormR"
                className="brand-image img-circle elevation-3"
                style={{opacity: .8}}
            /><span style={{ marginLeft: '5px' }}>FormR</span>
          </a>

          { mnuItems1 }
          { mnuItems2 }

        </nav>
      );
// -------------------------------------------------------------

    }

export default NavBar;
