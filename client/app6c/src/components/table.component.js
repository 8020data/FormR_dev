import React, { Component } from "react";
import TableDataService    from "../services/table.service";

// ----------------------------------------------------------------------------------------------------

export default class Table extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeid     = this.onChangeid.bind(this);
this.onChangename     = this.onChangename.bind(this);
this.onChangetitle     = this.onChangetitle.bind(this);
this.onChangegroup     = this.onChangegroup.bind(this);
this.onChangedescription     = this.onChangedescription.bind(this);
this.onChangeenabled     = this.onChangeenabled.bind(this);
this.onChangeurl     = this.onChangeurl.bind(this);

        this.getTable            = this.getTable.bind(this);
        this.updateTable         = this.updateTable.bind(this);
        this.deleteTable         = this.deleteTable.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentTable : {

//        <<COLNAME>>    : "",
id    : "",
name    : "",
title    : "",
group    : "",
description    : "",
enabled    : "",
url    : "",

        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getTable( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentTable: { ...prevState.currentTable, <<COLNAME>>    : <<COLNAME>>    } }; }); }
// Note:  --value || ''; -- SQL returns only a single quote must delete ' and add ''
onChangeid(e)     { const id    = e.target.value || ''; this.setState(function(prevState) { return { currentTable: { ...prevState.currentTable,id    : id    } }; }); }
onChangename(e)     { const name    = e.target.value || ''; this.setState(function(prevState) { return { currentTable: { ...prevState.currentTable,name    : name    } }; }); }
onChangetitle(e)     { const title    = e.target.value || ''; this.setState(function(prevState) { return { currentTable: { ...prevState.currentTable,title    : title    } }; }); }
onChangegroup(e)     { const group    = e.target.value || ''; this.setState(function(prevState) { return { currentTable: { ...prevState.currentTable,group    : group    } }; }); }
onChangedescription(e)     { const description    = e.target.value || ''; this.setState(function(prevState) { return { currentTable: { ...prevState.currentTable,description    : description    } }; }); }
onChangeenabled(e)     { const enabled    = e.target.value || ''; this.setState(function(prevState) { return { currentTable: { ...prevState.currentTable,enabled    : enabled    } }; }); }
onChangeurl(e)     { const url    = e.target.value || ''; this.setState(function(prevState) { return { currentTable: { ...prevState.currentTable,url    : url    } }; }); }
// --------------------------------------------------------------------------------------

  getTable( id ) {

    TableDataService.get( id )
      .then( response => { console.log( "getTable[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentTable: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateTable() {

    TableDataService.update(
                           this.state.currentTable.id,               // .(01101.01.4 RAM Was: currentTable.id)
                           this.state.currentTable )
      .then( response => { console.log( "updateTable[1]", response.data );
                           this.setState( { message: "The Table was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteTable() {
  
    TableDataService.delete( this.state.currentTable.id )           // .(01101.01.5 RAM Was: currentTable.id)
      .then( response => { console.log( "deleteTable[1]", response.data );
                           this.props.history.push( '/tables' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentTable } = this.state;

    return (
      <div>
        {currentTable ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>Table</h4>
            <form>

              <div className="form-group"><label htmlFor="id"    >id</label><input     type="text" className="form-control" id="id"    value={currentTable.id}    onChange={this.onChangeid}    /> </div>
              <div className="form-group"><label htmlFor="name"    >name</label><input     type="text" className="form-control" id="name"    value={currentTable.name}    onChange={this.onChangename}    /> </div>
              <div className="form-group"><label htmlFor="title"    >title</label><input     type="text" className="form-control" id="title"    value={currentTable.title}    onChange={this.onChangetitle}    /> </div>
              <div className="form-group"><label htmlFor="group"    >group</label><input     type="text" className="form-control" id="group"    value={currentTable.group}    onChange={this.onChangegroup}    /> </div>
              <div className="form-group"><label htmlFor="description"    >description</label><input     type="text" className="form-control" id="description"    value={currentTable.description}    onChange={this.onChangedescription}    /> </div>
              <div className="form-group"><label htmlFor="enabled"    >enabled</label><input     type="text" className="form-control" id="enabled"    value={currentTable.enabled}    onChange={this.onChangeenabled}    /> </div>
              <div className="form-group"><label htmlFor="url"    >url</label><input     type="text" className="form-control" id="url"    value={currentTable.url}    onChange={this.onChangeurl}    /> </div>

            </form>

            ) 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTable}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTable}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentTable ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Table...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
