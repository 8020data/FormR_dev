import   React, { Component }        from 'react';
import   ConfigurationDataService    from '../services/configuration.service';

export default class AddConfiguration extends Component {

  constructor( props ) {

     super( props );

//    this.onChange<<COLNAME>> = this.onChange<<COLNAME>>.bind(this);
      this.onChangeid          = this.onChangeid.bind(          this );
      this.onChangedescription = this.onChangedescription.bind( this );
      this.onChangesettings    = this.onChangesettings.bind(    this );
      this.saveConfiguration   = this.saveConfiguration.bind(   this );    //#.(01204.03.1 RAM Need to bind it)
      this.newConfiguration    = this.newConfiguration.bind(    this );    // .(01204.03.2)

      this.state = {

//          <<COLNAME>>   : "",
            id            : null,   // id should be null->      id            : null,
            description   : "",
            settings      : "",

            submitted     : false
            };
         }
// --------------------------------------------------------------------

  //  onChange<<COLNAME>>( e ) { this.setState( { <<COLNAME>> : e.target.value } ); }
      onChangeid(          e ) { this.setState( { id          : e.target.value } ); }
      onChangedescription( e ) { this.setState( { description : e.target.value } ); }
      onChangesettings(    e ) { this.setState( { settings    : e.target.value } ); }

// --------------------------------------------------------------------

      saveConfiguration() {

    var data = {

//          <<COLNAME>>   : this.state.<<COLNAME>>,
            id            : this.state.id,
            description   : this.state.description,
            settings      : this.state.settings,
        
        };

        ConfigurationDataService.create( data )

         .then( response => {

            this.setState( {
        
//          <<COLNAME>>   : response.data.<<COLNAME>>,
            id            : response.data.id,
            description   : response.data.description,
            settings      : response.data.settings,

            submitted     : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }
// --------------------------------------------------------------------

      newConfiguration() {

    this.setState( {
    
//        <<COLNAME>>   : "",
          id            : null,  // id should be null->      id            : null,
          description   : "",
          settings      : "",
      
          submitted     : false
          } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newConfiguration}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="id">id</label><input type="text" className="form-control" id="id" required value={this.state.id} onChange={this.onChangeid} name="id" /> </div>
            <div className="form-group"><label htmlFor="description">description</label><input type="text" className="form-control" id="description" required value={this.state.description} onChange={this.onChangedescription} name="description" /> </div>
            <div className="form-group"><label htmlFor="settings">settings</label><input type="text" className="form-control" id="settings" required value={this.state.settings} onChange={this.onChangesettings} name="settings" /> </div>
            
            <button onClick={this.saveConfiguration} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
