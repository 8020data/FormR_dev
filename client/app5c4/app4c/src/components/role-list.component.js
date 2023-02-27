import React, { Component } from "react";
import RoleDataService      from "../services/role.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class RolesList extends Component {

  constructor( props ) {

    super( props );

    this.onChangeSearchName   = this.onChangeSearchName.bind( this );
    this.retrieveRoles        = this.retrieveRoles.bind(      this );
    this.refreshList          = this.refreshList.bind(        this );
    this.setActiveRole        = this.setActiveRole.bind(      this );
    this.removeAllRoles       = this.removeAllRoles.bind(     this );
    this.searchByName         = this.searchByName.bind(       this );                 // .(01118.03.1 Use CamelCase

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  roles         : [ ]
     ,  currentRole   :  null
     ,  currentIndex    : -1
     ,  searchName  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveRoles();
    }

  onChangeSearchName(e) {
                     const searchName = e.target.value;
                           this.setState( { searchName: searchName } );
    }

  retrieveRoles() {
    RoleDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { roles: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveRoles();
                           this.setState( { currentRole: null, currentIndex: -1 } );
    }

  setActiveRole( role, index ) {
                           this.setState( { currentRole: role, currentIndex: index } );
    }

  removeAllRoles() {
    RoleDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchByName() {                                              // .(01118.03.2 Change name of search method)
    RoleDataService.findByName( this.state.searchName )
      .then( response => { console.log( response.data );
                           this.setState( { roles: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchName, roles, currentRole, currentIndex } = this.state;

                                                          // .(01107.02.5 Beg RAM Added conditional buttons)
    const    nId    = currentRole ? currentRole.id : 0    //              Guard against null id because the page is rendered before api data is received)
    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/roles/' + nId }  
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/roles/add' }  
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
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchByName}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Roles List</h4>

          <ul className="list-group">
            {roles &&
              roles.map( ( role, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveRole( role, index ) }
                  key       = {index}
                  >
                  {role.name}             {/* .(01118.03.3 Use Table's "search" column name: ) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllRoles}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentRole ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Role</h4>

              <div><label><strong>id:      </strong></label>{" "}{currentRole.id}    </div>
              <div><label><strong>name:    </strong></label>{" "}{currentRole.name}  </div>

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentRole ) { ... }

            <div>
              <br />
              <p>Please click on a Role...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
