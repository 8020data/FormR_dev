import React, { Component } from 'react';
import RoleDataService    from '../services/role.service';

export default class AddRole extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);

      this.onChangeid = this.onChangeid.bind(this);
      this.onChangename = this.onChangename.bind(this);

    this.state = {

//    <<COLNAME>>    : "",
// id should be null->      id            : null,

      id : null,
      name : "",

      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }

  onChangeid(e) { this.setState({ id: e.target.value }); }
  onChangename(e) { this.setState({ name: e.target.value }); }

  saveRole() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,

            id: this.state.id,
            name: this.state.name,
        
        };

    RoleDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,

          id: response.data.id,
          name: response.data.name,

          submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newRole() {

    this.setState( {
    
//      <<COLNAME>>    : "",
// id should be null->      id            : null,

      id : null,
      name : "",

      submitted   : false

      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newRole}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="id">id</label><input type="text" className="form-control" id="id" required value={this.state.id} onChange={this.onChangeid} name="id" /> </div>
            <div className="form-group"><label htmlFor="name">name</label><input type="text" className="form-control" id="name" required value={this.state.name} onChange={this.onChangename} name="name" /> </div>

            <button onClick={this.saveRole} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
