   import * as React            from 'react';
   import { Admin, Resource }   from 'react-admin';
// import { ListGuesser }       from 'react-admin';

   import   restServerProvider  from 'ra-data-simple-rest';
// import   jsonServerProvider  from 'ra-data-json-server';

// import   MyLayout            from './MyLayout';
   import   Dashboard           from './dashboard';
   import   AuthProvider        from './authProvider';
   
   import { PostList, PostEdit
          , PostCreate
          , PostShow }          from './posts';
   import   PostIcon            from '@material-ui/icons/Book';
// import { UserList }          from './users';

   import { UserList   }        from "./components/User.components.js";
   import { UserEdit   }        from "./components/User.components.js";
   import { UserCreate }        from "./components/User.components.js";
   import   UserIcon            from '@material-ui/icons/Group';

   import { RoleList   }        from "./components/Role.components.js";
   import { RoleEdit   }        from "./components/Role.components.js";
   import { RoleCreate }        from "./components/Role.components.js";

// import   AuthService         from './services/AuthService.js';
  
// import   Login               from './components/LoginForm.js';
// import   Logout              from './components/Logout.js';
// import   Register            from './components/RegisterForm.js';
// import   Profile             from './components/ProfilePage.js';

// const    App             = ( ) =>          ( ... )  
// const    App             = ( ) => { return ( ... ) } 


   const   API_URL     =  process.env.REACT_APP_API_URL + "/api";                   // .(01108.02.1 RAM get from .ENV file. Using REACT_APP special prefix)
// const   dataService =  restServerProvider( 'http://localhost:50307/api' )        //#.(10314.06.1 RAM Don't hard code server Hostname and port)
   const   dataService =  restServerProvider(   API_URL );                          // .(10314.06.1 RAM Use REACT_APP_API_URL setin .env file)
// const   dataService =  jsonServerProvider( 'https://jsonplaceholder.typicode.com' ) }

      var   App = function App( )    { 
        return ( 

          <Admin
    /*      layout          = { MyLayout     }    */
            dataProvider    = { dataService  }
            authProvider    = { AuthProvider }
            dashboard       = { Dashboard    }
            >
    {/*     <Resource           
              name          =  "posts"
              icon          = { PostIcon   }
              list          = { PostList   }
              edit          = { PostEdit   }
              create        = { PostCreate }
              show          = { PostShow   }
              />   */}
            <Resource 
              name          =  "users"    
              icon          = { UserIcon   } 
              list          = { UserList   } 
              edit          = { UserEdit   } 
              create        = { UserCreate } 
              />
           <Resource 
              name          =  "roles"    
              icon          = { PostIcon   }   
              list          = { RoleList   } 
              edit          = { RoleEdit   } 
              create        = { RoleCreate } 
              /> 
    {/*     <Resource 
              name          =  "comments" 
              list          = { ListGuesser } 
              />  */}
          </Admin>
          );
        }

export default App;


