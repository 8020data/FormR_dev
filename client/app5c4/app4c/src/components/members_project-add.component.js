import React, { Component } from 'react';
import Members_projectDataService    from '../services/members_project.service';

export default class AddMembers_project extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeid = this.onChangeid.bind(this);
this.onChangememberId = this.onChangememberId.bind(this);
this.onChangeprojectId = this.onChangeprojectId.bind(this);
this.onChangesort = this.onChangesort.bind(this);
this.onChangerole = this.onChangerole.bind(this);
this.onChangeduration = this.onChangeduration.bind(this);
this.onChangedates = this.onChangedates.bind(this);

    this.state = {

//    <<COLNAME>>    : "",
// id should be null->      id            : null,
  id : null,
  memberId : null,
  projectId : null,
  sort : "",
  role : "",
  duration : "",
  dates : "",

      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }
onChangeid(e) { this.setState({ id: e.target.value }); }
onChangememberId(e) { this.setState({ memberId: e.target.value }); }
onChangeprojectId(e) { this.setState({ projectId: e.target.value }); }
onChangesort(e) { this.setState({ sort: e.target.value }); }
onChangerole(e) { this.setState({ role: e.target.value }); }
onChangeduration(e) { this.setState({ duration: e.target.value }); }
onChangedates(e) { this.setState({ dates: e.target.value }); }

  saveMembers_project() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,
      id: this.state.id,
      memberId: this.state.memberId,
      projectId: this.state.projectId,
      sort: this.state.sort,
      role: this.state.role,
      duration: this.state.duration,
      dates: this.state.dates,

        
        };

    Members_projectDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,
      id: response.data.id,
      memberId: response.data.memberId,
      projectId: response.data.projectId,
      sort: response.data.sort,
      role: response.data.role,
      duration: response.data.duration,
      dates: response.data.dates,

          submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMembers_project() {

    this.setState( {
    
//      <<COLNAME>>    : "",
// id should be null->      id            : null,
      id: null,
      memberId: null,
      projectId: null,
      sort: "",
      role: "",
      duration: "",
      dates: "",
      
      submitted   : false
      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMembers_project}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="id">id</label><input type="text" className="form-control" id="id" required value={this.state.id} onChange={this.onChangeid} name="id" /> </div>
            <div className="form-group"><label htmlFor="memberid">memberId</label><input type="text" className="form-control" id="memberid" required value={this.state.memberid} onChange={this.onChangememberId} name="memberId" /> </div>
            <div className="form-group"><label htmlFor="projectid">projectId</label><input type="text" className="form-control" id="projectid" required value={this.state.projectid} onChange={this.onChangeprojectId} name="projectId" /> </div>
            <div className="form-group"><label htmlFor="sort">sort</label><input type="text" className="form-control" id="sort" required value={this.state.sort} onChange={this.onChangesort} name="sort" /> </div>
            <div className="form-group"><label htmlFor="role">role</label><input type="text" className="form-control" id="role" required value={this.state.role} onChange={this.onChangerole} name="role" /> </div>
            <div className="form-group"><label htmlFor="duration">duration</label><input type="text" className="form-control" id="duration" required value={this.state.duration} onChange={this.onChangeduration} name="duration" /> </div>
            <div className="form-group"><label htmlFor="dates">dates</label><input type="text" className="form-control" id="dates" required value={this.state.dates} onChange={this.onChangedates} name="dates" /> </div>
            
            <button onClick={this.saveMembers_project} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
