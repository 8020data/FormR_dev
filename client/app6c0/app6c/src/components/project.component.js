import React, { Component } from "react";
import ProjectDataService    from "../services/project.service";

// ----------------------------------------------------------------------------------------------------

export default class Project extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeprojectId     = this.onChangeprojectId.bind(this);
this.onChangename     = this.onChangename.bind(this);
this.onChangeclient     = this.onChangeclient.bind(this);
this.onChangeclientWeb     = this.onChangeclientWeb.bind(this);
this.onChangeprojectWeb     = this.onChangeprojectWeb.bind(this);
this.onChangelocation     = this.onChangelocation.bind(this);
this.onChangeprojectType     = this.onChangeprojectType.bind(this);
this.onChangeindustry     = this.onChangeindustry.bind(this);
this.onChangedescription     = this.onChangedescription.bind(this);

        this.getProject            = this.getProject.bind(this);
        this.updateProject         = this.updateProject.bind(this);
        this.deleteProject         = this.deleteProject.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentProject : {

//        <<COLNAME>>    : "",
projectId    : "",
name    : "",
client    : "",
clientWeb    : "",
projectWeb    : "",
location    : "",
projectType    : "",
industry    : "",
description    : "",

        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getProject( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject, <<COLNAME>>    : <<COLNAME>>    } }; }); }
// Note:  --value || ''; -- SQL returns only a single quote must delete ' and add ''
onChangeprojectId(e)     { const projectId    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,projectId    : projectId    } }; }); }
onChangename(e)     { const name    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,name    : name    } }; }); }
onChangeclient(e)     { const client    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,client    : client    } }; }); }
onChangeclientWeb(e)     { const clientWeb    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,clientWeb    : clientWeb    } }; }); }
onChangeprojectWeb(e)     { const projectWeb    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,projectWeb    : projectWeb    } }; }); }
onChangelocation(e)     { const location    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,location    : location    } }; }); }
onChangeprojectType(e)     { const projectType    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,projectType    : projectType    } }; }); }
onChangeindustry(e)     { const industry    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,industry    : industry    } }; }); }
onChangedescription(e)     { const description    = e.target.value || ''; this.setState(function(prevState) { return { currentProject: { ...prevState.currentProject,description    : description    } }; }); }

// --------------------------------------------------------------------------------------

  getProject( id ) {

    ProjectDataService.get( id )
      .then( response => { console.log( "getProject[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentProject: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateProject() {

    ProjectDataService.update(
                           this.state.currentProject.id,               // .(01101.01.4 RAM Was: currentProject.id)
                           this.state.currentProject )
      .then( response => { console.log( "updateProject[1]", response.data );
                           this.setState( { message: "The Project was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteProject() {
  
    ProjectDataService.delete( this.state.currentProject.id )           // .(01101.01.5 RAM Was: currentProject.id)
      .then( response => { console.log( "deleteProject[1]", response.data );
                           this.props.history.push( '/projects' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentProject } = this.state;

    return (
      <div>
        {currentProject ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>Project</h4>
            <form>

              <div className="form-group"><label htmlFor="projectId"    >projectId</label><input     type="text" className="form-control" id="projectId"    value={currentProject.projectId}    onChange={this.onChangeprojectId}    /> </div>
              <div className="form-group"><label htmlFor="name"    >name</label><input     type="text" className="form-control" id="name"    value={currentProject.name}    onChange={this.onChangename}    /> </div>
              <div className="form-group"><label htmlFor="client"    >client</label><input     type="text" className="form-control" id="client"    value={currentProject.client}    onChange={this.onChangeclient}    /> </div>
              <div className="form-group"><label htmlFor="clientWeb"    >clientWeb</label><input     type="text" className="form-control" id="clientWeb"    value={currentProject.clientWeb}    onChange={this.onChangeclientWeb}    /> </div>
              <div className="form-group"><label htmlFor="projectWeb"    >projectWeb</label><input     type="text" className="form-control" id="projectWeb"    value={currentProject.projectWeb}    onChange={this.onChangeprojectWeb}    /> </div>
              <div className="form-group"><label htmlFor="location"    >location</label><input     type="text" className="form-control" id="location"    value={currentProject.location}    onChange={this.onChangelocation}    /> </div>
              <div className="form-group"><label htmlFor="projectType"    >projectType</label><input     type="text" className="form-control" id="projectType"    value={currentProject.projectType}    onChange={this.onChangeprojectType}    /> </div>
              <div className="form-group"><label htmlFor="industry"    >industry</label><input     type="text" className="form-control" id="industry"    value={currentProject.industry}    onChange={this.onChangeindustry}    /> </div>
              <div className="form-group"><label htmlFor="description"    >description</label><input     type="text" className="form-control" id="description"    value={currentProject.description}    onChange={this.onChangedescription}    /> </div>

            </form>

            ) 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProject}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProject}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentProject ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Project...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
