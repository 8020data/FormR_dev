  import   React, { Component }                     from 'react';
  import   ConfigurationDataService                 from '../services/configuration.service';
  import   AuthService                              from '../services/auth.service';
//import { Link }                                   from 'react-router-dom';
  import { MDBCard,  MDBCardHeader,  MDBCardBody  } from 'mdbreact';
//import { MDBTable, MDBTableHead,   MDBTableBody } from 'mdbreact';
  import { MDBDataTable, MDBDataTableV5           } from 'mdbreact';
  import { MDBTableEditable, MDBInput }             from 'mdbreact';
//import   DropDown                                 from './dropdown.js';
  import   mDropDowns                               from "./dropdown.js";

//  ---------------------------------------------------------------------------------------------------

  export default class ConfigurationsList extends Component {

//  ---------------------------------------------------------------------------------------------

    constructor( props ) {

      super( props );

      this.retrieveConfigurations     =  this.retrieveConfigurations.bind(    this );
      this.refreshList                =  this.refreshList.bind(               this );
      this.setActiveConfiguration     =  this.setActiveConfiguration.bind(    this );

      this.onChangeSearchdescription  =  this.onChangeSearchdescription.bind( this );
      this.searchBydescription        =  this.searchBydescription.bind(       this );      // .(01118.03.1 RAM Use CamelCase description)

      this.removeAllConfigurations    =  this.removeAllConfigurations.bind(   this );
      this.deleteConfiguration        =  this.deleteConfiguration.bind(       this );      // .(01204.04.1 RAM Added)

      this.fmtRow                     =  this.fmtRow.bind(                    this );      // .(01204.02.1 RAM Moved into class methods)
      this.onPickChange               =  this.onPickChange.bind(              this );      // .(01201.01.1 RAM Add Pick Checkboxes)

     const user                       =  AuthService.getCurrentUser();                     // .(01107.04.1)

      this.state                =
        {  configurations       : [ ]
        ,  currentConfiguration :  null
        ,  currentIndex         : -1
        ,  searchdescription    : ""
        ,  isUser               :  user ? true : false                                     // .(01107.04.2)
        ,  isModerator          :  user ? user.roles.includes( 'ROLE_MODERATOR' ) : false  // .(01107.04.3)
        ,  isAdmin              :  user ? user.roles.includes( 'ROLE_ADMIN'     ) : false  // .(01107.04.4)
        ,  currentItems         :  ","                                                     // .(01204.01.1 RAM Let's see of we can track them)
           }

//     var TheItems             = ","                                                     // .(01204.01.1)

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
                           this.setState( { currentConfiguration: null, currentIndex: -1 } );
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

    deleteConfiguration() {                                                           // .(01204.04.1 RAM Added)

      ConfigurationDataService.delete( this.state.currentConfiguration.id )           // .(01101.01.5 RAM Was: currentConfiguration.id)
        .then( response => { console.log( "deleteConfiguration[1]", response.data );
                             this.props.history.push( '/configurations' )
                             this.setState( { message: "The Configuration was deleted!" } );
                             } )
        .catch( e       => { console.log( e ); } );
         }

    removeAllConfigurations() {
      ConfigurationDataService.deleteAll()
        .then( response => { console.log( "deleted", response.data );
                             this.refreshList(); } )
        .catch( e       => { console.log( e ); } );
      }
//  ---------------------------------------------------------------------------------------------

    fmtRow( pRow, x ) {                                                      // .(01204.02.2 RAM Moved to here)
         var aRow = 'row' + (x = x ? x : '') + '-'                           // .(01203.07.1 RAM Use blank Row ID Suffix id not passed)
//      return  { pick         : <MDBInput label="&nbsp;"  type="checkbox" id={ 'row' + x + pRow.id } onChange={      onPickChange } />  // .(01203.07.2)
        return  { pick         : <MDBInput label="&nbsp;"  type="checkbox" id={ aRow      + pRow.id } onChange={ this.onPickChange } />  // .(01204.01.4)
                , id           : pRow.id
                , description  : pRow.description
                , settings     : pRow.settings
                , actions      : mDropDowns[0]( pRow.actions )
                  }                                                          // .(01130.01.2 RAM React doesn't like an array of objects)
      }

    onPickChange( e ) {
//          alert( "You picked: " + e.target.id + ", it now is: " + e.target.checked )
        var aItems = this.state.currentItems                                 // .(01204.01.2 Beg)
        var aItem = e.target.id.replace( /^.-/, '')
        if (e.target.checked) { aItems = aItems + aItem + ',' }
          else                { aItems = aItems.replace( ',' + aItem, '')
            }
            alert( "You picked: " + e.target.id + ", it now is: " + e.target.checked + "\n" +
                   "  state.currentItems now is: '" + aItems + "'" )
            this.setState( { currentItems: aItems } )                        // .(01204.1.02 End)
//          console.log( "Checkbox", e.target )
       }

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

//    -----------------------------------------------------------------------------------
/*
      var   cEdit = (                                                       // .(01118.01.3)
              <Link  to = { '/configurations/' + nId } className = "badge badge-warning" > Edit </Link>
              )
            cEdit = (isAdmin || isModerator) ? cEdit : null

       var  cAdd = (
              <Link  to = { '/configurations/add'    } className = "badge badge-warning" > Add  </Link>
              )
            cAdd  = (isAdmin               ) ? cAdd  : null                 // .(01107.02.5 End).(01108.01.1 RAM Opps, was ? cEdit)
                                                                            // .(01107.02.5 Beg RAM Added conditional buttons)
*/
//    -----------------------------------------------------------------------------------

        var mWdts   =   [  4, 8  ,  350         ,  50     , 70   ]
        var mData1  =  configurations || [ ]

//    ---------------------------------------------------------------------------

        var mCols2  =   [ "id", "description", "settings" ]
        var mRows2  =  mData1.map( pData => { return [ pData.id, pData.description, pData.settings ] } )  // .(01130.01.1 RAM An array of arrays)

//    ---------------------------------------------------------------------------

        var mCols3  =
           [ { label: "Pick",        field: 'pick',         width: mWdts[0],  sort: 'asc' }
           , { label: "#",           field: 'id',           width: mWdts[1],  sort: true, attributes: { 'aria-controls': 'DataTable', 'aria-label': 'Id'          } }
           , { label: "Description", field: 'description',  width: mWdts[2],  sort: true, attributes: { 'aria-controls': 'DataTable', 'aria-label': 'Description' } }
           , { label: "Settings",    field: 'settings',     width: mWdts[3],              attributes: { 'aria-controls': 'DataTable', 'aria-label': 'Settings'    } }
             ]
        var mRows3  =  mData1.map(  ( pData ) => {
//           return {  pick       : <MDBInput label=""       type="checkbox" id={ 'rowR' + pData.id } style={{ width: '5x' }}  //#.(01203.03.1)
             return {  pick       : <MDBInput label="&nbsp;" type="checkbox" id={ 'rowR' + pData.id } style={{ width: '5x' }}  // .(01203.03.1 RAM No checkbox if label is blank)
//                                            onChange={ this.onPickChange }
                                              />
                    ,  id         : pData.id
                    ,  description: pData.description
                    ,  settings   : pData.settings
                       } } )                                   // .(01130.01.1 RAM React doesn't like an array of objects)

//    ---------------------------------------------------------------------------
/*
        var mCols4  = [ "pick", "id", "description", "settings", "actions" ]

        var mRows4  =  mData1.map(  ( pData ) => {
             return {  pick       : <MDBInput label="" type="checkbox" id={ 'row' + pData.id } size="sm"
                                              onChange={ this.onPickChange } />
                    ,  id         : pData.id
                    ,  description: pData.description
                    ,  settings   : pData.settings
                    ,  actions    : null
                       } } )                                   // .(01130.01.1 RAM React doesn't like an array of objects)
*/
//    ---------------------------------------------------------------------------

        var nTotWdt =  mWdts.reduce( ( a, b ) => { return a + b }, 0 )

//    ---------------------------------------------------------------------------

//  const [ datatable, setDatatable ] = React.useState(     //#.(01130.05.1 RAM Put {datatable} into {state}.  Use {setDatatable()} to update it
    const   datatable                 =                     // .(01130.05.1 RAM React Hook can only be used in a function, not a class)

          { columns :  mCols3
          , rows    :  mRows3

            }
//        );  // eop [datatable, setDatatable] = React.useState( { columns: [ ... ], rows: [ ... ] } )  //#.(01130.05.1)

//    -----------------------------------------------------------------------------------

//     var cCkbx = "<br>"       + ( <MDBInput label="&nbsp;"  type="checkbox" id={ 'row0' } onChange={      onPickChange } /> )    // .(01203.04.1 Just display raw excaped HTML)
       var cCkbx = () => { return ( <MDBInput label="&nbsp;"  type="checkbox" id={ 'row0' } onChange={ this.onPickChange } /> ) }

   const pData =
     { columns:
       [ { label: cCkbx(),              field: 'pick',         width:  10  }
       , { label: "ID",                 field: 'id',           width:  10, sort: 'asc' }
       , { label: "Description",        field: 'description',  width: 150, sort: 'asc' }
       , { label: "Settings",           field: 'settings',     width: 200, sort: 'asc' }
       , { label:  mDropDowns[1]( '' ), field: 'actions',      width: 250  }
         ]
     , data: configurations
       };
/*
   function onPickChange( e ) {
        var aItems = this.TheItems   // = this.state.currentItems                                 // .(01204.01.2 Beg)
        if (e.target.checked) { aItems = aItems & ',' + e.ttarget.id }
          else                { aItems = aItems.replace( ',' + e.target.id, '') }
            alert( "You picked: " + e.target.id + ", it now is: " + e.target.checked + "\n" +
                   "  state.currentItems now is: '" + aItems.substr(1) + "'" )
            this.TheItems = aItems       // this.setState( { currentItems: aItems } )             // .(01204.1.02 End)
//          console.log( "Checkbox", e.target )
       }
*/
       pData.data[0].actions = ''              // .(01203.06.3 RAM Enable all actions)
       pData.data[1].actions = 'a,c'           // .(01203.06.2 RAM Only enable actions: a and c)
       pData.data[2].actions = 'b'             // .(01203.06.4 RAM Only enable action: b)
       pData.data[3].actions = 'x'             // .(01203.06.1 RAM Don't enable any actions)

       pData.rows = pData.data.map( this.fmtRow )                                        // .(01204.02.3 RAM Added this.)
/* function fmtRow( pRow, x ) {    x = x ? x : ''                                        // .(01203.07.1 RAM Use blank Row ID Suffix id not passed)
//        return  { pick         : <MDBInput label="&nbsp;"  type="checkbox" id={ 'row' + x + pRow.id } onChange={      onPickChange } />  // .(01203.07.2)
          return  { pick         : <MDBInput label="&nbsp;"  type="checkbox" id={ 'row' + x + pRow.id } onChange={ this.onPickChange } />  // .(01204.01.4)
                  , id           : pRow.id
                  , description  : pRow.description
                  , settings     : pRow.settings
                  , actions      : mDropDowns[0]( pRow.actions )
                    } }                                                                  // .(01130.01.2 RAM React doesn't like an array of objects)
*/
  var pData1      = { ...pData }                                                         // .(01203.07.3 RAM "Shallow Copy" object)
//    pData1.rows = pData1.data.map(            pRow    =>      fmtRow( pRow, "x" ) )    // .(01203.07.4 RAM  Create different Row IDs)
      pData1.rows = pData1.data.map(            pRow    => this.fmtRow( pRow, "x" ) )    // .(01204.02.4)
//    pData1.rows = pData1.data.map( function ( pRow ) { return fmtRow( pRow, "x" ) } )  // .(01203.07.3 RAM  Using => is cleaner when having to write a function to pass other arguments to a mapping function)

      delete        pData.data
      console.log( "pData",  pData  )
      console.log( "pData1", pData1 )                                                    // .(01203.07.3

//    -----------------------------------------------------------------------------------

          return  (

      <div className="list row">

        <div className="col-md-6">

{/*       <h4><b>Configuration Lists</b></h4>  */}

          <div>  {/* className="card-body" */}
{/*
            <MDBCard style={{ width: 600 }}>
              <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4">
                MDBDataTable Paginated
              </MDBCardHeader>
              <MDBCardBody>
                 <MDBDataTable hover small
                    entriesOptions={ [5, 20, 25] }
                    entries={ 5 }
                    pagesAmount={ 4 }
                    data={ datatable }
                    exportToCSV
                    />
              </MDBCardBody>
            </MDBCard>

            <MDBCard style={{ width: 600 }}>
              <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4">
                MDBDataTableV5 Paginated
              </MDBCardHeader>
              <MDBCardBody>
                 <MDBDataTableV5 hover small
                    entriesOptions={ [5, 20, 25] }
                    entries={ 5 }
                    pagesAmount={ 4 }
                    data={ datatable }
                    exportToCSV
                    />
*/}{/*                 proSelect    //#.(01130.06.1 RAM Its messad up with it, works fine without it. So much for the PRO version)  */}{/*}
              </MDBCardBody>
            </MDBCard>

            <MDBCard style={{ width: nTotWdt + 225 }}>
              <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4">
                Table Editable
              </MDBCardHeader>
              <MDBCardBody>
                <MDBTableEditable data   = { mRows2 } columns={ mCols2 } striped bordered small />
              </MDBCardBody>
            </MDBCard>

            <MDBCard style={{ width : 700 }} >
              <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4"  >
                MDBDataTable with Checkboxes
              </MDBCardHeader>
              <MDBDataTable      data    = { pData  } small btn barReverse          />
            </MDBCard>
*/}
            <MDBCard style={{ width : 700 }} >
              <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4"  >
{/*             MDBDataTableV5 with Checkboxes and Action Buttons */}
                Configurations Table
              </MDBCardHeader>
              <MDBDataTableV5    data    = { pData1 } small                         />
            </MDBCard>

          </div>

          <button
                  className  = "m-3 btn btn-sm btn-danger"
                  onClick    = { this.removeAllConfigurations }
                  >
            Remove All
          </button>
        </div>

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

      </div>
      );  // eor return ( ... JSX ... )
//    -----------------------------------------------------------------------------------
  } // eon render() { ... }
//  ---------------------------------------------------------------------------------------------
}  // eoc export default class ConfigurationsList extends Component { ... }
//  ---------------------------------------------------------------------------------------------------
