   import * as React            from 'react';
   import { Admin, Resource }   from 'react-admin';
// import { ListGuesser }       from 'react-admin';

   import   restServerProvider  from 'ra-data-simple-rest';
// import   jsonServerProvider  from 'ra-data-json-server';
                                                                                       // .(10326.03.11 Add City Tables) 
// import { UserList   }        from "../components/IODD/UserTable.js";                // .(10321.04.5 Beg RAM Add extra dot.  Why?) 
   import { CityList   }        from "./CityTable.js";                                 // .(10322.02.4 Beg RAM Change files names).(10322.03.1 Beg RAM Get rid of extra dots.  Why?)
   import { CityEdit   }        from "./CityTable.js";                       
   import { CityCreate }        from "./CityTable.js";                                 // .(10322.02.4 End)
   import   CityIcon            from '@material-ui/icons/Group'; 

                                                                                       // .(10326.03.12 Add City Tables) 
   import { CountryList   }    from "./CountryTable.js";                              // .(10322.02.1 RAM Add Other UserTables)
   import { CountryEdit   }    from "./CountryTable.js";
   import { CountryCreate }    from "./CountryTable.js";                              // .(10321.04.5).(10322.03.1 End) 
   import   CountryIcon        from '@material-ui/icons/Book';

// import   Dashboard           from "./Tables1Home.js";                                // .(10322.04.1 RAM Add Welcome Page)
   import { Tables1Home as Dashboard } from "./WorldHome.js";                          // .(10326.03.13 RAM Was Tables1Admin)

// const   API_URL     =  process.env.REACT_APP_API_URL + "/api";                       // .(103xx.03.15 RAM get from .ENV file. Using REACT_APP special prefix)
   const   API_URL     =  process.env.REACT_APP_API_URL + "/api/world";                 // .(10326.03.15 RAM Add DBSN to path)
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
              name          =  "City"                    // .(10326.03.9 RAM Add World Table)
              icon          = { CityIcon   } 
              list          = { CityList   } 
              edit          = { CityEdit   } 
              create        = { CityCreate } 
              />
           <Resource 
              name          =  "Countries"                // .(10326.03.9 RAM Add World Table)    
              icon          = { CountryIcon   }   
              list          = { CountryList   } 
              edit          = { CountryEdit   } 
              create        = { CountryCreate } 
              /> 
          </Admin>
          );
        }

export default App;


