import React, { Component } from "react";
import MemberDataService    from "../services/member.service";

// ----------------------------------------------------------------------------------------------------

export default class Member extends Component {

// ----------------------------------------------------------------------------------------------

  constructor( props ) {

    super( props );

// --------------------------------------------------------------------------------------

        this.onChangeMemberID     = this.onChangeMemberID.bind(this);
        this.onChangeMemberNo     = this.onChangeMemberNo.bind(this);
        this.onChangeTitleName    = this.onChangeTitleName.bind(this);
        this.onChangeFirstName    = this.onChangeFirstName.bind(this);
        this.onChangeMiddlename   = this.onChangeMiddlename.bind(this);
        this.onChangeLastName     = this.onChangeLastName.bind(this);
        this.onChangePostName     = this.onChangePostName.bind(this);
        this.onChangeCompany      = this.onChangeCompany.bind(this);
        this.onChangeAddress1     = this.onChangeAddress1.bind(this);
        this.onChangeAddress2     = this.onChangeAddress2.bind(this);
        this.onChangeCity         = this.onChangeCity.bind(this);
        this.onChangeState        = this.onChangeState.bind(this);
        this.onChangeZip          = this.onChangeZip.bind(this);
        this.onChangeCountry      = this.onChangeCountry.bind(this);
        this.onChangePhone1       = this.onChangePhone1.bind(this);
        this.onChangePhone2       = this.onChangePhone2.bind(this);
        this.onChangeFax          = this.onChangeFax.bind(this);
        this.onChangeWebSite      = this.onChangeWebSite.bind(this);
        this.onChangeEmail        = this.onChangeEmail.bind(this);
        this.onChangeLastUpdated  = this.onChangeLastUpdated.bind(this);
        this.onChangeSkills       = this.onChangeSkills.bind(this);
        this.onChangeActive       = this.onChangeActive.bind(this);
        this.onChangeBio          = this.onChangeBio.bind(this);
        this.getMember            = this.getMember.bind(this);
        this.updatePublished      = this.updatePublished.bind(this);
        this.updateMember         = this.updateMember.bind(this);
        this.deleteMember         = this.deleteMember.bind(this);

// --------------------------------------------------------------------------------------

    this.state = {
      currentMember : {
        MemberID    : "",
        MemberNo    : "",
        TitleName   : "",
        FirstName   : "",
        Middlename  : "",
        LastName    : "",
        PostName    : "",
        Company     : "",
        Address1    : "",
        Address2    : "",
        City        : "",
        State       : "",
        Zip         : "",
        Country     : "",
        Phone1      : "",
        Phone2      : "",
        Fax         : "",
        WebSite     : "",
        Email       : "",
        LastUpdated : "",
        Skills      : "",
        Active      : "",
        Bio         : "",

        Published   : false
        },
      message: ""
      };
// --------------------------------------------------------------------------------------
    }
// ----------------------------------------------------------------------------------------------

  componentDidMount() {

    this.getMember( this.props.match.params.id );
    }
// --------------------------------------------------------------------------------------

  onChangeMemberID(e)     { const MemberID    = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, MemberID    : MemberID    } }; }); }
  onChangeMemberNo(e)     { const MemberNo    = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, MemberNo    : MemberNo    } }; }); }
  onChangeTitleName(e)    { const TitleName   = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, TitleName   : TitleName   } }; }); }
  onChangeFirstName(e)    { const FirstName   = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, FirstName   : FirstName   } }; }); }
  onChangeMiddlename(e)   { const Middlename  = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Middlename  : Middlename  } }; }); }
  onChangeLastName(e)     { const LastName    = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, LastName    : LastName    } }; }); }
  onChangePostName(e)     { const PostName    = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, PostName    : PostName    } }; }); }
  onChangeCompany(e)      { const Company     = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Company     : Company     } }; }); }
  onChangeAddress1(e)     { const Address1    = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Address1    : Address1    } }; }); }
  onChangeAddress2(e)     { const Address2    = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Address2    : Address2    } }; }); }
  onChangeCity(e)         { const City        = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, City        : City        } }; }); }
  onChangeState(e)        { const State       = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, State       : State       } }; }); }
  onChangeZip(e)          { const Zip         = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Zip         : Zip         } }; }); }
  onChangeCountry(e)      { const Country     = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Country     : Country     } }; }); }
  onChangePhone1(e)       { const Phone1      = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Phone1      : Phone1      } }; }); }
  onChangePhone2(e)       { const Phone2      = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Phone2      : Phone2      } }; }); }
  onChangeFax(e)          { const Fax         = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Fax         : Fax         } }; }); }
  onChangeWebSite(e)      { const WebSite     = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, WebSite     : WebSite     } }; }); }
  onChangeEmail(e)        { const Email       = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Email       : Email       } }; }); }
  onChangeLastUpdated(e)  { const LastUpdated = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, LastUpdated : LastUpdated } }; }); }
  onChangeSkills(e)       { const Skills      = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Skills      : Skills      } }; }); }
  onChangeActive(e)       { const Active      = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Active      : Active      } }; }); }
  onChangeBio(e)          { const Bio         = e.target.value || ''; this.setState(function(prevState) { return { currentMember: { ...prevState.currentMember, Bio         : Bio         } }; }); }

// --------------------------------------------------------------------------------------

  getMember( id ) {

    MemberDataService.get( id )
      .then( response => { console.log( "getMember[1]", response.data );
                           Object.keys(  response.data ).forEach( function( aFld ) { response.data[ aFld ] = response.data[ aFld ] || "" } )    // .(01101,06,1 RAM React doesn't like nulls)
                           this.setState( { currentMember: response.data } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updatePublished( status ) {

    var data = {
      id:                  this.state.currentMember.MemberID,               // .(01101.01.2 RAM Was: currentMember.id)
//    title:               this.state.currentMember.title,
//    description:         this.state.currentMember.description,
      published:           status
      };

    MemberDataService.update( this.state.currentMember.MemberID, data )     // .(01101.01.3 RAM Was: currentMember.id)
      .then( response => { console.log( "updatePublished[1]", response.data );
                           this.setState( prevState => ( { currentMember: { ...prevState.currentMember, Published: status } } ) ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  updateMember() {

    MemberDataService.update(
                           this.state.currentMember.MemberID,               // .(01101.01.4 RAM Was: currentMember.id)
                           this.state.currentMember )
      .then( response => { console.log( "updateMember[1]", response.data );
                           this.setState( { message: "The member was updated successfully!" } ); } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  deleteMember() {
  
    MemberDataService.delete( this.state.currentMember.MemberID )           // .(01101.01.5 RAM Was: currentMember.id)
      .then( response => { console.log( "deleteMember[1]", response.data );
                           this.props.history.push( '/members' ) } )
      .catch( e       => { console.log( e ); } );
       }
// --------------------------------------------------------------------------------------

  render() {
    const { currentMember } = this.state;

    return (
      <div>
        {currentMember ? (  // ------------------------------------------------------

          <div className="edit-form">
            <h4>Member</h4>
            <form>
              <div className="form-group"><label htmlFor="MemberID"    >MemberID</label><input     type="text" className="form-control" id="MemberID"    value={currentMember.MemberID}    onChange={this.onChangeMemberID}    /> </div>
              <div className="form-group"><label htmlFor="MemberNo"    >MemberNo</label><input     type="text" className="form-control" id="MemberNo"    value={currentMember.MemberNo}    onChange={this.onChangeMemberNo}    /> </div>
              <div className="form-group"><label htmlFor="TitleName"   >TitleName</label><input    type="text" className="form-control" id="TitleName"   value={currentMember.TitleName}   onChange={this.onChangeTitleName}   /> </div>
              <div className="form-group"><label htmlFor="FirstName"   >FirstName</label><input    type="text" className="form-control" id="FirstName"   value={currentMember.FirstName}   onChange={this.onChangeFirstName}   /> </div>
              <div className="form-group"><label htmlFor="Middlename"  >Middlename</label><input   type="text" className="form-control" id="Middlename"  value={currentMember.Middlename}  onChange={this.onChangeMiddlename}  /> </div>
              <div className="form-group"><label htmlFor="LastName"    >LastName</label><input     type="text" className="form-control" id="LastName"    value={currentMember.LastName}    onChange={this.onChangeLastName}    /> </div>
              <div className="form-group"><label htmlFor="PostName"    >PostName</label><input     type="text" className="form-control" id="PostName"    value={currentMember.PostName}    onChange={this.onChangePostName}    /> </div>
              <div className="form-group"><label htmlFor="Company"     >Company</label><input      type="text" className="form-control" id="Company"     value={currentMember.Company}     onChange={this.onChangeCompany}     /> </div>
              <div className="form-group"><label htmlFor="Address1"    >Address1</label><input     type="text" className="form-control" id="Address1"    value={currentMember.Address1}    onChange={this.onChangeAddress1}    /> </div>
              <div className="form-group"><label htmlFor="Address2"    >Address2</label><input     type="text" className="form-control" id="Address2"    value={currentMember.Address2}    onChange={this.onChangeAddress2}    /> </div>
              <div className="form-group"><label htmlFor="City"        >City</label><input         type="text" className="form-control" id="City"        value={currentMember.City}        onChange={this.onChangeCity}        /> </div>
              <div className="form-group"><label htmlFor="State"       >State</label><input        type="text" className="form-control" id="State"       value={currentMember.State}       onChange={this.onChangeState}       /> </div>
              <div className="form-group"><label htmlFor="Zip"         >Zip</label><input          type="text" className="form-control" id="Zip"         value={currentMember.Zip}         onChange={this.onChangeZip}         /> </div>
              <div className="form-group"><label htmlFor="Country"     >Country</label><input      type="text" className="form-control" id="Country"     value={currentMember.Country}     onChange={this.onChangeCountry}     /> </div>
              <div className="form-group"><label htmlFor="Phone1"      >Phone1</label><input       type="text" className="form-control" id="Phone1"      value={currentMember.Phone1}      onChange={this.onChangePhone1}      /> </div>
              <div className="form-group"><label htmlFor="Phone2"      >Phone2</label><input       type="text" className="form-control" id="Phone2"      value={currentMember.Phone2}      onChange={this.onChangePhone2}      /> </div>
              <div className="form-group"><label htmlFor="Fax"         >Fax</label><input          type="text" className="form-control" id="Fax"         value={currentMember.Fax}         onChange={this.onChangeFax}         /> </div>
              <div className="form-group"><label htmlFor="WebSite"     >WebSite</label><input      type="text" className="form-control" id="WebSite"     value={currentMember.WebSite}     onChange={this.onChangeWebSite}     /> </div>
              <div className="form-group"><label htmlFor="Email"       >Email</label><input        type="text" className="form-control" id="Email"       value={currentMember.Email}       onChange={this.onChangeEmail}       /> </div>
              <div className="form-group"><label htmlFor="LastUpdated" >LastUpdated</label><input  type="text" className="form-control" id="LastUpdated" value={currentMember.LastUpdated} onChange={this.onChangeLastUpdated} /> </div>
              <div className="form-group"><label htmlFor="Skills"      >Skills</label><input       type="text" className="form-control" id="Skills"      value={currentMember.Skills}      onChange={this.onChangeSkills}      /> </div>
              <div className="form-group"><label htmlFor="Active"      >Active</label><input       type="text" className="form-control" id="Active"      value={currentMember.Active}      onChange={this.onChangeActive}      /> </div>
              <div className="form-group"><label htmlFor="Bio"         >Bio</label><input          type="text" className="form-control" id="Bio"         value={currentMember.Bio}         onChange={this.onChangeBio}         /> </div>

              <div className="form-group"><label>                <strong>Status:</strong></label>                                                              {currentMember.Published ? "Published" : "Pending"}                </div>

            </form>

            {currentMember.Published ? (  // ----------------------------------------

              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
                >
                UnPublish
              </button>

            ) : (   // else if ( ! currentMember.Published ) { ... } ----------------

              <button
                className = "badge badge-primary mr-2"
                onClick   = { ( ) => this.updatePublished( true ) }
                >
                Publish
              </button>
            ) }

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMember}
              >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMember}
              >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>

        ) : (  // else if ( ! currentMember ) { ... } -------------------------------

          <div>
            <br />
            <p>Please click on a Member...</p>
          </div>
        ) }

      </div>
    );
  }
// --------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------------
