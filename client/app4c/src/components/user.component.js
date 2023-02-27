import React, { Component } from "react";
import userDataService    from "../services/user.service";

// ----------------------------------------------------------------------------------------------------

export default class user extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

//      this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);   delete Update/Create
        this.onChangeid           = this.onChangeid.bind(this);
        this.onChangeusername     = this.onChangeusername.bind(this);
        this.onChangeemail        = this.onChangeemail.bind(this);
        this.onChangepassword     = this.onChangepassword.bind(this);
        this.onChangeactive       = this.onChangeactive.bind(this);
//      this.onChangecreatedAt    = this.onChangecreatedAt.bind(this);    //#.(01118.02.1 RAM Method not defined)
//      this.onChangeupdatedAt    = this.onChangeupdatedAt.bind(this);    //#.(01118.02.2)

        this.getuser              = this.getuser.bind(this);
        this.updatePublished      = this.updatePublished.bind(this);
        this.updateuser           = this.updateuser.bind(this);
        this.deleteuser           = this.deleteuser.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentuser : {

//        <<COLNAME>>    : "",
        id          : "",
        username    : "",
        email       : "",
        password    : "",
        active      : "",

        Published   : false
        },

      message       : ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getuser( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentuser: { ...prevState.currentuser, <<COLNAME>>    : <<COLNAME>>    } }; }); }
  onChangeid(e)           { const id       = e.target.value || ''; this.setState(function(prevState) { return { currentuser: { ...prevState.currentuser,id    : id    } }; }); }
  onChangeusername(e)     { const username = e.target.value || ''; this.setState(function(prevState) { return { currentuser: { ...prevState.currentuser,username    : username    } }; }); }
  onChangeemail(e)        { const email    = e.target.value || ''; this.setState(function(prevState) { return { currentuser: { ...prevState.currentuser,email    : email    } }; }); }
  onChangepassword(e)     { const password = e.target.value || ''; this.setState(function(prevState) { return { currentuser: { ...prevState.currentuser,password    : password    } }; }); }
  onChangeactive(e)       { const active   = e.target.value || ''; this.setState(function(prevState) { return { currentuser: { ...prevState.currentuser,active    : active    } }; }); }

// --------------------------------------------------------------------------------------

  getuser( id ) {

    userDataService.get( id )
      .then( response => { console.log( "getuser[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentuser: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updatePublished( status ) {

    var data = {
      id:                  this.state.currentuser.id,               // .(01101.01.2 RAM Was: currentFormr.id)
//    title:               this.state.currentFormr.title,
//    description:         this.state.currentFormr.description,
      published:           status
      };

    userDataService.update( this.state.currentuser.id, data )     // .(01101.01.3 RAM Was: currentuser.id)
      .then( response => { console.log( "updatePublished[1]", response.data );
                           this.setState( prevState => ( { currentuser: { ...prevState.currentuser, Published: status } } ) ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateuser() {
                           console.log( "updateuser[1]", this.state.currentuser );
    userDataService.update(
                           this.state.currentuser.id,               // .(01101.01.4 RAM Was: currentuser.id)
                           this.state.currentuser )
      .then( response => { console.log( "updateuser[3]", response.data );
                           this.setState( { message: "The user was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteuser() {
  
    userDataService.delete( this.state.currentuser.id )           // .(01101.01.5 RAM Was: currentuser.id)
      .then( response => { console.log( "deleteuser[1]", response.data );
                           this.props.history.push( '/users' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentuser } = this.state;

    return (
      <div>
        {currentuser ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>user</h4>
            <form>
            <div className="form-group"><label htmlFor="id"    >id</label><input     type="text" className="form-control" id="id"    value={currentuser.id}    onChange={this.onChangeid}    /> </div>
              <div className="form-group"><label htmlFor="username"    >username</label><input     type="text" className="form-control" id="username"    value={currentuser.username}    onChange={this.onChangeusername}    /> </div>
              <div className="form-group"><label htmlFor="email"    >email</label><input     type="text" className="form-control" id="email"    value={currentuser.email}    onChange={this.onChangeemail}    /> </div>
              <div className="form-group"><label htmlFor="password"    >password</label><input     type="text" className="form-control" id="password"    value={currentuser.password}    onChange={this.onChangepassword}    /> </div>
              <div className="form-group"><label htmlFor="active"    >active</label><input     type="text" className="form-control" id="active"    value={currentuser.active}    onChange={this.onChangeactive}    /> </div>
                
              <div className="form-group"><label>                <strong>Status:</strong></label>                                                              {currentuser.Published ? "Published" : "Pending"}                </div>

            </form>

            {currentuser.Published ? (  // ----------------------------------------

              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
                >
                UnPublish
              </button>

            ) : (   // else if ( ! currentuser.Published ) { ... } ----------------

              <button
                className = "badge badge-primary mr-2"
                onClick   = { ( ) => this.updatePublished( true ) }
                >
                Publish
              </button>
            ) }

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteuser}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateuser}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentuser ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a user...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
