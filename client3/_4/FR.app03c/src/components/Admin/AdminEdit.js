   import * as React            from 'react';
   import { Admin, Resource }   from 'react-admin';
// import { ListGuesser }       from 'react-admin';

   import   restServerProvider  from 'ra-data-simple-rest';
// import   jsonServerProvider  from 'ra-data-json-server';

// import { UserList   }        from "../components/User.components.js";                // .(10321.04.5 Beg RAM Add extra dot.  Why?)
   import { UserList   }        from "./AdminUserTable.js";                             // .(10322.02.8 Beg RAM Change files names).(10322.03.1 Beg RAM Get rid of extra dots.  Why?)
   import { UserEdit   }        from "./AdminUserTable.js";
   import { UserCreate }        from "./AdminUserTable.js";
   import   UserIcon            from '@material-ui/icons/Group';

   import { RoleList   }        from "./AdminRoleTable.js";
   import { RoleEdit   }        from "./AdminRoleTable.js";
   import { RoleCreate }        from "./AdminRoleTable.js";                             // .(10322.02.8 End) 
   import   RoleIcon            from '@material-ui/icons/Book';

   import { Admin_Dashboard as Dashboard } from "./AdminHome.js";                       // .(10322.04.2 RAM Add Welcome Page)

   const   API_URL     =  process.env.REACT_APP_API_URL + "/api/formr";                 // .(10322.01.6 RAM Was "/api")
   const   DataService =  restServerProvider(   API_URL );                              // .(10314.06.1 RAM Use REACT_APP_API_URL setin .env file)

// const    App             = ( ) =>          ( ... )  
// const    App             = ( ) => { return ( ... ) } 
      var   App = function App( )    { 
        return ( 

          <Admin

            dashboard       = { Dashboard    }
            dataProvider    = { DataService  }
            >
            <Resource 
              name          =  "users"    
              icon          = { UserIcon   } 
              list          = { UserList   } 
              edit          = { UserEdit   } 
              create        = { UserCreate } 
              />
           <Resource 
              name          =  "roles"    
              icon          = { RoleIcon   }   
              list          = { RoleList   } 
              edit          = { RoleEdit   } 
              create        = { RoleCreate } 
              /> 
          </Admin>
          );
        }

export default App;


