import React, { Component } from "react";
import LookupDataService    from "../services/lookup.service";

// ----------------------------------------------------------------------------------------------------

export default class Lookup extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeid     = this.onChangeid.bind(this);
this.onChangetype     = this.onChangetype.bind(this);
this.onChangevalue     = this.onChangevalue.bind(this);

        this.getLookup            = this.getLookup.bind(this);
        this.updateLookup         = this.updateLookup.bind(this);
        this.deleteLookup         = this.deleteLookup.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentLookup : {

//        <<COLNAME>>    : "",
id    : "",
type    : "",
value    : "",

        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getLookup( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentLookup: { ...prevState.currentLookup, <<COLNAME>>    : <<COLNAME>>    } }; }); }
// Note:  --value || ''; -- SQL returns only a single quote must delete ' and add ''
onChangeid(e)     { const id    = e.target.value || ''; this.setState(function(prevState) { return { currentLookup: { ...prevState.currentLookup,id    : id    } }; }); }
onChangetype(e)     { const type    = e.target.value || ''; this.setState(function(prevState) { return { currentLookup: { ...prevState.currentLookup,type    : type    } }; }); }
onChangevalue(e)     { const value    = e.target.value || ''; this.setState(function(prevState) { return { currentLookup: { ...prevState.currentLookup,value    : value    } }; }); }


// --------------------------------------------------------------------------------------

  getLookup( id ) {

    LookupDataService.get( id )
      .then( response => { console.log( "getLookup[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentLookup: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateLookup() {

    LookupDataService.update(
                           this.state.currentLookup.id,               // .(01101.01.4 RAM Was: currentLookup.id)
                           this.state.currentLookup )
      .then( response => { console.log( "updateLookup[1]", response.data );
                           this.setState( { message: "The Lookup was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteLookup() {
  
    LookupDataService.delete( this.state.currentLookup.id )           // .(01101.01.5 RAM Was: currentLookup.id)
      .then( response => { console.log( "deleteLookup[1]", response.data );
                           this.props.history.push( '/lookups' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentLookup } = this.state;

    return (
      <div>
        {currentLookup ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>Lookup</h4>
            <form>

              <div className="form-group"><label htmlFor="id"    >id</label><input     type="text" className="form-control" id="id"    value={currentLookup.id}    onChange={this.onChangeid}    /> </div>
              <div className="form-group"><label htmlFor="type"    >type</label><input     type="text" className="form-control" id="type"    value={currentLookup.type}    onChange={this.onChangetype}    /> </div>
              <div className="form-group"><label htmlFor="value"    >value</label><input     type="text" className="form-control" id="value"    value={currentLookup.value}    onChange={this.onChangevalue}    /> </div>

                          </form>

            ) 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteLookup}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateLookup}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentLookup ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Lookup...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
