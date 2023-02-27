  import React, { Component }        from "react";
  import ConfigurationDataService    from "../services/configuration.service";

// ----------------------------------------------------------------------------------------------------

export default class Configuration extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//  this.onChange<<COLNAME>>      = this.onChange<<COLNAME>>.bind(    this );
    this.onChangeid               = this.onChangeid.bind(             this );
    this.onChangedescription      = this.onChangedescription.bind(    this );
    this.onChangesettings         = this.onChangesettings.bind(       this );

    this.getConfiguration         = this.getConfiguration.bind(       this );
    this.updateConfiguration      = this.updateConfiguration.bind(    this );
    this.viewConfiguration        = this.updateConfiguration.bind(    this );  // .(01210.02.x)
    this.editConfiguration        = this.updateConfiguration.bind(    this );  // .(01210.02.x)

    this.returnToConfiguration    = this.returnToConfiguration.bind(  this );  // .(01210.03.1) 
    this.approveConfiguration     = this.approveConfiguration.bind(   this );  // .(01210.04.1) 
    this.deleteConfiguration      = this.deleteConfiguration.bind(    this );

// --------------------------------------------------------------------------------------

    this.state = {
      currentConfiguration : {
//      <<COLNAME>>   : '',
        id            : '',
        description   : '',
        settings      : '',
        },
      action          : '',             // .(01210.02.1 RAM Added)  
      cButton         : '',             // .(01210.02.5 RAM Added this too)  
      message         : ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

// var aAction =  this.props.match.params.id.match( /approve|view/      ) || ''                                //#.(01210.02.x Beg)
   var aAction =  this.props.match.params.id.match( /approve|view|edit/ ) || ''                                // .(01210.02.x Beg)
   var nId     =  aAction ? this.props.location.pathname.replace( /^.+\//, '' ) : this.props.match.params.id
   var cButton = ''

  if (aAction === 'view'     ) { aAction =  "View" 
                                 cButton =  ''
                                }
  if (aAction === 'edit'     ) { aAction =  "Edit" 
                                 cButton =   <button
                                               type="submit"
                                               className="badge badge-success"
                                               onClick={ this.updateConfiguration }
                                               style={{ marginRight: '8px' }}
                                               >
                                               Update
                                             </button>        
                                }        
  if (aAction === ''         ) { aAction =  "Update" 
                                 cButton = ( <button
                                               type="submit"
                                               className="badge badge-success"
                                               onClick={ this.updateConfiguration }
                                               style={{ marginRight: '8px' }}
                                               >
                                               Update
                                             </button> )       
                                }
  if (aAction === 'approve'  ) { aAction =  "Approve" 
                                 cButton =   <button
                                               type="submit"
                                               className="badge badge-success"
                                               onClick={ this.approveConfiguration }
                                               style={{ marginRight: '8px' }}
                                               >
                                               Approve
                                             </button>        
                                }        
     this.setState( { action : aAction, cButton: cButton } )                                                   // .(01210.02.x End)

//   this.getConfiguration( this.props.match.params.id );
     this.getConfiguration( nId );
    }
// --------------------------------------------------------------------------------------

//    Note: --value || ''; -- SQL returns only a single quote must delete ' and add ''
//      onChange<<COLNAME>>( e ) { const <<COLNAME>>  = e.target.value || ''; this.setState( function( prevState ) { return { currentConfiguration: { ...prevState.currentConfiguration, <<COLNAME>> : <<COLNAME>>    } }; }); }
        onChangeid( e )          { const id           = e.target.value || ''; this.setState( function( prevState ) { return { currentConfiguration: { ...prevState.currentConfiguration, id          : id             } }; }); }
        onChangedescription( e ) { const description  = e.target.value || ''; this.setState( function( prevState ) { return { currentConfiguration: { ...prevState.currentConfiguration, description : description    } }; }); }
        onChangesettings( e )    { const settings     = e.target.value || ''; this.setState( function( prevState ) { return { currentConfiguration: { ...prevState.currentConfiguration, settings    : settings       } }; }); }

// --------------------------------------------------------------------------------------

  getConfiguration( id ) {

    ConfigurationDataService.get( id )
      .then( response => { console.log( "getConfiguration[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentConfiguration: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  editConfiguration( id ) {                            // .(01210.02.x RAM Added)

    ConfigurationDataService.edit( id )
      .then( response => { console.log( "editConfiguration[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentConfiguration: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------
//
 viewConfiguration( id ) {                            // .(01210.02.x RAM Added)

    ConfigurationDataService.view( id )
      .then( response => { console.log( "viewConfiguration[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentConfiguration: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------
  updateConfiguration() {

    ConfigurationDataService.update(
                           this.state.currentConfiguration.id,                      // .(01101.01.4 RAM Was: currentConfiguration.id)
                           this.state.currentConfiguration )
      .then( response => { console.log( "updateConfiguration[1]", response.data );
                           this.setState( { message: "The Configuration was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  returnToConfiguration() {                                                         // .01210.03.1 Beg RAM Added)
                           console.log( "returnToConfiguration[1]" ) 
//                         location ='/configurations'   
                           this.props.history.push( '/configurations2' ) 

/*  ConfigurationDataService.getAll( )
        .then( ( )    => { console.log( "returnToConfiguration[1]" ) 
//                         location ='/configurations'   
                           this.props.history.push( '/configurations' ) 
                           } )
 */                           
      }                                                                             // .01210.03.1 Beg RAM Added)
// --------------------------------------------------------------------------------------

  approveConfiguration() {                                                          // .01210.04.2 Beg)                                                      
                           console.log( "approveConfiguration[1]" ) 
                           this.setState( { message: "The Configuration was approved successfully!" } ); 
  
/*    ConfigurationDataService.approve( this.state.currentConfiguration.id )           
      .then( response => { console.log( "approveConfiguration[1]", response.data );
                           this.setState( { message: "The Configuration was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
 */      
       }                                                                             // .01210.04.2 Beg RAM Added)
// --------------------------------------------------------------------------------------

  deleteConfiguration() {
  
    ConfigurationDataService.delete( this.state.currentConfiguration.id )           // .(01101.01.5 RAM Was: currentConfiguration.id)
      .then( response => { console.log( "deleteConfiguration[1]", response.data );
                           this.props.history.push( '/configurations' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
//  const { currentConfiguration         } = this.state;
    const { currentConfiguration, action, cButton } = this.state;          // .(01210.02.2)

    return (
      <div>
        {currentConfiguration ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>{ action } Configuration</h4>          {/* .(01210.02.3) */}
            <form>

{/*           <div className="form-group"><label htmlFor="<<COLNAME>>" ><<COLNAME>></label>><input type="text" className="form-control" id="<<COLNAME>>"  value={current<<TABLENAME>.<<COLNAME>>}  onChange={this.onChange<<COLNAME>>  /> </div>  */}{/* .01121.02.n RAM Was currentrole.id) */}    
              <div className="form-group"><label htmlFor="id"          >id</label          ><input type="text" className="form-control" id="id"           value={currentConfiguration.id}          onChange={this.onChangeid}          /> </div>     {/* .01121.02.1 RAM Was currentrole.id) */}
              <div className="form-group"><label htmlFor="description" >description</label ><input type="text" className="form-control" id="description"  value={currentConfiguration.description} onChange={this.onChangedescription} /> </div>     {/* .01121.02.2) */} 
              <div className="form-group"><label htmlFor="settings"    >settings</label    ><input type="text" className="form-control" id="settings"     value={currentConfiguration.settings}    onChange={this.onChangesettings}    /> </div>     {/* .01121.02.3) */}

            </form>

            {/* Why the parens ). It's misplaced.  Why do // comments work? They don't!! */}

            <button
              className="badge badge-danger mr-2"
              onClick={ this.deleteConfiguration }
              >
              Delete
            </button>

{/*         <button
              type="submit"
              className="badge badge-success"
              onClick={ this.updateConfiguration }
              >
              Update
            </button>&nbsp;&nbsp;
*/}
            { cButton }

            <button
              type="submit"
              className="badge badge-warning"
              onClick={ this.returnToConfiguration }
              >
              Return
            </button>

            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentConfiguration ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Configuration...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
