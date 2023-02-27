import React, { Component } from "react";
import { Link }             from "react-router-dom";

import MemberDataService    from "../services/member.service";
import AuthService          from "../services/auth.service";

export default class MembersList extends Component {

  constructor( props ) {

    super( props );

    this.onChangeSearchLastName = this.onChangeSearchLastName.bind( this );
    this.retrieveMembers        = this.retrieveMembers.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveMember        = this.setActiveMember.bind(        this );
    this.removeAllMembers       = this.removeAllMembers.bind(       this );
    this.searchLastName         = this.searchLastName.bind(         this );

   const user           =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state          = 
     {  members         : [ ]
     ,  currentMember   :  null
     ,  currentIndex    : -1
     ,  searchLastName  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveMembers();
    }

  onChangeSearchLastName(e) {
                     const searchLastName = e.target.value;
                           this.setState( { searchLastName: searchLastName } );
    }

  retrieveMembers() {
    MemberDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { members: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveMembers();
                           this.setState( { currentMember: null, currentIndex: -1 } );
    }

  setActiveMember( member, index ) {
                           this.setState( { currentMember: member, currentIndex: index } );
    }

  removeAllMembers() {
    MemberDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchLastName() {
    MemberDataService.findByLastName( this.state.searchLastName )
      .then( response => { console.log( response.data );
                           this.setState( { members: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchLastName, members, currentMember, currentIndex } = this.state;

                                                                   // .(01107.02.5 bEG RAM Added conditional buttons)
    const  { isAdmin, isModerator } = this.state;
//                  to    = { '/members/' + currentMember.id }     // .(01118.01.4 RAM Should be currentMember.id, not currentIndex + 1. but it fails
    const    nId    = currentMember ? currentMember.MemberID : 0   //              because the page is rendered before api data is received)

      var  cEdit = (                                         
              <Link
                to        = { '/members/' + nId   }                // .(01118.01.5) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/members/add' }  
                className = "badge badge-warning"
                >
                Add
              </Link>   
              )
           cAdd  = ( isAdmin               ) ? cAdd  : null // .(01107.02.5 End).(01108.01.1 RAM Opps, was ? cEdit) 
    
    return (

      <div className="list row">
        <div className="col-md-8">

          <div className="input-group mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Search by Last Name"
              value={searchLastName}
              onChange={this.onChangeSearchLastName}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchLastName}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Members List</h4>

          <ul className="list-group">
            {members &&
              members.map( ( member, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveMember( member, index ) }
                  key       = {index}
                  >
                  {member.LastName}, {member.FirstName}     {/* .(01029.02.1 RAM Added FirstName) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllMembers}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentMember ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Member</h4>

               <div><label><strong>MemberID:    </strong></label>{" "}{currentMember.MemberID}    </div>    {/* .(01029.01.1 RAM currentMember.{FieldName} Was: lowercase) */}
               <div><label><strong>MemberNo:    </strong></label>{" "}{currentMember.MemberNo}    </div>
               <div><label><strong>TitleName:   </strong></label>{" "}{currentMember.TitleName}   </div>
               <div><label><strong>FirstName:   </strong></label>{" "}{currentMember.FirstName}   </div>
               <div><label><strong>Middlename:  </strong></label>{" "}{currentMember.Middlename}  </div>
               <div><label><strong>LastName:    </strong></label>{" "}{currentMember.LastName}    </div>
               <div><label><strong>PostName:    </strong></label>{" "}{currentMember.PostName}    </div>
               <div><label><strong>Company:     </strong></label>{" "}{currentMember.Company}     </div>
               <div><label><strong>Address1:    </strong></label>{" "}{currentMember.Address1}    </div>
               <div><label><strong>Address2:    </strong></label>{" "}{currentMember.Address2}    </div>
               <div><label><strong>City:        </strong></label>{" "}{currentMember.City}        </div>
               <div><label><strong>State:       </strong></label>{" "}{currentMember.State}       </div>
               <div><label><strong>Zip:         </strong></label>{" "}{currentMember.Zip}         </div>
               <div><label><strong>Country:     </strong></label>{" "}{currentMember.Country}     </div>
               <div><label><strong>Phone1:      </strong></label>{" "}{currentMember.Phone1}      </div>
               <div><label><strong>Phone2:      </strong></label>{" "}{currentMember.Phone2}      </div>
               <div><label><strong>Fax:         </strong></label>{" "}{currentMember.Fax}         </div>
               <div><label><strong>WebSite:     </strong></label>{" "}{currentMember.WebSite}     </div>
               <div><label><strong>Email:       </strong></label>{" "}{currentMember.Email}       </div>
               <div><label><strong>Skills:      </strong></label>{" "}{currentMember.Skills}      </div>
               <div><label><strong>Active:      </strong></label>{" "}{currentMember.Active}      </div>
               <div><label><strong>Bio:         </strong></label>{" "}{currentMember.Bio}         </div>
               <div><label><strong>createdAt:   </strong></label>{" "}{currentMember.createdAt}   </div>     {/* .(01029.01.2 RAM Added) */}
               <div><label><strong>updatedAt:   </strong></label>{" "}{currentMember.updatedAt}   </div>     {/* .(01029.01.1 RAM Added) */}
               <div><label><strong>LastUpdated: </strong></label>{" "}{currentMember.LastUpdated} </div>

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentMember ) { ... }

            <div>
              <br />
              <p>Please click on a Member...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
