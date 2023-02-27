import React from 'react'

export default function Menu() {

  return (

<aside className="main-sidebar sidebar-dark-primary elevation-4">{/* Main Sidebar Container */}

  <a href="index3.html" className="brand-link">{/* Brand Logo */}
    <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">AdminLTE 3</span>
  </a>

  <div className="sidebar">{/* Sidebar */}

    <div className="user-panel mt-3 pb-3 mb-3 d-flex">{/* Sidebar user panel (optional) */}
      <div className="image">
        <img src="/dist/img/rm40815)_Robin.Mattern@Sicomm (140x140).png" className="img-circle elevation-2" alt="User" />
      </div>
      <div className="info">
        <a href="#/" className="d-block">Robin Mattern</a>
      </div>
    </div>{/* Sidebar user panel (optional) */}

    <nav className="mt-2">{/* Sidebar Menu */}

      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class with font-awesome or any other icon font library */}

        <li className="nav-item has-treeview menu-open">

          <a href="#/" className="nav-link active">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Tables
              <i className="right fas fa-angle-left" />
            </p>
          </a>{/* Tables */}

          <ul className="nav nav-treeview">

            <li className="nav-item">
              <a href="./index.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Table 1</p>
              </a>
            </li>{/* Table 1 v1 */}

            <li className="nav-item">
              <a href="./index2.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Table 2</p>
              </a>
            </li>{/* Table 2 */}

            <li className="nav-item">
              <a href="./index3.html" className="nav-link active">
                <i className="far fa-circle nav-icon" />
                <p>Table 3</p>
              </a>
            </li>{/* Table 3 */}
          </ul>

        </li>{/* Tables */}

        <li className="nav-item has-treeview">

          <a href="#/" className="nav-link">
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              Views
              <i className="right fas fa-angle-left" />
            </p>
          </a>{/* Views */}

          <ul className="nav nav-treeview">

            <li className="nav-item">
              <a href="pages/charts/chartjs.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>ChartJS</p>
              </a>
            </li>{/* View 1 */}

            <li className="nav-item">
              <a href="pages/charts/flot.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Flot</p>
              </a>
            </li>{/* View 2 */}

          </ul>
        </li>{/* Views */}

      </ul>
    </nav> {/* Sidebar-menu */}

  </div> {/* Sidebar */}

</aside> /* Main Sidebar Container */

  )
}
