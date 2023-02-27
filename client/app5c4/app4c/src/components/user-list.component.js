import React, { Component } from "react";
import userDataService    from "../services/user.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class usersList extends Component {

  constructor( props ) {

    super( props );

    this.onChangeSearchusername = this.onChangeSearchusername.bind( this );
    this.retrieveusers        = this.retrieveusers.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveuser        = this.setActiveuser.bind(        this );
    this.removeAllusers       = this.removeAllusers.bind(       this );
    this.searchusername         = this.searchusername.bind(         this );

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  users         : [ ]
     ,  currentuser   :  null
     ,  currentIndex    : -1
     ,  searchusername  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveusers();
    }

  onChangeSearchusername(e) {
                     const searchusername = e.target.value;
                           this.setState( { searchusername: searchusername } );
    }

  retrieveusers() {
    userDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { users: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveusers();
                           this.setState( { currentuser: null, currentIndex: -1 } );
    }

  setActiveuser( user, index ) {
                           this.setState( { currentuser: user, currentIndex: index } );
    }

  removeAllusers() {
    userDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchusername() {
    userDataService.findByusername( this.state.searchusername )
      .then( response => { console.log( response.data );
                           this.setState( { users: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchusername, users, currentuser, currentIndex } = this.state;

                                                                // .(01107.02.5 bEG RAM Added conditional buttons)
    const  { isAdmin, isModerator } = this.state;
//              to        = { '/users/' + currentIndex + 1 }    // .(01118.01.2 RAM Should be currentuser.id, not currentIndex + 1. but it fails
    const    nUserId      = currentuser ? currentuser.id : 0    //              because the page is rendered before api data is received)

      var  cEdit = (                                         
              <Link
                to        = { '/users/' + nUserId   }           // .(01118.01.3) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/users/add' }  
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
              placeholder="Search by User Name"
              value={searchusername}
              onChange={this.onChangeSearchusername}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchusername}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>users List</h4>

          <ul className="list-group">
            {users &&
              users.map( ( user, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveuser( user, index ) }
                  key       = {index}
                  >
                  {user.username}     {/* .(01029.02.1 RAM Added FirstName) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllusers}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentuser ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>user</h4>

              <div><label><strong>id:    </strong></label>{" "}{currentuser.id}    </div>
              <div><label><strong>username:    </strong></label>{" "}{currentuser.username}    </div>
              <div><label><strong>email:    </strong></label>{" "}{currentuser.email}    </div>
              <div><label><strong>password:    </strong></label>{" "}{currentuser.password}    </div>
              <div><label><strong>active:    </strong></label>{" "}{currentuser.active}    </div>
              
               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentuser ) { ... }

            <div>
              <br />
              <p>Please click on a user...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
