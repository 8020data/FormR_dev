import   React           from 'react';
import { Switch, Route } from 'react-router-dom';

import   AuthService     from './services/AuthService.js';

import   Login           from './components/LoginForm.js';
import   Logout          from './components/Logout.js';
import   Register        from './components/RegisterForm.js';
import   Profile         from './components/ProfilePage.js';

import   NavBarNone      from './components/NavBarNone.js';

function App() {

     var currentUser = "",
         isUser      =  false,
         isEditor    =  false,
         isAdmin     =  false,
         aRole       =  undefined
 
     var user        =  AuthService.getCurrentUser();

     if (user) {
         isUser      =  true
 //        isEditor    =  user.roles.includes( "ROLE_EDITOR" )
 //        isAdmin     =  user.roles.includes( "ROLE_ADMIN"  )
         }

   //      aRole       =  isAdmin  ? "admin"  : ""
   //      aRole       =  isEditor ? "editor" : aRole
         aRole       =  isUser   ? "user"   : aRole

 return (
         <div>

           <NavBarNone></NavBarNone>

           <div>
             <Switch>
               <Route exact path="/login"    component={Login}    />
               <Route exact path="/logout"   component={Logout}   />
               <Route exact path="/register" component={Register} />
               <Route exact path="/profile"  component={Profile}  />
             </Switch>
           </div>
         </div>
         ); // eom return ( ... )
 
       } // eof App

export default App;
