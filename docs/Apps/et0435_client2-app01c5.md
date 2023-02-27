# Client2 App01c4  (435)  
## Login Forms with AdminLTE, React+Formik+Yup+JWT Auth
  
<img src="Apps/images/et0435-01_client2-app01c5-screen1.png" class="img4"><br>     

## Notes:
This example adds AdminLTE and Bootstrap styles to the React Formik login forms, e.g. `navbar navbar-expand navbar-dark bg-dark`.  The code below is contained in a React Class Component in the script, `navbar-none.component.js`.  

Other observations:

  - 
 

</br></br>

## Code:  
```
import React, { Component }    from "react";
import {             Link } from "react-router-dom";

// ----------------------------------------------------------------------------

export default class NavBar extends Component {

  // -------------------------------------------------------------------

  render() {

    // -----------------------------------------------------------

    return (

        <nav className="navbar navbar-expand navbar-dark bg-dark">

              <Link to={"/"}            className="navbar-brand">FormR</Link>

          <div className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link to={"/home"}      className="nav-link">Home</Link>
              </li>

          </div>

          <div className="navbar-nav ml-auto">

            <li className="nav-item">
              <Link to={"/login"}    className="nav-link">Login</Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">Sign Up</Link>
            </li>

          </div>

        </nav>

      )  // eom return ( ... )
        // -------------------------------------------------------

    }  // eom render() { ... }
      // ---------------------------------------------------------------

  }  // eoc NavBar extends Component { ... }
    // ------------------------------------------------------------------------

// export default NavBar;
```
</br></br>

## Files:
```
|    Size     | Date Time       |./P08/Master/client2/app01c4/  *
| ----------  |---------------  |--------------------------------------------------------------------------
|           0 |2021-02-24 07:55 |./!_Login Form (React+Formik+Yup+JWT Auth)
|             |                 |
|         673 |2021-02-23 17:26 |./package.json
|        3439 |2021-02-23 17:26 |./README.md
|          52 |2021-02-23 17:53 |./.env
|             |                 |
|           0 |2021-02-24 07:45 |./public
|        3106 |2021-02-23 19:32 |./public/index.html
|          70 |2021-02-23 17:26 |./public/robots.txt
|             |                 |
|           0 |2021-02-23 19:57 |./src
|         914 |2021-02-23 19:57 |./src/App.css
|        5409 |2021-02-23 19:57 |./src/App.js
|         390 |2021-02-23 19:57 |./src/index.js
|             |                 |
|           0 |2021-02-23 19:57 |./src/components
|           0 |2021-02-23 17:26 |./src/components/controls
|        1195 |2021-02-23 17:26 |./src/components/controls/Button.js
|         496 |2021-02-23 17:26 |./src/components/controls/Input.js
|         189 |2021-02-23 17:26 |./src/components/controls/TextError.js
|         948 |2021-02-23 17:26 |./src/components/FormikControl.js
|        3974 |2021-02-23 19:57 |./src/components/login.component.js
|        1500 |2021-02-23 19:57 |./src/components/navbar-none.component.js
|        2273 |2021-02-23 19:57 |./src/components/profile.component.js
|        5488 |2021-02-23 19:57 |./src/components/register.component.js
|             |                 |
|           0 |2021-02-24 07:36 |./src/services
|         275 |2021-02-23 19:57 |./src/services/auth-header.js
|         907 |2021-02-23 19:21 |./src/services/auth.service.js
```
 