import React, { Component } from "react";
import Roles_tablesDataService    from "../services/roles_tables.service";

// ----------------------------------------------------------------------------------------------------

export default class Roles_tables extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeid     = this.onChangeid.bind(this);
this.onChangetableId     = this.onChangetableId.bind(this);
this.onChangeroleId     = this.onChangeroleId.bind(this);
this.onChangeallowInsert     = this.onChangeallowInsert.bind(this);
this.onChangeallowUpdate     = this.onChangeallowUpdate.bind(this);
this.onChangeallowDelete     = this.onChangeallowDelete.bind(this);

        this.getRoles_tables            = this.getRoles_tables.bind(this);
        this.updateRoles_tables         = this.updateRoles_tables.bind(this);
        this.deleteRoles_tables         = this.deleteRoles_tables.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentRoles_tables : {

//        <<COLNAME>>    : "",
id    : "",
tableId    : "",
roleId    : "",
allowInsert    : "",
allowUpdate    : "",
allowDelete    : "",

        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getRoles_tables( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentRoles_tables: { ...prevState.currentRoles_tables, <<COLNAME>>    : <<COLNAME>>    } }; }); }
// Note:  --value || ''; -- SQL returns only a single quote must delete ' and add ''
onChangeid(e)     { const id    = e.target.value || ''; this.setState(function(prevState) { return { currentRoles_tables: { ...prevState.currentRoles_tables,id    : id    } }; }); }
onChangetableId(e)     { const tableId    = e.target.value || ''; this.setState(function(prevState) { return { currentRoles_tables: { ...prevState.currentRoles_tables,tableId    : tableId    } }; }); }
onChangeroleId(e)     { const roleId    = e.target.value || ''; this.setState(function(prevState) { return { currentRoles_tables: { ...prevState.currentRoles_tables,roleId    : roleId    } }; }); }
onChangeallowInsert(e)     { const allowInsert    = e.target.value || ''; this.setState(function(prevState) { return { currentRoles_tables: { ...prevState.currentRoles_tables,allowInsert    : allowInsert    } }; }); }
onChangeallowUpdate(e)     { const allowUpdate    = e.target.value || ''; this.setState(function(prevState) { return { currentRoles_tables: { ...prevState.currentRoles_tables,allowUpdate    : allowUpdate    } }; }); }
onChangeallowDelete(e)     { const allowDelete    = e.target.value || ''; this.setState(function(prevState) { return { currentRoles_tables: { ...prevState.currentRoles_tables,allowDelete    : allowDelete    } }; }); }
// --------------------------------------------------------------------------------------

  getRoles_tables( id ) {

    Roles_tablesDataService.get( id )
      .then( response => { console.log( "getRoles_tables[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentRoles_tables: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateRoles_tables() {

    Roles_tablesDataService.update(
                           this.state.currentRoles_tables.id,               // .(01101.01.4 RAM Was: currentRoles_tables.id)
                           this.state.currentRoles_tables )
      .then( response => { console.log( "updateRoles_tables[1]", response.data );
                           this.setState( { message: "The Roles_tables was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteRoles_tables() {
  
    Roles_tablesDataService.delete( this.state.currentRoles_tables.id )           // .(01101.01.5 RAM Was: currentRoles_tables.id)
      .then( response => { console.log( "deleteRoles_tables[1]", response.data );
                           this.props.history.push( '/roles_tables' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentRoles_tables } = this.state;

    return (
      <div>
        {currentRoles_tables ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>Roles_tables</h4>
            <form>

              <div className="form-group"><label htmlFor="id"    >id</label><input     type="text" className="form-control" id="id"    value={currentRoles_tables.id}    onChange={this.onChangeid}    /> </div>
              <div className="form-group"><label htmlFor="tableId"    >tableId</label><input     type="text" className="form-control" id="tableId"    value={currentRoles_tables.tableId}    onChange={this.onChangetableId}    /> </div>
              <div className="form-group"><label htmlFor="roleId"    >roleId</label><input     type="text" className="form-control" id="roleId"    value={currentRoles_tables.roleId}    onChange={this.onChangeroleId}    /> </div>
              <div className="form-group"><label htmlFor="allowInsert"    >allowInsert</label><input     type="text" className="form-control" id="allowInsert"    value={currentRoles_tables.allowInsert}    onChange={this.onChangeallowInsert}    /> </div>
              <div className="form-group"><label htmlFor="allowUpdate"    >allowUpdate</label><input     type="text" className="form-control" id="allowUpdate"    value={currentRoles_tables.allowUpdate}    onChange={this.onChangeallowUpdate}    /> </div>
              <div className="form-group"><label htmlFor="allowDelete"    >allowDelete</label><input     type="text" className="form-control" id="allowDelete"    value={currentRoles_tables.allowDelete}    onChange={this.onChangeallowDelete}    /> </div>

            </form>

            ) 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRoles_tables}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRoles_tables}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentRoles_tables ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Roles_tables...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
