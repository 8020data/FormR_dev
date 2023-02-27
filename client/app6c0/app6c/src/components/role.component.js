import React, { Component } from "react";
import RoleDataService    from "../services/role.service";

// ----------------------------------------------------------------------------------------------------

export default class Role extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);

        this.onChangeid     = this.onChangeid.bind(this);
        this.onChangename     = this.onChangename.bind(this);

        this.getRole            = this.getRole.bind(this);
        this.updateRole         = this.updateRole.bind(this);
        this.updateRole2         = this.updateRole2.bind(this);
        this.deleteRole         = this.deleteRole.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentRole : {

//        <<COLNAME>>    : "",

          id    : "",
          name    : "",

        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getRole( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentRole: { ...prevState.currentRole, <<COLNAME>>    : <<COLNAME>>    } }; }); }
// Note:  --value || ''; -- SQL returns only a single quote must add one

    onChangeid(e)     { const id    = e.target.value || ''; this.setState(function(prevState) { return { currentRole: { ...prevState.currentRole,id    : id    } }; }); }
    onChangename(e)     { const name    = e.target.value || ''; this.setState(function(prevState) { return { currentRole: { ...prevState.currentRole,name    : name    } }; }); }

// --------------------------------------------------------------------------------------

  getRole( id ) {

    RoleDataService.get( id )
      .then( response => { console.log( "getRole[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentRole: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateRole() {

    RoleDataService.update(
                           this.state.currentRole.id,               // .(01101.01.4 RAM Was: currentRole.id)
                           this.state.currentRole )
      .then( response => { console.log( "updateRole[1]", response.data );
                           this.setState( { message: "The Role was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

updateRole2() {

  RoleDataService.update(
                         this.state.currentRole.id,               // .(01101.01.4 RAM Was: currentRole.id)
                         this.state.currentRole )
    .then( response => { console.log( "updateRole[1]", response.data );
                         this.setState( { message: "The Role was updated and returning to list!" } ); 
                        alert("Redirecting")
                        } )
    .catch( e       => { console.log( e ); } );
     }
// --------------------------------------------------------------------------------------

  deleteRole() {
  
    RoleDataService.delete( this.state.currentRole.id )           // .(01101.01.5 RAM Was: currentRole.id)
      .then( response => { console.log( "deleteRole[1]", response.data );
                           this.props.history.push( '/roles' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentRole } = this.state;

    return (
      <div>
        {currentRole ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>Role</h4>
            <form>

              <div className="form-group"><label htmlFor="id"    >id</label><input     type="text" className="form-control" id="id"    value={currentRole.id}    onChange={this.onChangeid}    /> </div>
              <div className="form-group"><label htmlFor="name"    >name</label><input     type="text" className="form-control" id="name"    value={currentRole.name}    onChange={this.onChangename}    /> </div>

            </form>

            ) 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRole}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRole}
              >
              Save
            </button>
&nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRole2}
              >
              Return to List
            </button>

            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentRole ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Role...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
