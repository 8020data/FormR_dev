   import   React         from 'react'
   import { Admin,
            Resource    } from 'react-admin'
   import { ListGuesser } from 'react-admin'

   import   restProvider  from 'ra-data-simple-rest'
// import   restProvider  from './services/dataServiceProvider.js'

   import { UserList   }  from './components/User.components.js'
   import { UserEdit   }  from './components/User.components.js'
   import { UserCreate }  from './components/User.components.js'

   import { RoleList   }  from './components/Role.components.js'
   import { RoleEdit   }  from './components/Role.components.js'
   import { RoleCreate }  from './components/Role.components.js'

   /*  const   UserResource = function() {
            return (
              <Resource
                name  =  'users'
                list  = { ListGuesser }
                />
            ) }
  */
    const   dataService  =  restProvider( 'http://localhost:50307/api' )

   function App() {
     return (

       <Admin dataProvider = { dataService }>
{/*      <UserResource/>  */}
         <Resource
           name  =  'users'
//         list  = { ListGuesser }
           list  = { UserList    }
           create= { UserCreate  }
           edit  = { UserEdit    }
           />
         <Resource
           name  =  'roles'
//         list  = { ListGuesser }
           list  = { RoleList    }
           create= { RoleCreate  }
           edit  = { RoleEdit    }
           />
       </Admin>
     )
   }

   export default App