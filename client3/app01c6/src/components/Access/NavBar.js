   import   React               from "react";
   import { Link }              from "react-router-dom";
   import   AuthService         from "../../services/AuthService.js";

function  NavBar() {

//   var  currentUser = ""
     var  isUser      =  false
     var  isAdmin     =  false
     var  isEditor    =  false
     var  isPublic    =  true
//   var  aAvatar     =  <i className="fas fa-user-circle" style={{ marginTop: '7px' }}></i>                      // .(10403.04.1 Beg RAM Use Avatars) 
     var  aAvatarImg  =  ''
//   var  aRole       =  undefined

     var  pUser       =  AuthService.getCurrentUser();

      if (pUser) {
          isUser      =  true;
          isEditor    =  pUser.role.match( /editor/i ) != null   // .(10403.02.1 RAM Was: user.roles.includes( "ROLE_EDITOR" )) 
          isAdmin     =  pUser.role.match( /admin/i  ) != null   // .(10403.02.1 RAM Was: user.roles.includes( "ROLE_ADMIN"  )) 

//        aAvatar     =  <img src="/avatars/rm10403_{ pUser.username }_32x32.png" alt="Admin" style={{ marginTop: '3px' }}></img>
          aAvatarImg  =  pUser.username.toLowerCase()

//        currentUser =  pUser.username 
      } else {
          isPublic    =  true    
          }

 //       aRole       =  isAdmin  ? "admin"  : ""
 //       aRole       =  isEditor ? "editor" : aRole
 //       aRole       =  isUser   ? "user"   : aRole

// -------------------------------------------------------------

     function MenuItem( props ) { 

      var aNameOrImg =  props.name
      var aClass     = "nav-link"    

      if (props.image) {
      if (props.image.match( /robin|bruce|admin/i )) { 
          aNameOrImg =  <img src={ "/avatars/fr10403_" + props.image + "_32x32.png" }
                             alt={ props.name } style={{ marginTop: '1px' }}>
                        </img>
          aClass     = "navbar-brand"
      } else { 
          aNameOrImg =  <i  className="fas fa-user-circle" style={{ marginTop: '7px' }}></i>                      
        } }
        return          <li className="nav-item">
                          <Link   to={ '/' + props.name.toLowerCase() } className={ aClass }>
                            { aNameOrImg }
                          </Link>
                        </li>
          }            
//        -------------------------------------------

// -------------------------------------------------------------

     var  mnuItems1   = ''
     var  mnuItems2   = ''

//        ----------------------------------------

      if (isPublic) {
          mnuItems1   = <ul className="navbar-nav"   ></ul>
          mnuItems2   = <ul className="navbar-nav ml-auto">
                          < MenuItem name="Register" />
                          < MenuItem name="Login"    />
                        </ul>
          }
//        ----------------------------------------

      if (isUser) {
          mnuItems1   = <ul className="navbar-nav">
                          < MenuItem name="Home" />
                          < MenuItem name="User" />
                          < MenuItem name="World"/>
                        </ul>  
          mnuItems2   = <ul className="navbar-nav ml-auto">
                          < MenuItem name="Logout"  />
                          < MenuItem name="Profile" image={ aAvatarImg } />
                        </ul>
          }
//        ----------------------------------------

      if (isAdmin) {
          mnuItems1   = <ul className="navbar-nav">
                          < MenuItem name="Home"  />
                          < MenuItem name="Profile" />
                          < MenuItem name="Admin" />
                        </ul>  
          mnuItems2   = <ul className="navbar-nav ml-auto">
                          < MenuItem name="Logout"  />
                          < MenuItem name="Profile" image={ aAvatarImg } />
                        </ul>
          }
//        ----------------------------------------

      if (isEditor) {
          mnuItems1   = <ul className="navbar-nav">
                          < MenuItem name="Home"  />
                          < MenuItem name="Editor"/>
                          < MenuItem name="World" />
                        </ul>  
          mnuItems2   = <ul className="navbar-nav ml-auto">
                          < MenuItem name="Logout"  />
                          < MenuItem name="Profile" image={ aAvatarImg } />
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
