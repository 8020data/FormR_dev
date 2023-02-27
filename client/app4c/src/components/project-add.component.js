import React, { Component } from 'react';
import ProjectDataService    from '../services/project.service';

export default class AddProject extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeprojectId = this.onChangeprojectId.bind(this);
this.onChangename = this.onChangename.bind(this);
this.onChangeclient = this.onChangeclient.bind(this);
this.onChangeclientWeb = this.onChangeclientWeb.bind(this);
this.onChangeprojectWeb = this.onChangeprojectWeb.bind(this);
this.onChangelocation = this.onChangelocation.bind(this);
this.onChangeprojectType = this.onChangeprojectType.bind(this);
this.onChangeindustry = this.onChangeindustry.bind(this);
this.onChangedescription = this.onChangedescription.bind(this);

    this.state = {

//    <<COLNAME>>    : "",
// id should be null->      id            : null,
  projectId : null,
  name : "",
  client : "",
  clientWeb : "",
  projectWeb : "",
  location : "",
  projectType : "",
  industry : "",
  description : "",

      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }
  onChangeprojectId(e) { this.setState({ projectId: e.target.value }); }
  onChangename(e) { this.setState({ name: e.target.value }); }
  onChangeclient(e) { this.setState({ client: e.target.value }); }
  onChangeclientWeb(e) { this.setState({ clientWeb: e.target.value }); }
  onChangeprojectWeb(e) { this.setState({ projectWeb: e.target.value }); }
  onChangelocation(e) { this.setState({ location: e.target.value }); }
  onChangeprojectType(e) { this.setState({ projectType: e.target.value }); }
  onChangeindustry(e) { this.setState({ industry: e.target.value }); }
  onChangedescription(e) { this.setState({ description: e.target.value }); }

  saveProject() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,
      projectId: this.state.projectId,
      name: this.state.name,
      client: this.state.client,
      clientWeb: this.state.clientWeb,
      projectWeb: this.state.projectWeb,
      location: this.state.location,
      projectType: this.state.projectType,
      industry: this.state.industry,
      description: this.state.description,
        
        };

    ProjectDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,
projectId: this.state.projectId,
name: this.state.name,
client: this.state.client,
clientWeb: this.state.clientWeb,
projectWeb: this.state.projectWeb,
location: this.state.location,
projectType: this.state.projectType,
industry: this.state.industry,
description: this.state.description,

          submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProject() {

    this.setState( {
    
//      <<COLNAME>>    : "",
// id should be null->      id            : null,
  projectId : null,
  name : "",
  client : "",
  clientWeb : "",
  projectWeb : "",
  location : "",
  projectType : "",
  industry : "",
  description : "",

      
      submitted   : false
      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProject}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="projectid">projectId</label><input type="text" className="form-control" id="projectid" required value={this.state.projectid} onChange={this.onChangeprojectId} name="projectId" /> </div>
            <div className="form-group"><label htmlFor="name">name</label><input type="text" className="form-control" id="name" required value={this.state.name} onChange={this.onChangename} name="name" /> </div>
            <div className="form-group"><label htmlFor="client">client</label><input type="text" className="form-control" id="client" required value={this.state.client} onChange={this.onChangeclient} name="client" /> </div>
            <div className="form-group"><label htmlFor="clientweb">clientWeb</label><input type="text" className="form-control" id="clientweb" required value={this.state.clientweb} onChange={this.onChangeclientWeb} name="clientWeb" /> </div>
            <div className="form-group"><label htmlFor="projectweb">projectWeb</label><input type="text" className="form-control" id="projectweb" required value={this.state.projectweb} onChange={this.onChangeprojectWeb} name="projectWeb" /> </div>
            <div className="form-group"><label htmlFor="location">location</label><input type="text" className="form-control" id="location" required value={this.state.location} onChange={this.onChangelocation} name="location" /> </div>
            <div className="form-group"><label htmlFor="projecttype">projectType</label><input type="text" className="form-control" id="projecttype" required value={this.state.projecttype} onChange={this.onChangeprojectType} name="projectType" /> </div>
            <div className="form-group"><label htmlFor="industry">industry</label><input type="text" className="form-control" id="industry" required value={this.state.industry} onChange={this.onChangeindustry} name="industry" /> </div>
            <div className="form-group"><label htmlFor="description">description</label><input type="text" className="form-control" id="description" required value={this.state.description} onChange={this.onChangedescription} name="description" /> </div>
            
            <button onClick={this.saveProject} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
