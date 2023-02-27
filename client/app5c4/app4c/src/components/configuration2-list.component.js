  import   React, { Component }                     from 'react';
  import   ConfigurationDataService                 from '../services/configuration.service';
  import   AuthService                              from '../services/auth.service';
//import { Link }                                   from 'react-router-dom';
  import { MDBCard,  MDBCardHeader,  MDBCardBody  } from 'mdbreact';
//import { MDBTable, MDBTableHead,   MDBTableBody } from 'mdbreact';
//import { MDBDataTable, MDBDataTableV5           } from 'mdbreact';
//import { MDBTableEditable, MDBInput }             from 'mdbreact';
//import   mDropDowns                               from './dropdown.js';
  import   mDropDowns                               from './configuration.dropdown.js';
  import   ConfigurationTable                       from './configuration-table.component.js';

//  ---------------------------------------------------------------------------------------------------

  export default class ConfigurationsList extends Component {

//  ---------------------------------------------------------------------------------------------

    constructor( props ) {

      super( props );

      this.retrieveConfigurations     =  this.retrieveConfigurations.bind(    this );
      this.refreshList                =  this.refreshList.bind(               this );
//    this.setActiveConfiguration     =  this.setActiveConfiguration.bind(    this );      //#.(01111.03.1)

      this.onChangeSearchdescription  =  this.onChangeSearchdescription.bind( this );
      this.searchBydescription        =  this.searchBydescription.bind(       this );      // .(01118.03.1 RAM Use CamelCase description)

      this.removeAllConfigurations    =  this.removeAllConfigurations.bind(   this );
      this.deleteConfiguration        =  this.deleteConfiguration.bind(       this );      // .(01204.04.1 RAM Added)

//    this.fmtRow                     =  this.fmtRow.bind(                    this );      // .(01204.02.1 RAM Moved into class methods)
//    this.onClickRow                 =  this.onClickRow.bind(                this );      // .(01211.08.1 RAM Added\)

     const user                       =  AuthService.getCurrentUser();                     // .(01107.04.1)

      this.state                =
        {  configurations       : [ ]
//      ,  currentConfiguration :  null                                                    //#.(01111.03.2)
//      ,  currentIndex         : -1                                                       //#.(01111.03.3)
        ,  searchdescription    : ""
        ,  isUser               :  user ? true : false                                     // .(01107.04.2)
        ,  isModerator          :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false  // .(01107.04.3)
        ,  isAdmin              :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false  // .(01107.04.4)
        ,  isApprover           :  user ? user.roles.includes( 'ROLE_APPROVER'  ) : false  // .(01207.03.1)
        ,  currentItems         :  ","                                                     // .(01204.01.1 RAM Let's see of we can track them)
        ,  deleteConfiguration2 :  this.deleteConfiguration
           }

      this.state.userRoles      = ( this.state.isAdmin     ? 'admin,' : '' )
                                + ( this.state.isApprover  ? 'apprv,' : '' )
                                + ( this.state.isModerator ? 'mod,'   : '' )
                                + ( this.state.isUser      ? 'user,'  : '' )

      } // eom constructor
//  ---------------------------------------------------------------------------------------------

    componentDidMount() {
                             this.retrieveConfigurations();
      }
//  ---------------------------------------------------------------------------------------------

    retrieveConfigurations() {
      ConfigurationDataService.getAll()
        .then( response => { console.log( "retrieved", response.data );
                             this.setState( { configurations: response.data } ); } )
        .catch( e       => {
                             console.log( e ); });
        }
//  ---------------------------------------------------------------------------------------------

    refreshList() {
                           this.retrieveConfigurations();
//                         this.setState( { currentConfiguration: null, currentIndex: -1 } );
      }
//  ---------------------------------------------------------------------------------------------

    setActiveConfiguration( configuration, index ) {
                            this.setState( { currentConfiguration: configuration, currentIndex: index } );
      }
//  ---------------------------------------------------------------------------------------------

    onChangeSearchdescription(e) {
                       alert( "Why does this work?")
                       const searchdescription = e.target.value;
                             this.setState( { searchdescription: searchdescription } );
        }
//  ---------------------------------------------------------------------------------------------

    searchBydescription() {                                                  // .(01118.03.2 RAM Change name of search method)
      ConfigurationDataService.findBydescription( this.state.searchdescription )
        .then( response => { console.log( "searching found",  response.data );
                             this.setState( { configurations: response.data });
          } )
        .catch(e => {        console.log( e ); } );
      }
//  ---------------------------------------------------------------------------------------------

    deleteConfiguration( nID ) {                                                      // .(01204.04.1 RAM Added).(01210.07.1 RAM Added nID)
//    nID = nID ? nID : this.state.currentConfiguration.id                            //#.(01210.07.2 RAM this,state is now present, but currentConfiguration is not being updated)
      nID = nID ? nID : 0                                                             // .(01211.07.2)
//    getValueCheckboxes, checkbox1, showLogs2
//    ConfigurationDataService.delete( this.state.currentConfiguration.id )           //#.(01101.01.5 RAM Was: currentConfiguration.id).(01210.07.3)
      console.log( "deleteConfiguration[1]", nID );

/*    ConfigurationDataService.delete( nID )                                          // .(01210.07.4)
        .then( response => { console.log( "deleteConfiguration[2]", response.data );
                             this.props.history.push( '/configurations' )
                             this.setState( { message: "The Configuration was deleted!" } );
                             } )
        .catch( e       => { console.log( "deleteConfiguration[3]", e ); } );
 */
         }
//  ---------------------------------------------------------------------------------------------

    removeAllConfigurations() {
      ConfigurationDataService.deleteAll()
        .then( response => { console.log( "deleted", response.data );
                             this.refreshList(); } )
        .catch( e       => { console.log( e ); } );
      }
//  ---------------------------------------------------------------------------------------------

/*  fmtRow( pRow, x ) {                                                // .(01204.02.2 RAM Moved to here)
//      var aRow = 'row' + (x = x ? x : '') + '-'                      // .(01203.07.1 RAM Use blank Row ID Suffix id not passed)
  return  { id           : pRow.id                                     //#.(01203.07.2 RAM was aRow + pRow.id)
          , description  : pRow.description
          , settings     : pRow.settings
          , actions      : mDropDowns[0]( pRow.actions )
            }                                                          // .(01130.01.2 RAM React doesn't like an array of objects)
      } // eof fmtRow( pRow, x ) { ... }
//  ---------------------------------------------------------------------------------------------
*/
//  onClickRow( id ) {
//     alert( "onClickRow: " + id )
//     }
//  ---------------------------------------------------------------------------------------------

    render() {

//  const  { searchdescription, configurations, currentConfiguration, currentIndex } = this.state;
//  const  {                    configurations, currentConfiguration               } = this.state;
    const  { searchdescription, configurations                                     } = this.state;

//    -----------------------------------------------------------------------------------

    if (configurations.length === 0) { return null }                        // .(01130.03.1 RAM Don't render the first time through)
                                                                            // .(01107.02.5 Beg RAM Added conditional buttons)
//  const   nId    = currentRole          ? currentRole.id          : 0     // .(01116.01.1 Guard against null id because the page is rendered before api data is received)
//  const   nId    = currentConfiguration ? currentConfiguration.id : 0     // .(01121.02.4 RAM S.B. RecordSet name as defined above)
//  const { isAdmin, isModerator } = this.state;
    const { userRoles } = this.state;                                       // .(01207.03.2)
//  const   onClickRow = this.onClickRow;                                   // .(01207.03.2)

//    -----------------------------------------------------------------------------------

   var mRoleActions   = // Table URL Link    ID   Role      Actions          Codes
//                         ---------------   --   -----     ----------       -------
                      [ [ '/configurations',  0, 'admin' , 'all,delete'   , 'v,e,a,d' ]
                      , [ '/configurations',  0, 'all'   , 'view'         , 'v'       ]
                      , [ '/configurations',  0, 'mod'   , 'edit'         ,   'e'     ]

//                    , [ '/configurations',  3, 'all'   , 'view'         , 'v'       ]
                      , [ '/configurations',  3, 'user'  , 'view,edit'    , 'v,e'     ]
                      , [ '/configurations',  3, 'mod'   , 'edit,apprv'   ,   'e,d'   ]
                      , [ '/configurations',  3, 'apprv' , 'apprv,delete' ,   'e,a'   ]
//                    , [ '/configurations',  3, 'admin' , 'all,delete'   , 'v,e,a,d' ]

                      , [ '/configurations', 14, 'admin' , 'all'        ]
                        ]

  function getActions4Roles( nID, aRoles, f ) {
       var aActions  = ''; f = ( f === 4 ) ? 4 : 3;
           aActions += mRoleActions.filter( mAction => mAction[1] === 0   && mAction[2] === 'all'       ).map( mAction => mAction[f] + ',' )
           aActions += mRoleActions.filter( mAction => mAction[1] === 0   && aRoles.match( mAction[2] ) ).map( mAction => mAction[f] + ',' )
           aActions += mRoleActions.filter( mAction => mAction[1] === nID && aRoles.match( mAction[2] ) ).map( mAction => mAction[f] + ',' )
           aActions =  aActions.replace( /all,/g, ( f === 4 ) ? 'v,e,a,d,' : 'view,edit,apprv,delete,' ).replace( /,+/g, ',' )
       var mActs = []; aActions.split( ',' ).forEach( aAction => mActs[ aAction ] = 0 ); aActions = Object.keys( mActs ).join( ',' )
           return  aActions // 'a,b,c,d'
           }
//  -----------------------------------------------------------------------------------------------------

   const { deleteConfiguration2 } = this.state;                                       // .(01207.03.2)

   var  deleteConfiguration1 = function( e ) {  // .(01211.06.x)
        alert( "Deleting ..." )
        deleteConfiguration2()
        }
   var  onClickRow  = function( id ) {          // .(01211.06.x)
        alert( "onClickRow: " + id   )          // .(01214.03.1 RAM id is set to id of last row)
        }



//  -----------------------------------------------------------------------------------------------------

   var  mTableActions =
         [ [ "Add New"          , '/addconfiguration'           , 'n' ]
         , [ "Approve Selected" , '/configurations'             , 'a' ]
         , [ "Delete Selected"  , '/configurations/deleteall_'  , 'd' ]
              ]

   var  mRowActions   =
         [ [ "View2"            , '/configurations/view/:id'    , 'v' ]                                                 // .(01208.05.1 RAM add :id).(01204.07.2).
         , [ "Edit2"            , '/configurations/edit/:id'    , 'e' ]                                                 // .(01208.05.2)
         , [ "Approve2"         , '/configurations/approve/:id' , 'a', false ]                                         // .(01208.05.3)
//       , [ "Delete2"          , '#'                           , 'd', true, this.deleteConfiguration  ]                // .(01208.05.4)
         , [ "Delete2"          , '/configurations2'            , 'd', true,      deleteConfiguration1 ]                // .(01211.03.1)
              ]

//    ---------------------------------------------------------

   const pData =

          { name:    "Configurations"

          , columns:
            [ { label: "ID",           field: 'id',           width:  10, sort: 'asc' }
            , { label: "Description",  field: 'description',  width: 150, sort: 'asc' }
            , { label: "Settings",     field: 'settings',     width: 200, sort: 'asc' }
              ]

         , rows:      configurations
         , actions:
              { table : mTableActions                                                                                 // .(01209.01.11)
              , row   : mRowActions
                }
             };
//    ---------------------------------------------------------

//       pData.rows.forEach( pRow => pRow.actions =  getActions4Roles( pRow.ID, userRoles, 3 ) )

     var aRow, aRCds

     var pDataTable =

           { name:       pData.name                                                                                   // .(01209.01.x RAM Was "Configurations")
           , columns  :  fmtCols( pData.columns  ) // eoa columns                                                     // .(01209.01,x)
           , rows     :  fmtRows( pData.rows, 'x' ) // eoa rows                                                       // .(01209.01,x)

             } // eoo pData
//    ---------------------------------------------------------

    function fmtCols( mCols ) {                                                                                       // .(01209.01.x)
         var aTCds = ''; pData.actions.table.forEach( mAction => aTCds += mAction[2] + ',' )                          // .(01209.01.x)
             mCols.push ( { label:  mDropDowns[2]( pData.actions.table, aTCds )
                          , field: 'actions'
                          , width:  250
                          , sort : 'disabled' })                                                                      // .(01209.01.x).(01208.02.2)
      return mCols
             } // eof fmtCols( mRows, x ) { ... }                                                                     // .(01209.01.x)
//  -------------------------------------------------------------

    function fmtRows(  mRows, x ) {                                                                                   // .(01209.01.x)
             aRow     = 'row' + (x = x ? x : '') + '-'                                                                // .(01203.07.1 RAM Use blank Row ID Suffix id not passed)
             aRCds = ''; pData.actions.row.forEach( mAction => aRCds += mAction[2] + ',' )                                 // .(01209.01.x)
 //   return pRows.map(  pRow  => {  // fmtRow( pRow )   ...                                                          // .(01209.01.x)
             mRows    =  mRows.map( fmtRow )                                                                          // .(01209.01.x).(01209.03.4 RAM assign variable)
      return mRows                                                                                                    // .(01209.03.4)
             } // eof fmtRows( mRows, x ) { ... }
//  -------------------------------------------------------------

    function fmtRow( pRow ) {
         var mActions =  pData.actions.row.map( aAction => aAction )                                                  // .(01210.05.1 RAM How do I make mActions a "shallow" copy of pData.actions.row)
             mActions.forEach( mAction => {
//           if (typeof( mAction[1]) == 'function') {
//               mAction[1] =  function( nId ) { mAction( nId ) }
//           } else {
//               mAction[1] =  String( mAction[1] )                                                                   // .(01209.01.x).(01210.05.3 RAM A little defensive programming)
                 mAction[1] =  mAction[1].replace( /:id/,            pRow.id )                                        // .(01209.01.x).(01210.05.2 RAM Gotta do both)
                 mAction[1] =  mAction[1].replace( /\/[0-9]+/, '/' + pRow.id )
//               }
                 } )                                      // .(01210.05.2 RAM I give up just replace the id number)
             pRow.actions    =  mDropDowns[3]( mActions, aRCds )                                                      // .(01209.01.x)
             pRow.key        =  aRow + pRow.id                                                                        // .(01209.01.x)
//           pRow.clickEvent =  this.onClickRow                                                                       // .(01211.08.x)
//           pRow.clickEvent =  function( e ) { onClickRow( pRow.Id    ) }                                            // .(01211.08.x)
             pRow.clickEvent =  function( e ) { onClickRow( mActions[1][1] ) }                                        // .(01211.08.x).(01214.03.2 RAM id is set to id of last row)

             return pRow                                                                                              // .(01209.01.x)
             } // eof fmtRow( pRow ) { ... }
//  -------------------------------------------------------------

      const onCheckBox = function( e  ) { alert( "onCheckBox[1] hello" ) }       // .(01211.06.1)
//    const onClickRow = function( id ) { alert( "onClickRow: " + id   ) }       // .(01211.06.x)

      console.log( "pDataTable",  pDataTable  )
  //  console.log( "pData1", pData1 )                                           // .(01203.07.3

//  -----------------------------------------------------------------------------------------------------

  return (

      <div     className  = "list row">

        <div   className  = "col-md-6">

          <div>  {/* className="card-body" */}
            <MDBCard style={{ width : 700 }} >
              <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4"  >
                Configurations2 Table
              </MDBCardHeader>
              <ConfigurationTable pDataTable={ pDataTable } onCheckBox={ onCheckBox } />
            </MDBCard>

          </div>

          <button
               className  = "m-3 btn btn-sm btn-danger"
               onClick    = { this.removeAllConfigurations }
               >
            Remove All
          </button>
        </div>

        <div   className  = "col-md-8">

          <div className  = "input-group mb-3">

            <input
              type        = "text"
               className  = "form-control"
               placeholder= "Search by description"
               value      = { searchdescription }
               onChange   = { this.onChangeSearchdescription }
               />
            <div className= "input-group-append">
              <button
               className  = "btn btn-outline-secondary"
               type       = "button"
               onClick    = { this.searchBydescription }
               >
               Search
              </button>
            </div>

          </div>
        </div>

      </div>
      );  // eor return ( ... JSX ... )
//    -----------------------------------------------------------------------------------
  } // eon render() { ... }
//  ---------------------------------------------------------------------------------------------
}  // eoc export default class ConfigurationsList extends Component { ... }
//  ---------------------------------------------------------------------------------------------------
