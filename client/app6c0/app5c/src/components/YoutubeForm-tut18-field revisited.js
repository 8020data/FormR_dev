import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: ''
}

const onSubmit = values => {
    console.log('Form values', values)
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    channel: Yup.string().required('Required!')

})
function Youtubeform() {

    //    console.log('Visited Field', formik.touched)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div className='form-control' >
                    <label htmlFor='name'>Name</label>
                    <Field
                        type='text'
                        id='name'
                        name='name'
                    />
                    <ErrorMessage name='name' />
                </div>

                <div className='form-control' >
                    <label htmlFor='email'>E-mail</label>
                    <Field
                        type='email'
                        id='email'
                        name='email'
                    />
                    <ErrorMessage name='email' />
                </div>

                <div className='form-control' >
                    <label htmlFor='channel'>Channel</label>
                    <Field
                        type='text'
                        id='channel'
                        name='channel'
                        placeholder='Youtube Channel name'
                    />
                    <ErrorMessage name='channel' />
                </div>

                <div className='form-control' >
                    <label htmlFor='comments'>Comments</label>
                    <Field
                        as='textarea'
                        type='text'
                        id='comments'
                        name='comments'
                    />
                    <ErrorMessage name='comments' />
                </div>

                <div className='form-control' >
                    <label htmlFor='address'>Address</label>
                    <Field name='address'>
                        {
                            (props) => {
                                const {field, form, meta} = props
                                console.log('Render props', props)
                                return (
                                    <div>
                                        <input type='text' id='address' {...field} />
                                        {meta.touched && meta.error ? <div> {meta.error} </div> : null}
                                    </div>
                                )
                            }
                        }
                    </Field>

                    <ErrorMessage name='address' />
                </div>

                <button type='submit'>Submit</button>

            </Form>
        </Formik>
    )
}

export default Youtubeform