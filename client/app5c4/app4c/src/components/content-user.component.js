
  import   React, { Component }                      from 'react';
  import { MDBCard,  MDBCardHeader, MDBCardBody    } from 'mdbreact';
  import { MDBTable, MDBTableBody , MDBTableHead   } from 'mdbreact';
  import { MDBTableEditable       , MDBInput       } from 'mdbreact';
  import { MDBDataTable           , MDBDataTableV5 } from 'mdbreact';
  import   mDropDowns                                from './dropdown.js';
  import   MDBDataTableV5_withAllCheckbox            from './MDBDataTableV5_w-Checkboxs_Example.js'
  import   MDBDataTableV5_withAllCheckbox2           from './MDBDataTableV5_w-Checkboxes-&-Actions.js'

  class TableSamples extends Component {

//   constructor( props ) {
//    super( props );
//    }

   render() {

   const data_json =
     { columns : [ "Person Name", "Age", "Company Name", "Country", "City" ]
     , rows    :
        [ [ "Aurelia Vega",    30, "Deepends",  "Spain",          "Madrid"            ]
        , [ "Guerra Cortez",   45, "Insectus",  "USA",            "San Francisco"     ]
        , [ "Guadalupe House", 26, "Isotronic", "Germany",        "Frankfurt am Main" ]
        , [ "Elisa Gallagher", 31, "Portica",   "United Kingdom", "London"            ]
          ] };

   const data_html2 =
     { columns :
//       { data_json.columns.map( ( aCol, index ) => { return { label: aCol, field: 'fld' + index + 1 } ) } }
       [ { label: "Person Name"   , field: 'fld1' }
       , { label: "Age"           , field: 'fld2' }
       , { label: "Company Name"  , field: 'fld3' }
       , { label: "Country"       , field: 'fld4' }
       , { label: "City"          , field: 'fld5' }
         ]
     , rows : data_json.rows.map( ( mRow ) =>
       ( {  fld1:  mRow[0],  fld2:  mRow[1],  fld3:  mRow[2],  fld4:  mRow[3],  fld5:  mRow[4] } )   //    Workie
           )
       }

   const data_checkboxes = 
     { columns:
       [ { label: "Check",       field: 'check',    width: 300, sort: 'asc' }
       , { label: "Lorem",       field: 'lorem',    width: 100, sort: 'asc' }
       , { label: "Ipusm",       field: 'ipsum',    width: 100, sort: 'asc' }
       , { label: "Dolor",       field: 'dolor',    width: 100, sort: 'asc' }
         ]
     , rows:
       [ { check: <MDBInput label="Check 1" type="checkbox" id="checkbox1" />, lorem: "Cell1", ipsum: "Cell2", dolor: "Cell3" }
       , { check: <MDBInput label="Check 2" type="checkbox" id="checkbox2" />, lorem: "Cell1", ipsum: "Cell2", dolor: "Cell3" }
       , { check: <MDBInput label="Check 3" type="checkbox" id="checkbox3" />, lorem: "Cell1", ipsum: "Cell2", dolor: "Cell3" }
       , { check: <MDBInput label="Check 4" type="checkbox" id="checkbox4" />, lorem: "Cell1", ipsum: "Cell2", dolor: "Cell3" }
       , { check: <MDBInput label="Check 5" type="checkbox" id="checkbox4" />, lorem: "Cell1", ipsum: "Cell2", dolor: "Cell3" }
       , { check: <MDBInput label="Check 6" type="checkbox" id="checkbox4" />, lorem: "Cell1", ipsum: "Cell2", dolor: "Cell3" }
         ]
       };
       console.log( "data_checkboxes", data_checkboxes )

//     var cCkbx = "<br>"       + ( <MDBInput label="&nbsp;"  type="checkbox" id={ 'row0' } onChange={ onPickChange } /> )  // .(01203.04.1 Just display raw excaped HTML)
       var cCkbx = () => { return ( <MDBInput label="&nbsp;"  type="checkbox" id={ 'row0' } onChange={ onPickChange } /> ) }

   const pData =
     { columns:
       [ { label:  cCkbx()            , field: 'pick',     width:  10, sort: 'disabled' }      // .(01204.07.1 RAM)
       , { label: "ID"                , field: 'id',       width:  10, sort: 'asc'      }
       , { label: "Name"              , field: 'name',     width: 100, sort: 'asc'      }
       , { label: "Description"       , field: 'desc',     width: 130, sort: 'asc'      }
       , { label:  mDropDowns[1]( '' ), field: 'actions',  width: 250, sort: 'disabled' }      // .(01204.07.2)
         ]
     , data1:
       [ { pick: <MDBInput label="a"        type="checkbox" id="checkbox1" />, id: 1, name: "Robin1",  desc: "A nice fellow", actions: mDropDowns[0]( ''      ) }
       , { pick: <MDBInput label="a"        type="checkbox" id="checkbox2" />, id: 2, name: "Bruce",   desc: "The Man",       actions: mDropDowns[0]( 'a,b,c' ) }
       , { pick: <MDBInput label="a"        type="checkbox" id="checkbox3" />, id: 3, name: "Nancy",   desc: "The Wife",      actions: mDropDowns[0]( 'a'     ) }
       , { pick: <MDBInput label="a"        type="checkbox" id="checkbox4" />, id: 4, name: "Rebecca", desc: "The Daughter",  actions: mDropDowns[0]( 'a,c'   ) }
       , { pick: <MDBInput label="a"        type="checkbox" id="checkbox5" />, id: 5, name: "Suzee",   desc: "The Alias",     actions: ""                  }
         ]
     , data:
       [ { id: 1, name: "Robin1",  desc: "A nice fellow", actions: ''      }
       , { id: 2, name: "Bruce",   desc: "The Man",       actions: 'a,b,c' }
       , { id: 3, name: "Nancy",   desc: "The Wife",      actions: 'a'     }
       , { id: 4, name: "Rebecca", desc: "The Daughter",  actions: 'a,c'   }
       , { id: 5, name: "Suzee",   desc: "The Alias",     actions: 'c'     }
         ]
       };

   function onPickChange( e ) { alert( "You picked: " + e.target.id + ", now is: " + e.target.checked )
      console.log( "Checkbox", e.target )
      }

       pData.rows = pData.data.map( fmtRow )
   function fmtRow( pRow ) {
         return {  pick       : <MDBInput label="&nbsp;"  type="checkbox" id={ 'row' + pRow.id } onChange={      onPickChange } />
                ,  id         : pRow.id
                ,  desc       : pRow.desc
                ,  name       : pRow.name
                ,  actions    : mDropDowns[0]( pRow.actions )
                   } }                                    // .(01130.01.1 RAM React doesn't like an array of objects)
      delete       pData.data
      console.log("pData", pData )

  return (
    <div>

      <MDBCard style={{ width : 600 }} >
        <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4">
          MDBTable
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTable                                         striped bordered  >
            <MDBTableHead   columns = { data_html2.columns      } />
            <MDBTableBody   rows    = { data_html2.rows         } />
          </MDBTable>
        </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width : 700 }} >
        <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4"  >
          MDBTableEditable
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTableEditable columns = { data_json.columns }
                            data    = { data_json.rows    } striped bordered  />
        </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width : 600 }} >
        <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4"  >
          MDBDataTable with Checkboxes
        </MDBCardHeader>
         <MDBDataTable      data    = { pData             } btn small barReverse />
      </MDBCard>

      <MDBCard style={{ width : 600 }} >
        <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4"  >
          MDBDataTableV5 with Checkboxes and Action Buttons, 1st Try
        </MDBCardHeader>
         <MDBDataTableV5    data    = { pData              }  small           />
      </MDBCard>
  
      <MDBCard style={{ width : 970 }} >
        <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4"  >
          MDBDataTableV5 with Checkboxes
        </MDBCardHeader>
        <MDBDataTableV5_withAllCheckbox />
      </MDBCard>
 
      <MDBCard style={{ width : 1070 }} >
        <MDBCardHeader tag="h3" className="text-center font-weight-bold py-4"  >
          MDBDataTableV5 with Checkboxes and Action Buttons, 2nd try
        </MDBCardHeader>
        <MDBDataTableV5_withAllCheckbox2 />
      </MDBCard>

    </div>
    ); // eoj return ( ... )
  }; // eom render { ... }

};  // eoc TableSamples
    // eof export default function WithMultipleCheckboxes() { // datatable = { columns, rows }, checkbox1, setCheckbox1, showLogs2, return ( ) }

export default TableSamples;