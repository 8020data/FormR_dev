import React, { Component } from "react";
import Roles_tablesDataService     from "../services/roles_tables.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class Roles_tablesList extends Component {

  constructor( props ) {

    super( props );
    

    this.onChangeSearchroleid = this.onChangeSearchroleid.bind( this );
    this.retrieveRoles_tables        = this.retrieveRoles_tables.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveRoles_tables        = this.setActiveRoles_tables.bind(        this );
    this.removeAllRoles_tables       = this.removeAllRoles_tables.bind(       this );
    this.searchByroleid       = this.searchByroleid.bind( this );       // .(01118.03.1 Use CamelCase roleid)

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  roles_tables         : [ ]
     ,  currentRoles_tables   :  null
     ,  currentIndex    : -1
     ,  searchroleid  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveRoles_tables();
    }

  onChangeSearchroleid(e) {
                     const searchroleid = e.target.value;
                           this.setState( { searchroleid: searchroleid } );
    }

  retrieveRoles_tables() {
    Roles_tablesDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { roles_tables: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveRoles_tables();
                           this.setState( { currentRoles_tables: null, currentIndex: -1 } );
    }

  setActiveRoles_tables( roles_tables, index ) {
                           this.setState( { currentRoles_tables: roles_tables, currentIndex: index } );
    }

  removeAllRoles_tables() {
    Roles_tablesDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchByroleid() {                                                  // .(01118.03.2 RAM Change name of search method)
    Roles_tablesDataService.findByroleid( this.state.searchroleid )
      .then( response => { console.log( response.data );
                           this.setState( { roles_tables: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchroleid, roles_tables, currentRoles_tables, currentIndex } = this.state;

                                                          // .(01107.02.5 Beg RAM Added conditional buttons)
//            to    = { '/users/' + currentIndex + 1 }    // .(01118.01.2 RAM Should be currentRoles_tables.id, not currentIndex + 1. but it fails
    const    nId    = currentRoles_tables ? currentRoles_tables.id : 0   //              because the page is rendered before api data is received)

    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/roles_tables/' + nId   }        // .(01118.01.3) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/roles_tables/add' }  
                className = "badge badge-warning"
                >
                Add
              </Link>   
              )
           cAdd  = ( isAdmin               ) ? cAdd  : null // .(01107.02.5 End).(01108.01.1 RAM Opps, was ? cEdit) 
    
    return (

      <div className="list row">
        <div className="col-md-8">

          <div className="input-group mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Search by roleid"
              value={searchroleid}
              onChange={this.onChangeSearchroleid}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchByroleid}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Roles_tables List</h4>

          <ul className="list-group">
            {roles_tables &&
              roles_tables.map( ( roles_tables, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveRoles_tables( roles_tables, index ) }
                  key       = {index}
                  >
                  {roles_tables.roleid}             {/* .(01118.03.3 Use Table's "search" column name: roleid) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllRoles_tables}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentRoles_tables ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Roles_tables</h4>

              <div><label><strong>id:    </strong></label>{" "}{currentRoles_tables.id}    </div>
              <div><label><strong>tableId:    </strong></label>{" "}{currentRoles_tables.tableId}    </div>
              <div><label><strong>roleId:    </strong></label>{" "}{currentRoles_tables.roleId}    </div>
              <div><label><strong>allowInsert:    </strong></label>{" "}{currentRoles_tables.allowInsert}    </div>
              <div><label><strong>allowUpdate:    </strong></label>{" "}{currentRoles_tables.allowUpdate}    </div>
              <div><label><strong>allowDelete:    </strong></label>{" "}{currentRoles_tables.allowDelete}    </div>

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentRoles_tables ) { ... }

            <div>
              <br />
              <p>Please click on a Roles_tables...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
