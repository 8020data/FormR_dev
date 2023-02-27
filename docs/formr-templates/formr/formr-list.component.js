import React, { Component } from "react";
import FormrDataService     from "../services/formr.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class FormrsList extends Component {

  constructor( props ) {

    super( props );
    

    this.onChangeSearch<<SearchCol>> = this.onChangeSearch<<SearchCol>>.bind( this );
    this.retrieveFormrs        = this.retrieveFormrs.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveFormr        = this.setActiveFormr.bind(        this );
    this.removeAllFormrs       = this.removeAllFormrs.bind(       this );
    this.searchBy<<SearchCol>>       = this.searchBy<<SearchCol>>.bind( this );       // .(01118.03.1 Use CamelCase <<SearchCol>>)

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  formrs         : [ ]
     ,  currentFormr   :  null
     ,  currentIndex    : -1
     ,  search<<SearchCol>>  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveFormrs();
    }

  onChangeSearch<<SearchCol>>(e) {
                     const search<<SearchCol>> = e.target.value;
                           this.setState( { search<<SearchCol>>: search<<SearchCol>> } );
    }

  retrieveFormrs() {
    FormrDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { formrs: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveFormrs();
                           this.setState( { currentFormr: null, currentIndex: -1 } );
    }

  setActiveFormr( formr, index ) {
                           this.setState( { currentFormr: formr, currentIndex: index } );
    }

  removeAllFormrs() {
    FormrDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchBy<<SearchCol>>() {                                                  // .(01118.03.2 RAM Change name of search method)
    FormrDataService.findBy<<SearchCol>>( this.state.search<<SearchCol>> )
      .then( response => { console.log( response.data );
                           this.setState( { formrs: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { search<<SearchCol>>, formrs, currentFormr, currentIndex } = this.state;

                                                          // .(01107.02.5 Beg RAM Added conditional buttons)
//            to    = { '/users/' + currentIndex + 1 }    // .(01118.01.2 RAM Should be currentFormr.id, not currentIndex + 1. but it fails
    const    nId    = currentFormr ? currentFormr.id : 0   //              because the page is rendered before api data is received)

    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/formrs/' + nId   }        // .(01118.01.3) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/formrs/add' }  
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
              placeholder="Search by <<SearchCol>>"
              value={search<<SearchCol>>}
              onChange={this.onChangeSearch<<SearchCol>>}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBy<<SearchCol>>}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Formrs List</h4>

          <ul className="list-group">
            {formrs &&
              formrs.map( ( formr, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveFormr( formr, index ) }
                  key       = {index}
                  >
                  {formr.<<searchCol>>}             {/* .(01118.03.3 Use Table's "search" column name: <<searchCol>>) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllFormrs}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentFormr ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Formr</h4>

              <div><label><strong><<COLNAME>>:    </strong></label>{" "}{currentFormr.<<COLNAME>>}    </div>    {/* .(01029.01.1 RAM currentFormr.{FieldName} Was: lowercase) */}

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentFormr ) { ... }

            <div>
              <br />
              <p>Please click on a Formr...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
