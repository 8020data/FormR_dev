import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name: 'bt',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const savedValues = {
    name: 'bt',
    email: 'bt@123.com',
    channel: '1',
    comments: 'asd',
    address: '221b Baker Street',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}
const onSubmit = (values, onSubmitProps) => {
    console.log('Form values', values)
    console.log('onsubmit props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    channel: Yup.string().required('Required!')

})

const validateComments = value => {
    let error 
    if (!value) {
        error = 'Required'
    }
    return error
}

function Youtubeform() {
    const [formValues, setformValues] = useState(null)

    //    console.log('Visited Field', formik.touched)

    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {formik => {
                console.log('Formik props',formik)
                return (
                    <Form>
                        <div className='form-control' ><label htmlFor='name'>Name</label>
                            <Field type='text' id='name' name='name' />
                            <ErrorMessage name='name' component={TextError} /></div>

                        <div className='form-control' ><label htmlFor='email'>E-mail</label>
                            <Field type='email' id='email' name='email' />
                            <ErrorMessage name='email'>
                                {
                                    (errorMsg) => <div className='error'>{errorMsg}</div>
                                }
                            </ErrorMessage>
                        </div>

                        <div className='form-control' ><label htmlFor='channel'>Channel</label>
                            <Field type='text' id='channel' name='channel'
                                placeholder='Youtube Channel name' />
                            <ErrorMessage name='channel' /> </div>

                        <div className='form-control' ><label htmlFor='comments'>Comments</label>
                        <Field as='textarea' type='text' id='comments' name='comments' validate={validateComments}/>
                        <ErrorMessage name='comments' component={TextError}/></div>

                        <div className='form-control' ><label htmlFor='address'>Address</label>
                            <FastField name='address'>
                                {
                                    (props) => {
                                        //                                console.log('Field render', props)
                                        const { field, form, meta } = props
                                        return (
                                            <div>
                                                <input type='text' id='address' {...field} />
                                                {meta.touched && meta.error ? <div> {meta.error} </div> : null}
                                            </div>
                                        )
                                    }
                                }
                            </FastField>

                            <ErrorMessage name='address' />
                        </div>

                        <div className='form-control' ><label htmlFor='facebook'>Facebook</label>
                            <Field type='text' id='facebook' name='social.facebook' />
                            <ErrorMessage name='facebook' /></div>

                        <div className='form-control' ><label htmlFor='twitter'>Twitter</label>
                            <Field type='text' id='twitter' name='social.twitter' />
                            <ErrorMessage name='twitter' /></div>

                        <div className='form-control' ><label htmlFor='primaryPh'>Primary Phone</label>
                            <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                            <ErrorMessage name='primaryPh' /></div>

                        <div className='form-control' ><label htmlFor='secondaryPh'>Secondary Phone</label>
                            <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                            <ErrorMessage name='secondaryPh' /></div>

                        <div className='form-control' ><label htmlFor='phNumbers'>List of Phone phNumbers</label>
                            <FieldArray name='phNumbers'>
                                {
                                    (fieldArrayProps) => {
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { phNumbers } = values
 //                                       console.log('form errors', form.errors)
                                        return (
                                            <div>
                                                {phNumbers.map((phNumber, index) => (
                                                    <div key={index}>
                                                        <Field name={`phNumbers[${index}]`} />
                                                        { index > 0 &&
                                                            <button type='button' onClick={() => remove(index)}> - </button>
                                                        }
                                                        <button type='button' onClick={() => push('')}> + </button>
                                                    </div>

                                                ))}
                                            </div>
                                        )

                                    }
                                }
                            </FieldArray>
                            <ErrorMessage name='primaryPh' /></div>

                        {/*
                        <button type='button' onClick={() => formik.validateField('comments')}>Validate comments</button>
                        <button type='button' onClick={() => formik.validateForm('')}>Validate all</button>
                        <button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit comments</button>
                        <button type='button' onClick={() => formik.setTouched({
                            name: true,
                            email: true,
                            channel: true,
                            comments: true                      
                        })}>Visit fields</button>
                        */}

                        <button type='button' onClick= {() => setformValues(savedValues)} >Load saved data</button>
                        <button type='reset'>Reset</button>
                        <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>

                    </Form>
                )
            }}

        </Formik>
    )
}

export default Youtubeform