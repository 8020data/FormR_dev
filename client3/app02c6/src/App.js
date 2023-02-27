   import   React           from 'react';
   import { Switch, Route } from 'react-router-dom';

   import   AuthService     from './services/AuthService.js';

   import   Login           from './components/Access/LoginForm.js';                   // .(10321.04.9 Beg RAM Put these into Access folder)
   import   Logout          from './components/Access/Logout.js';
   import   Register        from './components/Access/RegisterForm.js';
   import   Profile         from './components/Access/ProfilePage.js';                 // .(10321.04.9 End)

   import   AdminEdit       from './components/Admin/AdminEdit.js';                    // .(10321.03.2).(10322.01.1 RAM Was UserAdmin) 
// import   Tables1Edit     from './components/Tables1/Tables1Edit.js';               //#.(10322.01.2 RAM Add React-Admin pages for IODD tables) 
   import   WorldEdit       from './components/World/WorldEdit.js';                  // .(10326.03.8 RAM Add React-Admin pages for World tables) 

   import   NavBarPublic    from './components/Access/NavBarPublic.js';
   import   NavBarAdmin     from './components/Access/NavBarAdmin.js';                 // .(10321.03.2) 
   import   NavBarTables1   from './components/Access/NavBarTables1.js';               // .(10322.01.3) 
// import   NavBarAdmin     from './components/AppBar/navbar-admin.component.js';
// import   NavBarEditor    from './components/AppBar/navbar-moderator.component.js';

   function App() {

//      var currentUser = ""
        var isUser      =  false
        var isAdmin     =  false        
//      var isEditor    =  false
//          aRole       =  undefined
 
        var user        =  AuthService.getCurrentUser();  console.log( user )

        if (user) {                                                                     // .(10321.07.1 RAM It was here)
//          isUser      =  user.roles.includes( 'ROLE_USER'  )
//          isAdmin     =  user.roles.includes( 'ROLE_ADMIN'  )
//          isEditor    =  user.roles.includes( 'ROLE_EDITOR' )

            isUser      =  user.role === 'User'   
            isUser      =  user.role === 'Editor'                                       // .(10321.09.1 RAM)
            isAdmin     =  user.role === 'Admin'  
//          isEditor    =  user.role === 'editor'  
            }                                                                           // .(10321.07.2)
            
        var AppBar      =              NavBarPublic
            AppBar      =  isUser   ?  NavBarTables1 :  AppBar                          // .(10322.01.4)
            AppBar      =  isAdmin  ?  NavBarAdmin   :  AppBar
//          AppBar      =  isEditor ?  NavBarEditor  :  AppBar

//      var aRole       =             "guest" 
//          aRole       =  isUser   ? "user"        :  aRole
//          aRole       =  isAdmin  ? "admin"       :  aRole
//          aRole       =  isEditor ? "editor"      :  aRole

 return (
         <div>

           <AppBar/>

           <div>
             <Switch>
               <Route exact path="/login"    component={Login        } />
               <Route exact path="/logout"   component={Logout       } />
               <Route exact path="/register" component={Register     } />
               <Route exact path="/profile"  component={Profile      } />

               <Route exact path="/Admin"    component={AdminEdit    } />              {/* .(10321.03.2).(10322.01.5 RAM Was UserAdmin) */}
{/*            <Route exact path="/tables1"  component={Tables1Edit  } />           */}{/* .(10322.01.6) */}
               <Route exact path="/World"    component={WorldEdit    } />              {/* .(10326.03.8) */}

             </Switch>
           </div>
         </div>
         ); // eom return ( ... )
 
       } // eof App

export default App;
