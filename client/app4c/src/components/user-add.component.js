import React, { Component } from 'react';
import userDataService    from '../services/user.service';

export default class Adduser extends Component {

  constructor( props ) {

    super( props );

//    this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);
    this.onChangeid = this.onChangeid.bind(this);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangeactive = this.onChangeactive.bind(this);

    this.state = {
      id            : null,
      title         : "",
      description   : "",
      published     : false,

      submitted     : false
    };
  }

  //onChange<<COLNAME>>(e)     { this.setState({ <<COLNAME>>:     e.target.value }); }
  onChangeid(e) { this.setState({ id: e.target.value }); }
  onChangeusername(e) { this.setState({ username: e.target.value }); }
  onChangeemail(e) { this.setState({ email: e.target.value }); }
  onChangepassword(e) { this.setState({ password: e.target.value }); }
  onChangeactive(e) { this.setState({ active: e.target.value }); }
  
  saveuser() {

    var data = {

//          <<COLNAME>>:     this.state.<<COLNAME>>,
          id: this.state.id,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          active: this.state.active,
        
        };

    userDataService.create( data )

      .then( response => {

        this.setState( {
        
//          <<COLNAME>>    : response.data.<<COLNAME>>,
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
          active: response.data.active,



//        Published   : response.data.Published,
          Submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newuser() {

    this.setState( {
    
//      <<COLNAME>>    : "",
      id: "",
      username: "",
      email: "",
      password: "",
      active: "",

      Published   : false,
      Submitted   : false
      } );
    }

  render() {

    return (

      <div className="submit-form">

        {this.state.Submitted ? (

          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newuser}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>

            <div className="form-group"><label htmlFor="id">id</label><input type="text" className="form-control" id="id" required value={this.state.id} onChange={this.onChangeid} name="id" /> </div>
            <div className="form-group"><label htmlFor="username">username</label><input type="text" className="form-control" id="username" required value={this.state.username} onChange={this.onChangeusername} name="username" /> </div>
            <div className="form-group"><label htmlFor="email">email</label><input type="text" className="form-control" id="email" required value={this.state.email} onChange={this.onChangeemail} name="email" /> </div>
            <div className="form-group"><label htmlFor="password">password</label><input type="text" className="form-control" id="password" required value={this.state.password} onChange={this.onChangepassword} name="password" /> </div>
            <div className="form-group"><label htmlFor="active">active</label><input type="text" className="form-control" id="active" required value={this.state.active} onChange={this.onChangeactive} name="active" /> </div>

            <button onClick={this.saveuser} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
