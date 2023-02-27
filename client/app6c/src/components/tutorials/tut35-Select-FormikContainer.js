import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function Formikcontainer() {
    const dropdownOptions = [
        { key: 'Select an option', value: '' },
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' }   
    ]
        const initialValues = {
        email: '',
        description: '',
        selectOption: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        selectOption: Yup.string().required('Required')
        
    })
    const onSubmit = values => console.log('Form data', values)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
        {
            formik => 
            < Form >
                <FormikControl
                    control='input'
                    type='email'
                    label='Email-INPUT'
                    name='email' />
                <FormikControl
                    control='textarea'
                    type='text'
                    label='Description-TEXTAREA'
                    name='description' />
                <FormikControl
                    control='select'
                    type='text'
                    label='Select a topic-SELECT'
                    name='selectOption'
                    options={dropdownOptions} />
                    
                <button type='submit'>Submit</button>
            </Form>
        }
            
        </Formik >
    )
}

export default Formikcontainer