import React, { Component } from "react";
import Members_projectDataService     from "../services/members_project.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class Members_projectsList extends Component {

  constructor( props ) {

    super( props );
    

    this.onChangeSearchmemberId = this.onChangeSearchmemberId.bind( this );
    this.retrieveMembers_projects        = this.retrieveMembers_projects.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveMembers_project        = this.setActiveMembers_project.bind(        this );
    this.removeAllMembers_projects       = this.removeAllMembers_projects.bind(       this );
    this.searchBymemberId       = this.searchBymemberId.bind( this );       // .(01118.03.1 Use CamelCase memberId)

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  members_projects         : [ ]
     ,  currentMembers_project   :  null
     ,  currentIndex    : -1
     ,  searchmemberId  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveMembers_projects();
    }

  onChangeSearchmemberId(e) {
                     const searchmemberId = e.target.value;
                           this.setState( { searchmemberId: searchmemberId } );
    }

  retrieveMembers_projects() {
    Members_projectDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { members_projects: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveMembers_projects();
                           this.setState( { currentMembers_project: null, currentIndex: -1 } );
    }

  setActiveMembers_project( members_project, index ) {
                           this.setState( { currentMembers_project: members_project, currentIndex: index } );
    }

  removeAllMembers_projects() {
    Members_projectDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchBymemberId() {                                                  // .(01118.03.2 RAM Change name of search method)
    Members_projectDataService.findBymemberId( this.state.searchmemberId )
      .then( response => { console.log( response.data );
                           this.setState( { members_projects: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchmemberId, members_projects, currentMembers_project, currentIndex } = this.state;

                                                          // .(01107.02.5 Beg RAM Added conditional buttons)
//            to    = { '/users/' + currentIndex + 1 }    // .(01118.01.2 RAM Should be currentMembers_project.id, not currentIndex + 1. but it fails
    const    nId    = currentMembers_project ? currentMembers_project.id : 0   //              because the page is rendered before api data is received)

    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/members_projects/' + nId   }        // .(01118.01.3) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/members_projects/add' }  
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
              placeholder="Search by memberId"
              value={searchmemberId}
              onChange={this.onChangeSearchmemberId}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBymemberId}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Members_projects List</h4>

          <ul className="list-group">
            {members_projects &&
              members_projects.map( ( members_project, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveMembers_project( members_project, index ) }
                  key       = {index}
                  >
                  {members_project.memberId}             {/* .(01118.03.3 Use Table's "search" column name: memberId) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllMembers_projects}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentMembers_project ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Members_project</h4>

              <div><label><strong>id:    </strong></label>{" "}{currentMembers_project.id}    </div>
              <div><label><strong>memberId:    </strong></label>{" "}{currentMembers_project.memberId}    </div>
              <div><label><strong>projectId:    </strong></label>{" "}{currentMembers_project.projectId}    </div>
              <div><label><strong>sort:    </strong></label>{" "}{currentMembers_project.sort}    </div>
              <div><label><strong>role:    </strong></label>{" "}{currentMembers_project.role}    </div>
              <div><label><strong>duration:    </strong></label>{" "}{currentMembers_project.duration}    </div>
              <div><label><strong>dates:    </strong></label>{" "}{currentMembers_project.dates}    </div>

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentMembers_project ) { ... }

            <div>
              <br />
              <p>Please click on a Members_project...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
