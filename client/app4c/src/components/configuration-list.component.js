import React, { Component } from "react";
import ConfigurationDataService     from "../services/configuration.service";
import AuthService          from "../services/auth.service";
import { Link }             from "react-router-dom";

export default class ConfigurationsList extends Component {

  constructor( props ) {

    super( props );

    this.onChangeSearchdescription = this.onChangeSearchdescription.bind( this );
    this.retrieveConfigurations        = this.retrieveConfigurations.bind(        this );
    this.refreshList            = this.refreshList.bind(            this );
    this.setActiveConfiguration        = this.setActiveConfiguration.bind(        this );
    this.removeAllConfigurations       = this.removeAllConfigurations.bind(       this );
    this.searchBydescription       = this.searchBydescription.bind( this );       // .(01118.03.1 Use CamelCase description)

   const user         =  AuthService.getCurrentUser();                                // .(01107.04.1)

    this.state        = 
     {  configurations         : [ ]
     ,  currentConfiguration   :  null
     ,  currentIndex    : -1
     ,  searchdescription  : ""
     ,  isUser          :  user ? true : false                                        // .(01107.04.2)
     ,  isModerator     :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false     // .(01107.04.3)
     ,  isAdmin         :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false     // .(01107.04.4)
        }
    }

  componentDidMount() {
                           this.retrieveConfigurations();
    }

  onChangeSearchdescription(e) {
                     const searchdescription = e.target.value;
                           this.setState( { searchdescription: searchdescription } );
    }

  retrieveConfigurations() {
    ConfigurationDataService.getAll()
      .then( response => { console.log( response.data );
                           this.setState( { configurations: response.data } ); } )
      .catch( e       => { console.log( e ); });
    }

  refreshList() {
                           this.retrieveConfigurations();
                           this.setState( { currentConfiguration: null, currentIndex: -1 } );
    }

  setActiveConfiguration( configuration, index ) {
                           this.setState( { currentConfiguration: configuration, currentIndex: index } );
    }

  removeAllConfigurations() {
    ConfigurationDataService.deleteAll()
      .then( response => { console.log( response.data );
                           this.refreshList(); } )
      .catch( e       => { console.log( e ); } );
    }

  searchBydescription() {                                                  // .(01118.03.2 RAM Change name of search method)
    ConfigurationDataService.findBydescription( this.state.searchdescription )
      .then( response => { console.log( response.data );
                           this.setState( { configurations: response.data });
        })
      .catch(e => {        console.log( e ); } );
    }

  render() {

    const  { searchdescription, configurations, currentConfiguration, currentIndex } = this.state;

                                                                            // .(01107.02.5 Beg RAM Added conditional buttons)
//  const    nId    = currentRole          ? currentRole.id          : 0    // .(01116.01.1 Guard against null id because the page is rendered before api data is received)
    const    nId    = currentConfiguration ? currentConfiguration.id : 0    // .(01121.02.4 RAM S.B. RecordSet name as defined above)
    const  { isAdmin, isModerator } = this.state;
      var  cEdit = (                                         
              <Link
                to        = { '/configurations/' + nId   }                  // .(01118.01.3) 

                className = "badge badge-warning"
                >
                Edit
              </Link>   
              )
           cEdit = (isAdmin || isModerator) ? cEdit : null

      var  cAdd = (  
              <Link
                to        = { '/configurations/add' }  
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
              placeholder="Search by description"
              value={searchdescription}
              onChange={this.onChangeSearchdescription}
              />


            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBydescription}
                >
                Search
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6">

          <h4>Configurations List</h4>

          <ul className="list-group">
            {configurations &&
              configurations.map( ( configuration, index ) => (
                <li
                  className = { "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick   = {  ( ) => this.setActiveConfiguration( configuration, index ) }
                  key       = {index}
                  >
                  {configuration.description}             {/* .(01118.03.3 Use Table's "search" column name: description) */}
                </li>
              ) ) }
          </ul>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = {this.removeAllConfigurations}
                  >
            Remove All
          </button>
        </div>

{/*     <style> label {{ display: 'inline', color: 'red' }} </style>  */}

        <div className="col-md-6">

          {currentConfiguration ? (

            <div>
        {/*    <div  style = {{ display: 'inline', color: 'red' }} > Hello </div>  */}
        {/*    <style> label {{ display: 'inline', color: 'red' }} </style>        */}

              <h4>Configuration</h4>

              <div><label><strong>id:             </strong></label>{" "}{currentConfiguration.id}          </div>  {/* .(01121.02.5) */}
              <div><label><strong>description:    </strong></label>{" "}{currentConfiguration.description} </div>  {/* .(01121.02.6) */}
              <div><label><strong>settings:       </strong></label>{" "}{currentConfiguration.settings}    </div>  {/* .(01121.02.7) */}
               { cEdit }   {/* .(01107.02.6) */}
               { cAdd  }   {/* .(01107.02.7) */}

            </div>

          ) : ( // else if ( ! currentConfiguration ) { ... }

            <div>
              <br />
              <p>Please click on a Configuration...</p>
            </div>
          ) }

        </div>
      </div>
    );
  }
}
