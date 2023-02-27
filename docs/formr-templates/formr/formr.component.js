import React, { Component } from "react";
import FormrDataService    from "../services/formr.service";

// ----------------------------------------------------------------------------------------------------

export default class Formr extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);

        this.getFormr            = this.getFormr.bind(this);
        this.updateFormr         = this.updateFormr.bind(this);
        this.deleteFormr         = this.deleteFormr.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentFormr : {

//        <<COLNAME>>    : "",

        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getFormr( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentFormr: { ...prevState.currentFormr, <<COLNAME>>    : <<COLNAME>>    } }; }); }
// Note:  --value || ''; -- SQL returns only a single quote must delete ' and add ''

// --------------------------------------------------------------------------------------

  getFormr( id ) {

    FormrDataService.get( id )
      .then( response => { console.log( "getFormr[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentFormr: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateFormr() {

    FormrDataService.update(
                           this.state.currentFormr.id,               // .(01101.01.4 RAM Was: currentFormr.id)
                           this.state.currentFormr )
      .then( response => { console.log( "updateFormr[1]", response.data );
                           this.setState( { message: "The Formr was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteFormr() {
  
    FormrDataService.delete( this.state.currentFormr.id )           // .(01101.01.5 RAM Was: currentFormr.id)
      .then( response => { console.log( "deleteFormr[1]", response.data );
                           this.props.history.push( '/formrs' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentFormr } = this.state;

    return (
      <div>
        {currentFormr ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>Formr</h4>
            <form>

              <div className="form-group"><label htmlFor="<<COLNAME>>"    ><<COLNAME>></label>              <input     type="text" className="form-control" id="<<COLNAME>>"    value={currentFormr.<<COLNAME>>}    onChange={this.onChange<<COLNAME>>}    /> </div>
  
            </form>

            ) 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteFormr}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFormr}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentFormr ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Formr...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
