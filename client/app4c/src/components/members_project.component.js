import React, { Component } from "react";
import Members_projectDataService    from "../services/members_project.service";

// ----------------------------------------------------------------------------------------------------

export default class Members_project extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeid     = this.onChangeid.bind(this);
this.onChangememberId     = this.onChangememberId.bind(this);
this.onChangeprojectId     = this.onChangeprojectId.bind(this);
this.onChangesort     = this.onChangesort.bind(this);
this.onChangerole     = this.onChangerole.bind(this);
this.onChangeduration     = this.onChangeduration.bind(this);
this.onChangedates     = this.onChangedates.bind(this);

        this.getMembers_project            = this.getMembers_project.bind(this);
        this.updateMembers_project         = this.updateMembers_project.bind(this);
        this.deleteMembers_project         = this.deleteMembers_project.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentMembers_project : {

//        <<COLNAME>>    : "",
id    : "",
memberId    : "",
projectId    : "",
sort    : "",
role    : "",
duration    : "",
dates    : "",

        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getMembers_project( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentMembers_project: { ...prevState.currentMembers_project, <<COLNAME>>    : <<COLNAME>>    } }; }); }
// Note:  --value || ''; -- SQL returns only a single quote must delete ' and add ''
onChangeid(e)     { const id    = e.target.value || ''; this.setState(function(prevState) { return { currentMembers_project: { ...prevState.currentMembers_project,id    : id    } }; }); }
onChangememberId(e)     { const memberId    = e.target.value || ''; this.setState(function(prevState) { return { currentMembers_project: { ...prevState.currentMembers_project,memberId    : memberId    } }; }); }
onChangeprojectId(e)     { const projectId    = e.target.value || ''; this.setState(function(prevState) { return { currentMembers_project: { ...prevState.currentMembers_project,projectId    : projectId    } }; }); }
onChangesort(e)     { const sort    = e.target.value || ''; this.setState(function(prevState) { return { currentMembers_project: { ...prevState.currentMembers_project,sort    : sort    } }; }); }
onChangerole(e)     { const role    = e.target.value || ''; this.setState(function(prevState) { return { currentMembers_project: { ...prevState.currentMembers_project,role    : role    } }; }); }
onChangeduration(e)     { const duration    = e.target.value || ''; this.setState(function(prevState) { return { currentMembers_project: { ...prevState.currentMembers_project,duration    : duration    } }; }); }
onChangedates(e)     { const dates    = e.target.value || ''; this.setState(function(prevState) { return { currentMembers_project: { ...prevState.currentMembers_project,dates    : dates    } }; }); }
// --------------------------------------------------------------------------------------

  getMembers_project( id ) {

    Members_projectDataService.get( id )
      .then( response => { console.log( "getMembers_project[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentMembers_project: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateMembers_project() {

    Members_projectDataService.update(
                           this.state.currentMembers_project.id,               // .(01101.01.4 RAM Was: currentMembers_project.id)
                           this.state.currentMembers_project )
      .then( response => { console.log( "updateMembers_project[1]", response.data );
                           this.setState( { message: "The Members_project was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteMembers_project() {
  
    Members_projectDataService.delete( this.state.currentMembers_project.id )           // .(01101.01.5 RAM Was: currentMembers_project.id)
      .then( response => { console.log( "deleteMembers_project[1]", response.data );
                           this.props.history.push( '/members_projects' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentMembers_project } = this.state;

    return (
      <div>
        {currentMembers_project ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>Members_project</h4>
            <form>

              <div className="form-group"><label htmlFor="id"    >id</label><input     type="text" className="form-control" id="id"    value={currentMembers_project.id}    onChange={this.onChangeid}    /> </div>
              <div className="form-group"><label htmlFor="memberId"    >memberId</label><input     type="text" className="form-control" id="memberId"    value={currentMembers_project.memberId}    onChange={this.onChangememberId}    /> </div>
              <div className="form-group"><label htmlFor="projectId"    >projectId</label><input     type="text" className="form-control" id="projectId"    value={currentMembers_project.projectId}    onChange={this.onChangeprojectId}    /> </div>
              <div className="form-group"><label htmlFor="sort"    >sort</label><input     type="text" className="form-control" id="sort"    value={currentMembers_project.sort}    onChange={this.onChangesort}    /> </div>
              <div className="form-group"><label htmlFor="role"    >role</label><input     type="text" className="form-control" id="role"    value={currentMembers_project.role}    onChange={this.onChangerole}    /> </div>
              <div className="form-group"><label htmlFor="duration"    >duration</label><input     type="text" className="form-control" id="duration"    value={currentMembers_project.duration}    onChange={this.onChangeduration}    /> </div>
              <div className="form-group"><label htmlFor="dates"    >dates</label><input     type="text" className="form-control" id="dates"    value={currentMembers_project.dates}    onChange={this.onChangedates}    /> </div>

            </form>

            ) 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMembers_project}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMembers_project}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentMembers_project ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Members_project...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
