   import   React                 from "react";
   import { useEffect, useState } from 'react';
   import { useHistory }          from "react-router-dom";
   import   AuthService           from "../../services/AuthService";

        function ProfilePage() {                                       // .(10419.01.11)
//async function ProfilePage() {                                       //#.(10419.01.11)
//  let history = useHistory();
    var history = useHistory();                                        // .(10424.03.1) 

//  var currentUser = AuthService.getCurrentUser();

/* if (!currentUser) {
        localStorage.message = "You are not logged in";
 return history.push("/home");
//      window.location.reload();
        }
*/ 
//  --------------------------------------------------------------------------------
    var   isFetching = 'no'
//  var   isLoggedIn =  false                                          //#.(10424.02.1)  

//  var [ isFetching,  setIsFetching  ] = useState( 'no' );
    var [ currentUser, setCurrentUser ] = useState(  null );
    
//      ----------------------------------------------------------------------

//        useEffect(   async ( ) => {  // no workie
//        useEffect(         ( ) => {
          useEffect( function( )    {
    
          getData()                                                     // .(10424.06.1 Beg RAM So we'll try .then( ).catch( ) )

//        ----------------------------------------------------------

   async  function getData( ) {

    try {
//        setIsFetching( 'yes' );
      var response = await AuthService.getCurrentUserFromServer( )      // .(10424.06.1 RAM It's undefined. Not a Promise. Not a value??? )

//        --------------------------------------------------

//        setIsFetching( 'done' );
      if (response && response.message) {
//        SndMessage(  "You are not logged in" )                        //#.(10423.01.1 RAM Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
                                                                        //#                          1. You might have mismatching versions of React and the renderer (such as React DOM)
                                                                        //#                          2. You might be breaking the Rules of Hooks
                                                                        //#                          3. You might have more than one copy of React in the same app
          console.log( "ProfilePage[ 50] " + response.message )
          setCurrentUser( { message: "You are not logged in." } );      // .(10423.08.1 RAM Send message this way)
//        localStorage.message = currentUser.message;                   //#.(10424.02.4 RAM Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.) 
//        isLoggedIn = false                                            //#.(10424.02.6 RAM Assignments to the 'isLoggedIn' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useEffect )
          return                                                        // .(10424.02.9 RAM Fails with no error message if a variable is set in useEffect)

          } // eif response.message
//        --------------------------------------------------

//        isLoggedIn = true                                             //#.(10424.02.7)
          response   = JSON.parse( localStorage.getItem( 'user') )  // .(10424.07.1 RAM We'll get response from localStorage)       
          setCurrentUser(                 response   );
//        setCurrentUser( JSON.stringify( response ) );
          return 

//        --------------------------------------------------

      } catch( error ) {
          console.log( error );
//        setIsFetching(  'error' );
          setCurrentUser(  null   );
          return 

          } // eoe catch
//        --------------------------------------------------
        
          } // eof getData                                              //#.(10424.06.1 End)
//        ----------------------------------------------------------
/*                                                                      //#.(10424.06.2 RAM Uncaught TypeError: _services_AuthService__WEBPACK_IMPORTED_MODULE_2__.default.getCurrentUserFromServer(...).then is not a function)
          AuthService.getCurrentUserFromServer( ).then                  //#.(10424.06.1 Beg RAM We'll try .then().catch(), it it no workie)
//        (         ( ) { ... },         ( error ) { ... } )          
//        ( function( ) { ... }, function( error ) { ... } )          

//        --------------------------------------------------

          ( ( response ) => {
          if (response && response.message) {
              console.log( "ProfilePage[ 86] " + response.message )
              setCurrentUser( { message: "You are not logged in." } );  // .(10423.08.1 RAM Send message this way)
              return                                                    // .(10424.02.9 RAM Fails with no error message if a variable is set in useEffect)

              } // eif response.message
//            -----------------------------------------

//            isLoggedIn = true                                         //#.(10424.02.7)
              response   = JSON.parse( localStorage.getItem( 'user') )  // .(10424.07.1 RAM We'll get response from localStorage)       
              setCurrentUser( response );             

              return 

              } // eof onSuccess 
//        --------------------------------------------------

          , ( error ) => {
//            isLoggedIn = false                                        //#.(10424.02.8)
//            setIsFetching(  'error' );
          var resMessage = ( error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
              localStorage.message = resMessage;
              console.log( "ProfilePage[106] error" + resMessage )
              setCurrentUser( { message: "You are not logged in." } );  // .(10423.08.1 RAM Send message this way)
//            history.push( "/home" );                                  // .(10524.08.15 RAM Can't use inside of useEffect)
              return 

              } // eof onFailure
//        --------------------------------------------------

            ) // eop then                                               //#.(10424.06.1 End)                                        
//        ----------------------------------------------------------
*/                                                                      //#.(10424.06.2 End)                                           
        }, [] );  // eof useEffect( function( ) { ... }, [ ] ) 
//      ----------------------------------------------------------------------


     if (!currentUser) { return null }                    // .(10424.02.1 RAM Still need to deal with React's rendering before currentUser is populated)

/*    if (!isLoggedIn) {                                  //#.(10424.02.8 Beg RAM Let's try this, but no workie)
          SndMessage( "You are not logged in" )           
          return null                                     // .(10423.01.2 RAM Gotta return blank rendered JSX)
          }                                               // .(10424.02.8 End)
*/          
      if (currentUser && currentUser.message) {           // .(10423.01.1 Beg RAM Send message this way here).(10424.02.8 Beg)
          SndMessage( currentUser.message )            //*** .(10424.02.3 RAM Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.)
//        localStorage.message = currentUser.message;     //#.(10424.02.4 RAM Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.) 
// return history.push( "/home" );                        //#.(10424.02.5) 
          return null                                     // .(10423.01.2 RAM Gotta return blank rendered JSX)
          }                                               // .(10423.01.1 End).(10424.02.8 End)
          
//        ------------------------------------------------------

function  SndMessage( aMsg )  {
//  var   history = useHistory();                         // .(10424.03.2 RAM Warning: React has detected a change in the order of Hooks called by ProfilePage. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks)
          localStorage.message = aMsg;                 //*** .(10424.02.4 RAM Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.)  
   return history.push( "/home" );
       // window.location.reload();
          }
//        ------------------------------------------------------
  return (
    
    <div className="modal-dialog">
      <div className="card card-info card-dark ">
        <div className="card-header">
          <h3 className="card-title">User Profile</h3>
        </div>
        <br></br>
        <h5>Username:       { currentUser.username }</h5>
        <p>id:              { currentUser.id }</p>
        <p>Email:           { currentUser.email }</p>
        <p>Active:          { currentUser.active }</p>
        <p>Role:            { currentUser.role }</p>
        <p>Password Date:   { currentUser.passworddate }</p>
        <p>Token(20):       { currentUser.accessToken.substr( currentUser.accessToken.length - 20 ) }</p>
        <p>localStorage:    {             localStorage.getItem( 'user' )      }</p>
        <p>localStorage.id: { JSON.parse( localStorage.getItem( 'user' ) ).id }</p>
      </div>
    </div>
  );
}

export default ProfilePage;
