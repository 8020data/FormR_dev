import React from 'react'
import { Link  } from 'react-router-dom';

export default function Header() {

  return (

    <nav   className="main-header navbar navbar-expand navbar-white navbar-light">
{/* <nav   className=            "navbar navbar-expand navbar-dark bg-dark"> */}


    <ul    className="navbar-nav">{/* Left menu links */}

      <li  className="nav-item">{/* Home */}
        <a className="nav-link" data-widget="pushmenu" href="#/" role="button"><i className="fas fa-bars" /></a>
      </li>{/* Push Menu */}

{/*   <a   className="navbar-brand" href="/tutorials" > bezKoder </a> */}
{/*   <li  className="nav-item"><Link to={"/tutorials"} className="nav-link"> bezKoder </Link></li>

      <li  className="nav-item d-none d-sm-inline-block"> */}{/* Home */}{/*
        <a href="index3.html" className="nav-link">Home</a>
      </li>*/}{/* Home */}{/*
 */}
      <div   className="navbar-nav mr-auto">
        <li  className="nav-item"><Link to={"/tutorials"} className="nav-link"> bezKoder  </Link></li>
        <li  className="nav-item"><Link to={"/tutorials"} className="nav-link"> Tutorials </Link></li>
        <li  className="nav-item"><Link to={"/add"}       className="nav-link"> Add       </Link></li>
      </div>

      <li  className="nav-item d-none d-sm-inline-block">{/* Contact */}
        <a href="#/" className="nav-link">Contact</a>
      </li>{/* Contact */}

    </ul>

    <form         className="form-inline ml-3">{/* SEARCH FORM */}
      <div        className="input-group input-group-sm">
        <input    className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
        <div      className="input-group-append">
          <button className="btn btn-navbar" type="submit">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </form>{/* Search */}


  <ul className="navbar-nav ml-auto">{/* Right navbar links */}

    <li className="nav-item dropdown">{/* Messages Dropdown Menu */}

      <a className="nav-link" data-toggle="dropdown" href="#/">
        <i className="far fa-comments" />
        <span className="badge badge-danger navbar-badge">3</span>
      </a>

      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">

        <a href="#/" className="dropdown-item">

          <div className="media">{/* Message Start */}
            <img src="/dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
            <div className="media-body">
              <h3 className="dropdown-item-title">
                Brad Diesel
                <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
              </h3>
              <p className="text-sm">Call me whenever you can...</p>
              <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
            </div>
          </div>
          {/* Message End */}
        </a>

        <div className="dropdown-divider" />

        <a href="#/" className="dropdown-item">{/* Message Start */}

          <div className="media">
            <img src="/dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
            <div className="media-body">
              <h3 className="dropdown-item-title">
                John Pierce
                <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
              </h3>
              <p className="text-sm">I got your message bro</p>
              <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
            </div>
          </div>

        </a>{/* Message End */}

        <div className="dropdown-divider" />

        <a href="#/" className="dropdown-item">{/* Message Start */}
          {/* Message Start */}
          <div className="media">
            <img src="/dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
            <div className="media-body">
              <h3 className="dropdown-item-title">
                Nora Silvester
                <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
              </h3>
              <p className="text-sm">The subject goes here</p>
              <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
            </div>
          </div>

        </a>{/* Message End */}

        <div className="dropdown-divider" />
        <a href="#/" className="dropdown-item dropdown-footer">See All Messages</a>
      </div>
    </li>

    <li className="nav-item dropdown"> {/* Notifications Dropdown Menu */}

      <a className="nav-link" data-toggle="dropdown" href="#/">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">15</span>
      </a>

      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">

        <span className="dropdown-item dropdown-header">15 Notifications</span>

        <div className="dropdown-divider" />
        <a href="#/" className="dropdown-item">
          <i className="fas fa-envelope mr-2" /> 4 new messages
          <span className="float-right text-muted text-sm">3 mins</span>
        </a>

        <div className="dropdown-divider" />

        <a href="#/" className="dropdown-item">
          <i className="fas fa-users mr-2" /> 8 friend requests
          <span className="float-right text-muted text-sm">12 hours</span>
        </a>

        <div className="dropdown-divider" />

        <a href="#/" className="dropdown-item">
          <i className="fas fa-file mr-2" /> 3 new reports
          <span className="float-right text-muted text-sm">2 days</span>
        </a>

        <div className="dropdown-divider" />

        <a href="#/" className="dropdown-item dropdown-footer">See All Notifications</a>
      </div>
    </li>{/* Messages End */}

    <li  className="nav-item">
      <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#/" role="button"><i className="fas fa-th-large" /></a>
    </li>

  </ul>

</nav>
  )
}
