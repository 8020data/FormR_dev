import React, { Component } from "react";
import MemberDataService from "../services/member.service";

export default class AddMember extends Component {

  constructor( props ) {

    super( props );

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
    this.saveMember           = this.saveMember.bind(this);
    this.newMember            = this.newMember.bind(this);

    this.state = {
      id            : null,
      title         : "",
      description   : "",
      published     : false,

      submitted     : false
    };
  }

  onChangeMemberID(e)     { this.setState({ MemberID:     e.target.value }); }
  onChangeMemberNo(e)     { this.setState({ MemberNo:     e.target.value }); }
  onChangeTitleName(e)    { this.setState({ TitleName:    e.target.value }); }
  onChangeFirstName(e)    { this.setState({ FirstName:    e.target.value }); }
  onChangeMiddlename(e)   { this.setState({ Middlename:   e.target.value }); }
  onChangeLastName(e)     { this.setState({ LastName:     e.target.value }); }
  onChangePostName(e)     { this.setState({ PostName:     e.target.value }); }
  onChangeCompany(e)      { this.setState({ Company:      e.target.value }); }
  onChangeAddress1(e)     { this.setState({ Address1:     e.target.value }); }
  onChangeAddress2(e)     { this.setState({ Address2:     e.target.value }); }
  onChangeCity(e)         { this.setState({ City:         e.target.value }); }
  onChangeState(e)        { this.setState({ State:        e.target.value }); }
  onChangeZip(e)          { this.setState({ Zip:          e.target.value }); }
  onChangeCountry(e)      { this.setState({ Country:      e.target.value }); }
  onChangePhone1(e)       { this.setState({ Phone1:       e.target.value }); }
  onChangePhone2(e)       { this.setState({ Phone2:       e.target.value }); }
  onChangeFax(e)          { this.setState({ Fax:          e.target.value }); }
  onChangeWebSite(e)      { this.setState({ WebSite:      e.target.value }); }
  onChangeEmail(e)        { this.setState({ Email:        e.target.value }); }
  onChangeLastUpdated(e)  { this.setState({ LastUpdated:  e.target.value }); }
  onChangeSkills(e)       { this.setState({ Skills:       e.target.value }); }
  onChangeActive(e)       { this.setState({ Active:       e.target.value }); }
  onChangeBio(e)          { this.setState({ Bio:          e.target.value }); }

  saveMember() {

    var data = {
          MemberID:     this.state.MemberID,
          MemberNo:     this.state.MemberNo,
          TitleName:    this.state.TitleName,
          FirstName:    this.state.FirstName,
          Middlename:   this.state.Middlename,
          LastName:     this.state.LastName,
          PostName:     this.state.PostName,
          Company:      this.state.Company,
          Address1:     this.state.Address1,
          Address2:     this.state.Address2,
          City:         this.state.City,
          State:        this.state.State,
          Zip:          this.state.Zip,
          Country:      this.state.Country,
          Phone1:       this.state.Phone1,
          Phone2:       this.state.Phone2,
          Fax:          this.state.Fax,
          WebSite:      this.state.WebSite,
          Email:        this.state.Email,
          LastUpdated:  this.state.LastUpdated,
          Skills:       this.state.Skills,
          Active:       this.state.Active,
          Bio:          this.state.Bio,    };

    MemberDataService.create( data )

      .then( response => {

        this.setState( {
        //id          : response.data.id,
          MemberID    : response.data.MemberID,
          MemberNo    : response.data.MemberNo,
          TitleName   : response.data.TitleName,
          FirstName   : response.data.FirstName,
          Middlename  : response.data.Middlename,
          LastName    : response.data.LastName,
          PostName    : response.data.PostName,
          Company     : response.data.Company,
          Address1    : response.data.Address1,
          Address2    : response.data.Address2,
          City        : response.data.City,
          State       : response.data.State,
          Zip         : response.data.Zip,
          Country     : response.data.Country,
          Phone1      : response.data.Phone1,
          Phone2      : response.data.Phone2,
          Fax         : response.data.Fax,
          WebSite     : response.data.WebSite,
          Email       : response.data.Email,
          LastUpdated : response.data.LastUpdated,
          Skills      : response.data.Skills,
          Active      : response.data.Active,
          Bio         : response.data.Bio,

//        Published   : response.data.Published,
          Submitted   : true
        });
        console.log(    response.data );
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMember() {

    this.setState( {
    //id          : null,
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
            <button className="btn btn-success" onClick={this.newMember}>
              Add
            </button>
          </div>

        ) : (  // else if ( ! this.state.submitted ) { ... }

          <div>
            <div className="form-group"><label htmlFor="MemberID"    >MemberID</label><input     type="text" className="form-control" id="MemberID"     required value={this.state.MemberID}    onChange={this.onChangeMemberID}    name="MemberID"     /> </div>
            <div className="form-group"><label htmlFor="MemberNo"    >MemberNo</label><input     type="text" className="form-control" id="MemberNo"     required value={this.state.MemberNo}    onChange={this.onChangeMemberNo}    name="MemberNo"     /> </div>
            <div className="form-group"><label htmlFor="TitleName"   >TitleName</label><input    type="text" className="form-control" id="TitleName"    required value={this.state.TitleName}   onChange={this.onChangeTitleName}   name="TitleName"    /> </div>
            <div className="form-group"><label htmlFor="FirstName"   >FirstName</label><input    type="text" className="form-control" id="FirstName"    required value={this.state.FirstName}   onChange={this.onChangeFirstName}   name="FirstName"    /> </div>
            <div className="form-group"><label htmlFor="Middlename"  >Middlename</label><input   type="text" className="form-control" id="Middlename"   required value={this.state.Middlename}  onChange={this.onChangeMiddlename}  name="Middlename"   /> </div>
            <div className="form-group"><label htmlFor="LastName"    >LastName</label><input     type="text" className="form-control" id="LastName"     required value={this.state.LastName}    onChange={this.onChangeLastName}    name="LastName"     /> </div>
            <div className="form-group"><label htmlFor="PostName"    >PostName</label><input     type="text" className="form-control" id="PostName"     required value={this.state.PostName}    onChange={this.onChangePostName}    name="PostName"     /> </div>
            <div className="form-group"><label htmlFor="Company"     >Company</label><input      type="text" className="form-control" id="Company"      required value={this.state.Company}     onChange={this.onChangeCompany}     name="Company"      /> </div>
            <div className="form-group"><label htmlFor="Address1"    >Address1</label><input     type="text" className="form-control" id="Address1"     required value={this.state.Address1}    onChange={this.onChangeAddress1}    name="Address1"     /> </div>
            <div className="form-group"><label htmlFor="Address2"    >Address2</label><input     type="text" className="form-control" id="Address2"     required value={this.state.Address2}    onChange={this.onChangeAddress2}    name="Address2"     /> </div>
            <div className="form-group"><label htmlFor="City"        >City</label><input         type="text" className="form-control" id="City"         required value={this.state.City}        onChange={this.onChangeCity}        name="City"         /> </div>
            <div className="form-group"><label htmlFor="State"       >State</label><input        type="text" className="form-control" id="State"        required value={this.state.State}       onChange={this.onChangeState}       name="State"        /> </div>
            <div className="form-group"><label htmlFor="Zip"         >Zip</label><input          type="text" className="form-control" id="Zip"          required value={this.state.Zip}         onChange={this.onChangeZip}         name="Zip"          /> </div>
            <div className="form-group"><label htmlFor="Country"     >Country</label><input      type="text" className="form-control" id="Country"      required value={this.state.Country}     onChange={this.onChangeCountry}     name="Country"      /> </div>
            <div className="form-group"><label htmlFor="Phone1"      >Phone1</label><input       type="text" className="form-control" id="Phone1"       required value={this.state.Phone1}      onChange={this.onChangePhone1}      name="Phone1"       /> </div>
            <div className="form-group"><label htmlFor="Phone2"      >Phone2</label><input       type="text" className="form-control" id="Phone2"       required value={this.state.Phone2}      onChange={this.onChangePhone2}      name="Phone2"       /> </div>
            <div className="form-group"><label htmlFor="Fax"         >Fax</label><input          type="text" className="form-control" id="Fax"          required value={this.state.Fax}         onChange={this.onChangeFax}         name="Fax"          /> </div>
            <div className="form-group"><label htmlFor="WebSite"     >WebSite</label><input      type="text" className="form-control" id="WebSite"      required value={this.state.WebSite}     onChange={this.onChangeWebSite}     name="WebSite"      /> </div>
            <div className="form-group"><label htmlFor="Email"       >Email</label><input        type="text" className="form-control" id="Email"        required value={this.state.Email}       onChange={this.onChangeEmail}       name="Email"        /> </div>
            <div className="form-group"><label htmlFor="LastUpdated" >LastUpdated</label><input  type="text" className="form-control" id="LastUpdated"  required value={this.state.LastUpdated} onChange={this.onChangeLastUpdated} name="LastUpdated"  /> </div>
            <div className="form-group"><label htmlFor="Skills"      >Skills</label><input       type="text" className="form-control" id="Skills"       required value={this.state.Skills}      onChange={this.onChangeSkills}      name="Skills"       /> </div>
            <div className="form-group"><label htmlFor="Active"      >Active</label><input       type="text" className="form-control" id="Active"       required value={this.state.Active}      onChange={this.onChangeActive}      name="Active"       /> </div>
            <div className="form-group"><label htmlFor="Bio"         >Bio</label><input          type="text" className="form-control" id="Bio"          required value={this.state.Bio}         onChange={this.onChangeBio}         name="Bio"          /> </div>

            <button onClick={this.saveMember} className="btn btn-success">
              Submit
            </button>
          </div>

        ) }
      </div>
    );
  }
}
