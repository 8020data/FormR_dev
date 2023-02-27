import React, { Component } from "react";
import ProjectDataService     from "../services/project.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class ProjectsList extends Component {

  constructor( props ) {

    super( props );
    

    this.onChangeSearchname = this.onChangeSearchname.bind( this );
    this.retrieveProjects        = this.retrieveProjects.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveProject        = this.setActiveProject.bind(        this );
    this.removeAllProjects       = this.removeAllProjects.bind(       this );
    this.searchByname       = this.searchByname.bind( this );       // .(01118.03.1 Use CamelCase name)

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  projects         : [ ]
     ,  currentProject   :  null
     ,  currentIndex    : -1
     ,  searchname  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveProjects();
    }

  onChangeSearchname(e) {
                     const searchname = e.target.value;
                           this.setState( { searchname: searchname } );
    }

  retrieveProjects() {
    ProjectDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { projects: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveProjects();
                           this.setState( { currentProject: null, currentIndex: -1 } );
    }

  setActiveProject( project, index ) {
                           this.setState( { currentProject: project, currentIndex: index } );
    }

  removeAllProjects() {
    ProjectDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchByname() {                                                  // .(01118.03.2 RAM Change name of search method)
    ProjectDataService.findByname( this.state.searchname )
      .then( response => { console.log( response.data );
                           this.setState( { projects: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchname, projects, currentProject, currentIndex } = this.state;

                                                          // .(01107.02.5 Beg RAM Added conditional buttons)
//            to    = { '/users/' + currentIndex + 1 }    // .(01118.01.2 RAM Should be currentProject.id, not currentIndex + 1. but it fails
    const    nId    = currentProject ? currentProject.id : 0   //              because the page is rendered before api data is received)

    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/projects/' + nId   }        // .(01118.01.3) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/projects/add' }  
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
              placeholder="Search by name"
              value={searchname}
              onChange={this.onChangeSearchname}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchByname}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Projects List</h4>

          <ul className="list-group">
            {projects &&
              projects.map( ( project, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveProject( project, index ) }
                  key       = {index}
                  >
                  {project.name}             {/* .(01118.03.3 Use Table's "search" column name: name) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllProjects}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentProject ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Project</h4>

              <div><label><strong>projectId:    </strong></label>{" "}{currentProject.projectId}    </div>
              <div><label><strong>name:    </strong></label>{" "}{currentProject.name}    </div>
              <div><label><strong>client:    </strong></label>{" "}{currentProject.client}    </div>
              <div><label><strong>clientWeb:    </strong></label>{" "}{currentProject.clientWeb}    </div>
              <div><label><strong>projectWeb:    </strong></label>{" "}{currentProject.projectWeb}    </div>
              <div><label><strong>location:    </strong></label>{" "}{currentProject.location}    </div>
              <div><label><strong>projectType:    </strong></label>{" "}{currentProject.projectType}    </div>
              <div><label><strong>industry:    </strong></label>{" "}{currentProject.industry}    </div>
              <div><label><strong>description:    </strong></label>{" "}{currentProject.description}    </div>

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentProject ) { ... }

            <div>
              <br />
              <p>Please click on a Project...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
