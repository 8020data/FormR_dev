import React, { Component } from 'react';
import Roles_tablesDataService    from '../services/roles_tables.service';

export default class AddRoles_tables extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeid = this.onChangeid.bind(this);
this.onChangetableId = this.onChangetableId.bind(this);
this.onChangeroleId = this.onChangeroleId.bind(this);
this.onChangeallowInsert = this.onChangeallowInsert.bind(this);
this.onChangeallowUpdate = this.onChangeallowUpdate.bind(this);
this.onChangeallowDelete = this.onChangeallowDelete.bind(this);

    this.state = {

//    <<COLNAME>>    : "",
// id should be null->      id            : null,
  id : null,
  tableId : null,
  roleId : null,
  allowInsert : "",
  allowUpdate : "",
  allowDelete : "",

      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }
onChangeid(e) { this.setState({ id: e.target.value }); }
onChangetableId(e) { this.setState({ tableId: e.target.value }); }
onChangeroleId(e) { this.setState({ roleId: e.target.value }); }
onChangeallowInsert(e) { this.setState({ allowInsert: e.target.value }); }
onChangeallowUpdate(e) { this.setState({ allowUpdate: e.target.value }); }
onChangeallowDelete(e) { this.setState({ allowDelete: e.target.value }); }

  saveRoles_tables() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,
id: this.state.id,
tableId: this.state.tableId,
roleId: this.state.roleId,
allowInsert: this.state.allowInsert,
allowUpdate: this.state.allowUpdate,
allowDelete: this.state.allowDelete,
        
        };

    Roles_tablesDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,
id: response.data.id,
tableId: response.data.tableId,
roleId: response.data.roleId,
allowInsert: response.data.allowInsert,
allowUpdate: response.data.allowUpdate,
allowDelete: response.data.allowDelete,

          submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newRoles_tables() {

    this.setState( {
    
//      <<COLNAME>>    : "",
// id should be null->      id            : null,
id: null,
tableId: null,
roleId: null,
allowInsert: "",
allowUpdate: "",
allowDelete: "",
      
      submitted   : false
      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newRoles_tables}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="id">id</label><input type="text" className="form-control" id="id" required value={this.state.id} onChange={this.onChangeid} name="id" /> </div>
            <div className="form-group"><label htmlFor="tableid">tableId</label><input type="text" className="form-control" id="tableid" required value={this.state.tableid} onChange={this.onChangetableId} name="tableId" /> </div>
            <div className="form-group"><label htmlFor="roleid">roleId</label><input type="text" className="form-control" id="roleid" required value={this.state.roleid} onChange={this.onChangeroleId} name="roleId" /> </div>
            <div className="form-group"><label htmlFor="allowinsert">allowInsert</label><input type="text" className="form-control" id="allowinsert" required value={this.state.allowinsert} onChange={this.onChangeallowInsert} name="allowInsert" /> </div>
            <div className="form-group"><label htmlFor="allowupdate">allowUpdate</label><input type="text" className="form-control" id="allowupdate" required value={this.state.allowupdate} onChange={this.onChangeallowUpdate} name="allowUpdate" /> </div>
            <div className="form-group"><label htmlFor="allowdelete">allowDelete</label><input type="text" className="form-control" id="allowdelete" required value={this.state.allowdelete} onChange={this.onChangeallowDelete} name="allowDelete" /> </div>

            <button onClick={this.saveRoles_tables} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
