var authProvider = {

    login: ( { username } ) => {                        // called when the user attempts to log in
        localStorage.setItem( 'username', username );   // accept all username/password combinations
        return Promise.resolve();
        }

  , logout: () => {                                     // called when the user clicks on the logout button
        localStorage.removeItem( 'username' );
        return Promise.resolve();
        }

  , checkError: ( { status } ) => {                     // called when the API returns an error
    if (status === 401 || status === 403) {
        localStorage.removeItem( 'username' );
        return Promise.reject( );
    } else {
        return Promise.resolve( );
        }  }

  , checkAuth: () => {                                  // called when the user navigates to a new location, to check for authentication
    if (localStorage.getItem( 'username' )) {
        return Promise.resolve( )
    } else {
        return Promise.reject( );
        }  }

  , getPermissions: () => {
        return Promise.resolve()                        // called when the user navigates to a new location, to check for permissions / roles
        }
    };

export default authProvider 