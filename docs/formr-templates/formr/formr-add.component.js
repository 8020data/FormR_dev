import React, { Component } from 'react';
import FormrDataService    from '../services/formr.service';

export default class AddFormr extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
  
    this.state = {

//    <<COLNAME>>    : "",
// id should be null->      id            : null,

      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }
 
  saveFormr() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,

        
        };

    FormrDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,

          submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newFormr() {

    this.setState( {
    
//      <<COLNAME>>    : "",
// id should be null->      id            : null,

      
      submitted   : false
      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newFormr}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="<<COLNAME>>"    ><<COLNAME>></label><input     type="text" className="form-control" id="<<COLNAME>>"     required value={this.state.<<COLNAME>>}    onChange={this.onChange<<COLNAME>>}    name="<<COLNAME>>"     /> </div>

            <button onClick={this.saveFormr} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
