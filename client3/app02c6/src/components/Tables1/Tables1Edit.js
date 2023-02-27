   import * as React            from 'react';
   import { Admin, Resource }   from 'react-admin';
// import { ListGuesser }       from 'react-admin';

   import   restServerProvider  from 'ra-data-simple-rest';
// import   jsonServerProvider  from 'ra-data-json-server';

// import { UserList   }        from "../components/IODD/UserTable.js";                 // .(10321.04.5 Beg RAM Add extra dot.  Why?) 
   import { UserList   }        from "./UserTable.js";                                  // .(10322.02.4 Beg RAM Change files names).(10322.03.1 Beg RAM Get rid of extra dots.  Why?)
   import { UserEdit   }        from "./UserTable.js";
   import { UserCreate }        from "./UserTable.js";                                  // .(10322.02.4 End)
   import   UserIcon            from '@material-ui/icons/Group'; 

   import { TutorialList   }    from "./TutorialTable.js";                              // .(10322.02.1 RAM Add Other UserTables)
   import { TutorialEdit   }    from "./TutorialTable.js";
   import { TutorialCreate }    from "./TutorialTable.js";                              // .(10321.04.5).(10322.03.1 End) 
   import   TutorialIcon        from '@material-ui/icons/Book';

// import   Dashboard           from "./Tables1Home.js";                                // .(10322.04.1 RAM Add Welcome Page)
   import { Tables1Home as Dashboard } from "./Tables1Home.js";                   // .(10322.04.2 RAM Add Welcome Page)

   const   API_URL     =  process.env.REACT_APP_API_URL + "/api";                       // .(01108.02.1 RAM get from .ENV file. Using REACT_APP special prefix)
// const   dataService =  jsonServerProvider( 'https://jsonplaceholder.typicode.com') } //#.(10314.06.1)
// const   dataService =  restServerProvider( 'http://localhost:50307/api' )            //#.(10314.06.1 RAM Don't hard code server Hostname and port)
   const   DataService =  restServerProvider(   API_URL );                              // .(10314.06.1 RAM Use REACT_APP_API_URL setin .env file)

// const    App             = ( ) =>          ( ... )  
// const    App             = ( ) => { return ( ... ) } 
     var    App = function App( )    { 

        return ( 

          <Admin
            dashboard       = { Dashboard    }
            dataProvider    = { DataService  }
            >
            <script> alert( "App.js" ) </script>
            <Resource 
              name          =  "users"    
              icon          = { UserIcon   } 
              list          = { UserList   } 
              edit          = { UserEdit   } 
              create        = { UserCreate } 
              />
           <Resource 
              name          =  "tutorials"    
              icon          = { TutorialIcon   }   
              list          = { TutorialList   } 
              edit          = { TutorialEdit   } 
              create        = { TutorialCreate } 
              /> 
          </Admin>
          );
        }

export default App;


