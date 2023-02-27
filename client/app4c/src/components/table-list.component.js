import React, { Component } from "react";
import TableDataService     from "../services/table.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class TablesList extends Component {

  constructor( props ) {

    super( props );
    

    this.onChangeSearchtitle = this.onChangeSearchtitle.bind( this );
    this.retrieveTables        = this.retrieveTables.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveTable        = this.setActiveTable.bind(        this );
    this.removeAllTables       = this.removeAllTables.bind(       this );
    this.searchBytitle       = this.searchBytitle.bind( this );       // .(01118.03.1 Use CamelCase title)

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  tables         : [ ]
     ,  currentTable   :  null
     ,  currentIndex    : -1
     ,  searchtitle  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveTables();
    }

  onChangeSearchtitle(e) {
                     const searchtitle = e.target.value;
                           this.setState( { searchtitle: searchtitle } );
    }

  retrieveTables() {
    TableDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { tables: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveTables();
                           this.setState( { currentTable: null, currentIndex: -1 } );
    }

  setActiveTable( table, index ) {
                           this.setState( { currentTable: table, currentIndex: index } );
    }

  removeAllTables() {
    TableDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchBytitle() {                                                  // .(01118.03.2 RAM Change name of search method)
    TableDataService.findBytitle( this.state.searchtitle )
      .then( response => { console.log( response.data );
                           this.setState( { tables: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchtitle, tables, currentTable, currentIndex } = this.state;

                                                          // .(01107.02.5 Beg RAM Added conditional buttons)
//            to    = { '/users/' + currentIndex + 1 }    // .(01118.01.2 RAM Should be currentTable.id, not currentIndex + 1. but it fails
    const    nId    = currentTable ? currentTable.id : 0   //              because the page is rendered before api data is received)

    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/tables/' + nId   }        // .(01118.01.3) 
                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/tables/add' }  
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
              placeholder="Search by title"
              value={searchtitle}
              onChange={this.onChangeSearchtitle}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBytitle}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Tables List</h4>

          <ul className="list-group">
            {tables &&
              tables.map( ( table, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveTable( table, index ) }
                  key       = {index}
                  >
                  {table.title}             {/* .(01118.03.3 Use Table's "search" column name: title) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllTables}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentTable ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Table</h4>

              <div><label><strong>id:    </strong></label>{" "}{currentTable.id}    </div>
              <div><label><strong>name:    </strong></label>{" "}{currentTable.name}    </div>
              <div><label><strong>title:    </strong></label>{" "}{currentTable.title}    </div>
              <div><label><strong>group:    </strong></label>{" "}{currentTable.group}    </div>
              <div><label><strong>description:    </strong></label>{" "}{currentTable.description}    </div>
              <div><label><strong>enabled:    </strong></label>{" "}{currentTable.enabled}    </div>
              <div><label><strong>url:    </strong></label>{" "}{currentTable.url}    </div>

               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentTable ) { ... }

            <div>
              <br />
              <p>Please click on a Table...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
