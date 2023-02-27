import React, { Component } from 'react';
import LookupDataService    from '../services/lookup.service';

export default class AddLookup extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeid = this.onChangeid.bind(this);
this.onChangetype = this.onChangetype.bind(this);
this.onChangevalue = this.onChangevalue.bind(this);  
    this.state = {

//    <<COLNAME>>    : "",
// id should be null->      id            : null,
id : null,
type : "",
value : "",
      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }
  onChangeid(e) { this.setState({ id: e.target.value }); }
  onChangetype(e) { this.setState({ type: e.target.value }); }
  onChangevalue(e) { this.setState({ value: e.target.value }); }

  saveLookup() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,
      id: this.state.id,
      type: this.state.type,
      value: this.state.value,
        
        };

    LookupDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,
id: response.data.id,
type: response.data.type,
value: response.data.value,

          submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newLookup() {

    this.setState( {
    
//      <<COLNAME>>    : "",
// id should be null->      id            : null,
id: null,
type: "",
value: "",
      
      submitted   : false
      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newLookup}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="id">id</label><input type="text" className="form-control" id="id" required value={this.state.id} onChange={this.onChangeid} name="id" /> </div>
            <div className="form-group"><label htmlFor="type">type</label><input type="text" className="form-control" id="type" required value={this.state.type} onChange={this.onChangetype} name="type" /> </div>
            <div className="form-group"><label htmlFor="value">value</label><input type="text" className="form-control" id="value" required value={this.state.value} onChange={this.onChangevalue} name="value" /> </div>

            <button onClick={this.saveLookup} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
