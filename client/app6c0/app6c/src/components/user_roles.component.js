import React, { Component } from "react";
import User_rolesDataService    from "../services/user_roles.service";

// ----------------------------------------------------------------------------------------------------

export default class User_roles extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeuserId     = this.onChangeuserId.bind(this);
this.onChangeroleId     = this.onChangeroleId.bind(this);

        this.getUser_roles            = this.getUser_roles.bind(this);
        this.updateUser_roles         = this.updateUser_roles.bind(this);
        this.deleteUser_roles         = this.deleteUser_roles.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentUser_roles : {

//        <<COLNAME>>    : "",
userId    : "",
roleId    : "",
        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getUser_roles( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentUser_roles: { ...prevState.currentUser_roles, <<COLNAME>>    : <<COLNAME>>    } }; }); }
// Note:  --value || ''; -- SQL returns only a single quote must delete ' and add ''
onChangeuserId(e)     { const userId    = e.target.value || ''; this.setState(function(prevState) { return { currentUser_roles: { ...prevState.currentUser_roles,userId    : userId    } }; }); }
onChangeroleId(e)     { const roleId    = e.target.value || ''; this.setState(function(prevState) { return { currentUser_roles: { ...prevState.currentUser_roles,roleId    : roleId    } }; }); }
// --------------------------------------------------------------------------------------

  getUser_roles( id ) {

    User_rolesDataService.get( id )
      .then( response => { console.log( "getUser_roles[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentUser_roles: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateUser_roles() {

    User_rolesDataService.update(
                           this.state.currentUser_roles.id,               // .(01101.01.4 RAM Was: currentUser_roles.id)
                           this.state.currentUser_roles )
      .then( response => { console.log( "updateUser_roles[1]", response.data );
                           this.setState( { message: "The User_roles was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteUser_roles() {
  
    User_rolesDataService.delete( this.state.currentUser_roles.id )           // .(01101.01.5 RAM Was: currentUser_roles.id)
      .then( response => { console.log( "deleteUser_roles[1]", response.data );
                           this.props.history.push( '/user_roles' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentUser_roles } = this.state;

    return (
      <div>
        {currentUser_roles ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>User_roles</h4>
            <form>

              <div className="form-group"><label htmlFor="userId"    >userId</label><input     type="text" className="form-control" id="userId"    value={currentUser_roles.userId}    onChange={this.onChangeuserId}    /> </div>
              <div className="form-group"><label htmlFor="roleId"    >roleId</label><input     type="text" className="form-control" id="roleId"    value={currentUser_roles.roleId}    onChange={this.onChangeroleId}    /> </div>

            </form>

            ) 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser_roles}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser_roles}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentUser_roles ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a User_roles...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
