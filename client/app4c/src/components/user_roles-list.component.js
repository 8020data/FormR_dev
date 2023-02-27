import React, { Component } from "react";
import User_roleDataService     from "../services/user_roles.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class User_rolesList extends Component {

  constructor( props ) {

    super( props );
    

    this.onChangeSearchroleid = this.onChangeSearchroleid.bind( this );
    this.retrieveUser_roles        = this.retrieveUser_roles.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveUser_role        = this.setActiveUser_role.bind(        this );
    this.removeAllUser_roles       = this.removeAllUser_roles.bind(       this );
    this.searchByroleid       = this.searchByroleid.bind( this );       // .(01118.03.1 Use CamelCase roleid)

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  user_roles         : [ ]
     ,  currentUser_role   :  null
     ,  currentIndex    : -1
     ,  searchroleid  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveUser_roles();
    }

  onChangeSearchroleid(e) {
                     const searchroleid = e.target.value;
                           this.setState( { searchroleid: searchroleid } );
    }

  retrieveUser_roles() {
    User_roleDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { user_roles: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveUser_roles();
                           this.setState( { currentUser_role: null, currentIndex: -1 } );
    }

  setActiveUser_role( user_role, index ) {
                           this.setState( { currentUser_role: user_role, currentIndex: index } );
    }

  removeAllUser_roles() {
    User_roleDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchByroleid() {                                                  // .(01118.03.2 RAM Change name of search method)
    User_roleDataService.findByroleid( this.state.searchroleid )
      .then( response => { console.log( response.data );
                           this.setState( { user_roles: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchroleid, user_roles, currentUser_role, currentIndex } = this.state;

                                                          // .(01107.02.5 Beg RAM Added conditional buttons)
//            to    = { '/users/' + currentIndex + 1 }    // .(01118.01.2 RAM Should be currentUser_role.id, not currentIndex + 1. but it fails
    const    nId    = currentUser_role ? currentUser_role.id : 0   //              because the page is rendered before api data is received)

    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/user_roles/' + nId   }        // .(01118.01.3) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/user_roles/add' }  
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

          <h4>User_roles List</h4>

          <ul className="list-group">
            {user_roles &&
              user_roles.map( ( user_role, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveUser_role( user_role, index ) }
                  key       = {index}
                  >
                  {user_role.roleid}             {/* .(01118.03.3 Use Table's "search" column name: roleid) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllUser_roles}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentUser_role ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>User_role</h4>

              <div><label><strong>userId:    </strong></label>{" "}{currentUser_role.userId}    </div>
              <div><label><strong>roleId:    </strong></label>{" "}{currentUser_role.roleId}    </div>

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentUser_role ) { ... }

            <div>
              <br />
              <p>Please click on a User_role...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
