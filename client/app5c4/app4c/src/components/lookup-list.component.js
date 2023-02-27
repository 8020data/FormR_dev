import React, { Component } from "react";
import LookupDataService     from "../services/lookup.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class LookupsList extends Component {

  constructor( props ) {

    super( props );
    

    this.onChangeSearchtype = this.onChangeSearchtype.bind( this );
    this.retrieveLookups        = this.retrieveLookups.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveLookup        = this.setActiveLookup.bind(        this );
    this.removeAllLookups       = this.removeAllLookups.bind(       this );
    this.searchBytype       = this.searchBytype.bind( this );       // .(01118.03.1 Use CamelCase type)

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  lookups         : [ ]
     ,  currentLookup   :  null
     ,  currentIndex    : -1
     ,  searchtype  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveLookups();
    }

  onChangeSearchtype(e) {
                     const searchtype = e.target.value;
                           this.setState( { searchtype: searchtype } );
    }

  retrieveLookups() {
    LookupDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { lookups: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveLookups();
                           this.setState( { currentLookup: null, currentIndex: -1 } );
    }

  setActiveLookup( lookup, index ) {
                           this.setState( { currentLookup: lookup, currentIndex: index } );
    }

  removeAllLookups() {
    LookupDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchBytype() {                                                  // .(01118.03.2 RAM Change name of search method)
    LookupDataService.findBytype( this.state.searchtype )
      .then( response => { console.log( response.data );
                           this.setState( { lookups: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchtype, lookups, currentLookup, currentIndex } = this.state;

                                                          // .(01107.02.5 Beg RAM Added conditional buttons)
//            to    = { '/users/' + currentIndex + 1 }    // .(01118.01.2 RAM Should be currentLookup.id, not currentIndex + 1. but it fails
    const    nId    = currentLookup ? currentLookup.id : 0   //              because the page is rendered before api data is received)

    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/lookups/' + nId   }        // .(01118.01.3) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/lookups/add' }  
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
              placeholder="Search by type"
              value={searchtype}
              onChange={this.onChangeSearchtype}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBytype}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Lookups List</h4>

          <ul className="list-group">
            {lookups &&
              lookups.map( ( lookup, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveLookup( lookup, index ) }
                  key       = {index}
                  >
                  {lookup.type}             {/* .(01118.03.3 Use Table's "search" column name: type) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllLookups}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentLookup ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Lookup</h4>

              <div><label><strong>id:    </strong></label>{" "}{currentLookup.id}    </div>
              <div><label><strong>type:    </strong></label>{" "}{currentLookup.type}    </div>
              <div><label><strong>value:    </strong></label>{" "}{currentLookup.value}    </div>

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentLookup ) { ... }

            <div>
              <br />
              <p>Please click on a Lookup...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
