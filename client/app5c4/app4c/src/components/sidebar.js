import React from 'react'
import { Component }        from 'react'
import AuthService          from '../services/auth.service';      // .(01112.01.1)
import TableDataService     from "../services/table.service.js";  // .(01117.01.2)

export default class SideBar extends Component {

  // -------------------------------------------------------------------

  constructor( props ) {

    super( props );

    this.state           =
     {  mTables          :  []
     ,  mViews           :  []
     ,  user             : ""
        };

    }; // eom constructor( props ) { ... }
      // ---------------------------------------------------------------

  // -------------------------------------------------------------------

  componentDidMount() {

// --------------------------------------------------------------------
/*
    async function getTables() {                                        // .(01117.01.2 Beg)

      let mTables = await TableDataService.getAll()
   return mTables.data;

// return           await TableDataService.getAll().data

//  const response  await fetch( process.env.REACT_APP_API_URL +'/api/tables' );
//  const mTables = await response.json();                              // no workie: ??
// return mTables
          }

     this.setState(
        { mTables         :  getTables()                                //   no workie: a Pending Promise ?!??  Needs await, but it not in an async function
        , user            :  AuthService.getCurrentUser()
          } );                                                          // .(01117.01.2 End)

// --------------------------------------------------------------------
*/
    async function setState( pThis ) {                                  // .(01117.01.2 Beg)

      let mTables = await TableDataService.getAll()
//    let mTables = await TableDataService.getAll('Tables')             // .(01117.07.1 RAM I don't think this will work)
//    let mViews  = await TableDataService.getGrp('Views' )             // .(01117.07.2)

      var pState =
//     {  mTables          :  mTables.data
       {  mTables          :  mTables.data.filter( pRec => { return pRec.group === 'Tables' } )  // .(01117.07.3)
       ,  mViews           :  mTables.data.filter( pRec =>          pRec.group === 'Views'    )  // .(01117.07.4)
       ,  user             :  AuthService.getCurrentUser()
          };

//   this.setState( pState )                                            //   pState is defined, but this isn't
    pThis.setState( pState )                                            //   pState is defined, and so is pThis
          }

          setState( this )                                              // .(01117.01.2 End Works! But there must be a cleaner way)

// --------------------------------------------------------------------
/*
    async function getState( pThis ) {                                  // .(01117.01.2 Beg)

      let mTables = await TableDataService.getAll()

      var pState =
       {  mTables          :  mTables.data
       ,  user             :  AuthService.getCurrentUser()
          };
   return pState
          }

//    var pState = getState()                                           //   no workie: a Pending Promise ?!??  Needs await, but it not in an async function
//        this.setState( pState )  // pState is undefined               // .(01117.01.2 End)

// --------------------------------------------------------------------
*/
    }; // eom componentDidMount() { ... }
      // ---------------------------------------------------------------

  render() {

 const { mTables, mViews, user }  = this.state;

//  var  aTables = mTables[3] && mTables[3].name                                // runs multiple times, until this.state is set in componentDidMount
    var  aTables = ''
//   if (mTables.length) {
//       aTables = mTables[3].name
//       }

     if (user) {                                                                // .(01117.04.2 Then this)

    var  isUser      =  user ? true : false;
    var  isModerator =  user.roles.includes( 'ROLE_MODERATOR' );
//  var  isAdmin     =  user.roles.includes( 'ROLE_ADMIN'     );                // .(01120.01.3 RAM Not apropriate anymore)

     if (isUser     ) { aTables = "Tutorials" }
     if (isModerator) { aTables = "Members,Projects,Members_Projects" }
//   if (isAdmin    ) { aTables = "Members,Projects,Members_Projects" }         // .(01120.01.4)
     }                                                                          // .(01112.01.2 End)
//   ----------------------------------------------------

     var mTabs      = []
//  for (const [i, value] of mTables.entries()) { ... }
//   var pTable     = mTables.entries(i)

         mTables.forEach( ( pTable, i ) => {                                    // .(01124.01.3)
//   var aHTML { aTables.match( `/${pTable.name}/i` ) &&  ... }
     var bEnabled   =  pTable.enabled  ===  true                                // .(01120.01.1 RAM Only show enabled tables)
     if (bEnabled  &&  aTables.match( new RegExp( pTable.name, 'i' ) )) {       // .(01120.01.2)
     var aHTML      = (
            <li className="nav-item" key={ i } >                               {/* .(01124.01.4) } */}
              <a  href={pTable.url}  className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>{pTable.name}</p>
              </a>
            </li>
            )
         mTabs.push( aHTML )
         }  // eif aTables.match( .. ) { ... }
       } );  // eol forEach( pTable ) { ... }
//   ----------------------------------------------------

     var mVues      = []
         mViews.forEach( ( pView, i ) => {                                      // .(01124.01.5)
     var bEnabled   =  pView.enabled  === 'true'                                // .(01120.01.3)
     if (bEnabled  &&  aTables.match( new RegExp( pView.name,  'i' ) )) {       // .(01120.01.4)
     var aHTML      = (
            <li className="nav-item" key={ i } >                               {/* .(01124.01.6) } */}
              <a  href={pView.url}  className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>{pView.name}</p>
              </a>
            </li>
            )
         mVues.push( aHTML )
         }  // eif aTables.match( .. ) { ... }
       } );  // eol forEach( pView ) { ... }
//   ----------------------------------------------------

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
            { mTabs }
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
            { mVues }

          </ul>
        </li>{/* Views */}

      </ul>
    </nav> {/* Sidebar-menu */}

  </div> {/* Sidebar */}

</aside> /* Main Sidebar Container */

  )
}

} // eoc NavBar