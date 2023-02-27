   import   React               from 'react';
   import { Link }              from 'react-router-dom';                               // .(10321.01.1 RAM Eliminiates page refresh)

function NavBarAdmin() {

  return (

    <nav    className="main-header navbar navbar-expand navbar-dark  ">     {/* .(10321.01.2 RAM Was class="...") */}

      <Link to={"/"}            className="navbar-brand">
        FormR
      </Link>

      <ul   className="navbar-nav">                                                   {/* .(10321.01.3) */}

        <li className="nav-item d-none d-sm-inline-block">                            {/* .(10321.01.4) */} 
        <Link to={"/home"}      className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">                                                     {/* .(10321.04.1 RAM Added just a link) */}
          <Link to={"/admin"}   className="nav-link">          
            Admin
          </Link>
        </li>

        <li className="nav-item">                                                     {/* .(10321.04.1 RAM Added just a link) */}
          <Link to={"/profile"} className="nav-link">          
            Profile
          </Link>
        </li>

      </ul>

      <ul   className="navbar-nav ml-auto">

        <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Register
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/login"}    className="nav-link">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/logout"}   className="nav-link">
            Logout
          </Link>
        </li>

      </ul>
      
    </nav>
  );
}

export default NavBarAdmin;
