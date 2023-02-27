import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/HomePage.js";
import NavBar from "./components/NavBar.js";
import Login from "./components/Access/LoginForm.js";
import Logout from "./components/Access/LogoutPage.js";
import Register from "./components/Access/RegisterForm.js";
import Profile from "./components/Access/ProfilePage.js";
import ForgotPassword from "./components/Access/ForgotPasswordForm.js";
import ResetPassword from "./components/Access/ResetPasswordForm.js";
import ChangeProfile from "./components/Access/ChangeProfileForm.js";

function App() {
  return (
    <div>
      <NavBar />

      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route exact path="/changeprofile" component={ChangeProfile} />
        </Switch>
      </div>
    </div>
  ); 
} 

export default App;
