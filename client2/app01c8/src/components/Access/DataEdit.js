  
   import { useHistory } from "react-router-dom";
   import   AuthService  from "../../services/AuthService";


function DataEdit( aDB ) {  
  
  let  history     =   useHistory();
  var  currentUser =   AuthService.getCurrentUser();
  if (!currentUser) {       return goHome( "You are not logged in" ) }

      aDB    =  aDB.toUpperCase() 
 var  aRole  =  currentUser.role    

  if (aDB   === 'USER') {
  if (aRole === 'admin' ) { return goEdit( "You can edit the User Authentication database.", aDB, 'edit' ) }
                            return goHome( `You're not authorized to edit ${aDB} data!` )
      }

  if (aDB   === 'WORLD') {
  if (aRole === 'admin' ) { return goEdit( "You can edit the demo World database.", aDB, 'edit' ) }
  if (aRole === 'editor') { return goHome( "You can edit the demo World database.", aDB, 'edit'  ) }
  if (aRole === 'viewer') { return goHome( "You can view the demo World database.", aDB, 'view'  ) }
                            return goHome( `You're not authorized to access the ${aDB} database!` )
      }

function goEdit(aMsg, aDB, aPriv) {
         goHome( aMsg )
  return false      
         }

function goHome(aMsg) { 
         localStorage.message = aMsg;
         history.push("/home");   // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
//       window.location.reload();
  return false      
         }
      }

  export default DataEdit 

