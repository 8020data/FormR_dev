import React, { Component } from 'react';
import TableDataService    from '../services/table.service';

export default class AddTable extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeid = this.onChangeid.bind(this);
this.onChangename = this.onChangename.bind(this);
this.onChangetitle = this.onChangetitle.bind(this);
this.onChangegroup = this.onChangegroup.bind(this);
this.onChangedescription = this.onChangedescription.bind(this);
this.onChangeenabled = this.onChangeenabled.bind(this);
this.onChangeurl = this.onChangeurl.bind(this);
  
    this.state = {

//    <<COLNAME>>    : "",
// id should be null->      id            : null,
id : "",
name : "",
title : "",
group : "",
description : "",
enabled : "",
url : "",

      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }
  onChangeid(e) { this.setState({ id: e.target.value }); }
  onChangename(e) { this.setState({ name: e.target.value }); }
  onChangetitle(e) { this.setState({ title: e.target.value }); }
  onChangegroup(e) { this.setState({ group: e.target.value }); }
  onChangedescription(e) { this.setState({ description: e.target.value }); }
  onChangeenabled(e) { this.setState({ enabled: e.target.value }); }
  onChangeurl(e) { this.setState({ url: e.target.value }); }

  saveTable() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,
      id: this.state.id,
      name: this.state.name,
      title: this.state.title,
      group: this.state.group,
      description: this.state.description,
      enabled: this.state.enabled,
      url: this.state.url,
        
        };

    TableDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,
id: response.data.id,
name: response.data.name,
title: response.data.title,
group: response.data.group,
description: response.data.description,
enabled: response.data.enabled,
url: response.data.url,

          submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTable() {

    this.setState( {
    
//      <<COLNAME>>    : "",
// id should be null->      id            : null,
id: "",
name: "",
title: "",
group: "",
description: "",
enabled: "",
url: "",
      
      submitted   : false
      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTable}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="id">id</label><input type="text" className="form-control" id="id" required value={this.state.id} onChange={this.onChangeid} name="id" /> </div>
            <div className="form-group"><label htmlFor="name">name</label><input type="text" className="form-control" id="name" required value={this.state.name} onChange={this.onChangename} name="name" /> </div>
            <div className="form-group"><label htmlFor="title">title</label><input type="text" className="form-control" id="title" required value={this.state.title} onChange={this.onChangetitle} name="title" /> </div>
            <div className="form-group"><label htmlFor="group">group</label><input type="text" className="form-control" id="group" required value={this.state.group} onChange={this.onChangegroup} name="group" /> </div>
            <div className="form-group"><label htmlFor="description">description</label><input type="text" className="form-control" id="description" required value={this.state.description} onChange={this.onChangedescription} name="description" /> </div>
            <div className="form-group"><label htmlFor="enabled">enabled</label><input type="text" className="form-control" id="enabled" required value={this.state.enabled} onChange={this.onChangeenabled} name="enabled" /> </div>
            <div className="form-group"><label htmlFor="url">url</label><input type="text" className="form-control" id="url" required value={this.state.url} onChange={this.onChangeurl} name="url" /> </div>

            <button onClick={this.saveTable} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
