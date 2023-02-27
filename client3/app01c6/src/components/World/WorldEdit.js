   import * as React            from 'react';
   import { Admin, Resource }   from 'react-admin';
// import { ListGuesser }       from 'react-admin';

   import   restServerProvider  from 'ra-data-simple-rest';
// import   jsonServerProvider  from 'ra-data-json-server';
                                                                                       // .(10326.03.11 Add City Tables) 
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
// import { Tables1Home as Dashboard } from "./WorldHome.js";                          // .(10326.03.13 RAM Was Tables1Admin)

// const   API_URL     =  process.env.REACT_APP_API_URL + "/api";                       // .(103xx.03.15 RAM get from .ENV file. Using REACT_APP special prefix).(10403.03.1)
// const   API_URL     =  process.env.REACT_APP_API_URL + "/api/world";                 // .(10326.03.15 RAM Add DBSN to path)
   const   API_URL     =  process.env.REACT_APP_API_URL + "/api/world";                 // .(10403.03.1 RAM For real)

   const   DataService =  restServerProvider(   API_URL );                              // .(10314.06.1 RAM Use REACT_APP_API_URL setin .env file)

// const    App             = ( ) =>          ( ... )  
// const    App             = ( ) => { return ( ... ) } 
     var    App = function App( )    { 

        return ( 

          <Admin
//          dashboard       = { Dashboard    }
            dataProvider    = { DataService  }
            >
            
            <Resource 
              name          =  "Cities"                   // .(10326.03.9 RAM Add World Table)
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


