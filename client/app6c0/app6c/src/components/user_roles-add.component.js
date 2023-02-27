import React, { Component } from 'react';
import User_rolesDataService    from '../services/user_roles.service';

export default class AddUser_roles extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
this.onChangeuserId = this.onChangeuserId.bind(this);
this.onChangeroleId = this.onChangeroleId.bind(this);

    this.state = {

//    <<COLNAME>>    : "",
// id should be null->      id            : null,
  userId : null,
  roleId : null,

      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }
onChangeuserId(e) { this.setState({ userId: e.target.value }); }
onChangeroleId(e) { this.setState({ roleId: e.target.value }); }

  saveUser_roles() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,
      userId: this.state.userId,
      roleId: this.state.roleId,
        
        };

    User_rolesDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,
userId: response.data.userId,
roleId: response.data.roleId,

          submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser_roles() {

    this.setState( {
    
//      <<COLNAME>>    : "",
// id should be null->      id            : null,
userId: null,
roleId: null,
      
      submitted   : false
      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser_roles}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="userid">userId</label><input type="text" className="form-control" id="userid" required value={this.state.userid} onChange={this.onChangeuserId} name="userId" /> </div>
            <div className="form-group"><label htmlFor="roleid">roleId</label><input type="text" className="form-control" id="roleid" required value={this.state.roleid} onChange={this.onChangeroleId} name="roleId" /> </div>
            
            <button onClick={this.saveUser_roles} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
