   import   React               from "react";
   import { Switch, Route }     from "react-router-dom";
   import                            "./App.css"; 
   
// import   AuthService         from "./services/AuthService.js";
   
// import   Home                from "./components/Access/HomePage.js";
   import   Login               from "./components/Access/LoginForm.js";
   import   Logout              from "./components/Access/LogoutPage.js";
   import   Register            from "./components/Access/RegisterForm.js";
// import   RegisterSuccessful  from "./components/Access/RegisterSuccessfulPage.js";
   import   ChangeUserProfile   from "./components/Access/ChangeUserProfileForm.js";
   import   ForgotPassword      from "./components/Access/ForgotPasswordForm.js";
   
   import   Profile             from "./components/Access/ProfilePage.js";
   import   Editor              from "./components/Access/ProfilePage.js";
   import   User                from "./components/Access/ProfilePage.js";
      
// import   AdminEdit           from "./components/Admin/AdminEdit.js";      // .(10404.03.1 RAM Added)
// import   WorldEdit           from "./components/World/WorldEdit.js";      // .(10404.06.1 RAM Added World)   

   import   NavBar              from "./components/Access/NavBar.js";        // .(10403.01.1 RAM Renamed)

//    ----------------------------------------------------------------------

 var Homepage = ({ message }) => {
            message = message ? message : "Welcome to FormR" 

   return ( <div className="modal-dialog">
              <div className="card card-dark">
                <div className="card-header">
                  <h3 className="card-title">{ message }</h3>
                </div>
              </div>
            </div>
            );
          }
//    ----------------------------------------------------------------------

function App() {
/*                                                                           //#.(10403.01.2 RAM Beg Moved to NavBar)
  var currentUser = "",
      isUser      = false,
      isEditor    = false,
      isAdmin     = false,
      aRole       = undefined;

  var user = AuthService.getCurrentUser();

  if (user) {
    isUser = true;
    //        isEditor    =  user.roles.includes( "ROLE_EDITOR" )
    //        isAdmin     =  user.roles.includes( "ROLE_ADMIN"  )
  }

  //      aRole       =  isAdmin  ? "admin"  : ""
  //      aRole       =  isEditor ? "editor" : aRole
  aRole = isUser ? "user" : aRole;

*/                                                                           //#.(10403.01.2 RAM Beg Moved to NavBar)
  return (
    <div>
      <NavBar/>                                                             {/* .(10403.01.1 RAM Renamed) */}

      <div>
        <Switch>
{/*       <Route exact path="/home"               component={ Home() } />  */}
          <Route exact path="/home"               component={ () => <Homepage/> } />

          <Route exact path="/login"              component={ Login } />
          <Route exact path="/register"           component={ Register } />

          <Route exact path="/logout"             component={ Logout } />  
{/*       <Route exact path="/logout"             component={ logout( "You have successfully logged out" ) } />  */}
          <Route exact path="/homelogout"         component={ () => <Homepage message={ "You have successfully logged out" } />} />


{/*       <Route exact path="/registersuccessful" component={ RegisterSuccessful} />  */}
          <Route exact path="/registersuccessful" component={ () => <Homepage message={ "Register Successful" } />} />  

          <Route exact path="/changeuserprofile"  component={ ChangeUserProfile }  />
          <Route exact path="/forgotpassword"     component={ ForgotPassword }     />

          <Route exact path="/profile"            component={ Profile }   />     {/* .(10404.04.2 RAM Added Profiles) */}
          <Route exact path="/editor"             component={ Editor }    />     {/* .(10404.04.3) */} 
          <Route exact path="/user"               component={ User }      />     {/* .(10404.04.4) */}

{/*       <Route exact path="/admin"              component={ AdminEdit } />  */}{/* .(10404.03.2).(10405.03 RAM Take it out) */} 
{/*       <Route exact path="/world"              component={ WorldEdit } />  */}{/* .(10404.06.2).(10405.03 RAM Take it out) */}    

        </Switch>
      </div>
    </div>
  ); // eom return ( ... )
} // eof App

export default App;
