   import   React            from 'react';
   import { MDBDataTableV5 } from 'mdbreact';
// import { MDBInput       } from 'mdbreact';
// import   mDropDowns       from './dropdown.js';
   import   Result           from './result';

// export default function WithMultipleCheckboxes(       )              //#.(01208.08.1)
   export default function WithMultipleCheckboxes( props ) {            // .(01208.08.1 RAM Added props )
// export default function WithMultipleCheckboxes( pData )              //#.(01208.08.1 RAM Added pRows )

  const [ datatable, setDatatable ] = React.useState(   // columns: [ ... ], rows: [ ... ]

          props.pDataTable

    ); // eoo [ datatable, setDatatable ] = React.useState( { columns: [ ... ], rows: [ ... ] } )
//    -----------------------------------------------------------------------------------

     const   shoCheckBoxes = props.onCheckBox                             // .(01211.06.1 RAM ) 
     const   onClickRow    = props.onClickRow                             // .(01211.06.1 RAM ) 


     const [ checkbox1, setCheckbox1 ] = React.useState( '' );
     const   showLogs2  = ( e ) => { setCheckbox1( e ); };

     console.log( "datatable", datatable )

//  -----------------------------------------------------------------------------------------------------

  return (
    < >
      <MDBDataTableV5
        hover
        entriesOptions          = { [ 5, 20, 25 ] }
        entries                 = { 5 }
        pagesAmount             = { 4 }
        data                    = { datatable }
        checkbox
        headCheckboxID          =  'id42'                               // .(01206.03 id42xx must be unique)
        bodyCheckboxID          =  'checkboxes42-'                      // .(01206.04 checkboxes42 must be unique)
        
        getValueCheckBox        = { shoCheckBoxes }  
//      getValueCheckboxes      = { ( e ) => { showLogs2( e ); } }
        getValueAllCheckBoxes   = { ( e ) => { showLogs2( e ); } }

        multipleCheckboxes
        proCheckboxes
        filledCheckboxes
        proSelect
        />

       <Result> { checkbox1 && <p> { JSON.stringify(
           delete checkbox1.checkbox &&
                  checkbox1.map( pRow => pRow.checkbox.props.id + ": " + pRow.description )
                          ) } </p> }
       </Result>
    < />

  ); // eoj return ( ... )

}  // eof export default function WithMultipleCheckboxes( ) { // datatable = { columns, rows }, checkbox1, setCheckbox1, showLogs2, return ( ) }
