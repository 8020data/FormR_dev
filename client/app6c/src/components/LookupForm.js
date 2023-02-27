
  import   React, { useState, useEffect } from 'react'  // .(01215.06.1 RAM Added useEffect, useParams)
  import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
  import { Formik, Form       } from 'formik'
  import * as Yup               from 'yup'
  import   FormikControl        from './FormikControl'
  import   LookupDataService    from '../services/lookup.service';

  const OverlaySpinner = (
      <div>Loading...</div>
      )

function LookupForm( properties ) {

    let aPath   = useLocation().pathname + '/';
    let aID     = aPath.replace( /.+?\//, '' ).replace( /[^0-9]/g, '' );   // .(01216.03.1 RAM Was: /\/$/)
    let aAction = aPath.match( /view|edit|add|delete|approve/ )
    if (aAction != 'add' && aID == '') { if (aAction != null) { alert( `Please enter an ID to ${aAction}.` ) } }
        aAction = ( aID == '' ) ?  'add' : ( aAction ? aAction[0] : 'edit' )
        aID     = ( aID == '' ) ?  '0'   :   aID

  const [ data, setData ]  = useState();

    useEffect( () => {

//      fetch(              `http://localhost:50321/apl/lookups/${ properties.Id }` )
/*      fetch(              `http://localhost:50321/api/lookups/15` )
          .then( response =>   response.json(  )   )
          .then( result   => { setData( result ) } )
          .catch(       e => { alert( "API failed" ); console.log( "API Error:" , e ) } )
*/
        LookupDataService.get( aID )

          .then( response => { console.log( "LookupDataService.get[1]", response.data )
//                             alert( `Setting formValues for ${aAction} to savedValues: \n  ` + JSON.stringify( response.data ) )
                               setData( response.data || initialValues )
                               } )
          .catch(       e => { alert( "API failed" ); console.log( "API Error:" , e ) } )

        }, [ ] );

  const validationSchema   = Yup.object(
      { type:  Yup.string( ).required( 'Required' )
      , value: Yup.string( ).required( 'Required' )
        } )

    const onSubmit = values => {
        console.log(`${aAction}ing Form data`, values)

        if (aAction == 'add') { var DataService = LookupDataService.create }
        if (aAction == 'edit') { var DataService = LookupDataService.update }

        if (aAction === "edit") {
            DataService(values.id, values)
                .then((response) => {
                    aID = aAction == "edit" ? values.id : response.data.id;
                    console.log("Data Saved for id = " + aID);
                    alert("Data Saved for id = " + aID);
                })
                .catch((e) => {
                    console.log("Error", e);
                });
        } else {
      

            DataService(values)
                .then((response) => {
                    aID = (aAction == 'edit') ? values.id : response.data.id
                    console.log("Data Saved for id = " + aID)
                    alert("Data Saved for id = " + aID)
                })
                .catch(e => { console.log("Error", e) })
        }
    }
    

/*  const onSubmit = values => {     setTimeout( ( ) => { alert( JSON.stringify( values, null, 2 ) ); }, 3000 )
                                     } }
*/
  const initialValues =
      { id      :  null
      , type    : 'CCC'
      , value   : '98'
        }

    return (

        <div>

            {
                ( data ) ?

                    <Formik

                        initialValues    = { data }

                        validationSchema = { validationSchema }

                        onSubmit         = { onSubmit }

                        enableReinitialize
                        >

                        { props => (

                            <Form>

                                <FormikControl
                                    control='input'
                                    type='text'
                                    label='Type'
                                    name='type' />

                                <FormikControl
                                    control='input'
                                    type='text'
                                    label='Value'
                                    name='value' />

{/*                             <button type='button' onClick= { () => {
                                                          setformValues(savedValues) } } >
                                    Load saved data</button> */}

                                <button type='submit' disabled={ false }>{ aAction} </button> {/* .(01217.01.3 RAM Was: !Formik.isValid).(01217.02.1 RAM Use Action Varialbe) */}

                            </Form>
                            ) }

                    </Formik>

                    :

                    <div>{ "Loading ..." }</div>
                }
        </div >
        )  // eof return

    }  // eof LookupForm

export default LookupForm

