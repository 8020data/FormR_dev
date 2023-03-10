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
    const radioOptions = [
        { key: 'Option 1', value: 'roption1' },
        { key: 'Option 2', value: 'roption2' },
        { key: 'Option 3', value: 'roption3' }   
    ]
    const initialValues = {
        email: '',
        description: '',
        selectOption: '',
        radioOption: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        selectOption: Yup.string().required('Required'),
        radioOption: Yup.string().required('Required')
        
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
                    label='Select a topic-SELECT'
                    name='selectOption'
                    options={dropdownOptions} />
                <FormikControl
                    control='radio'
                    label='Radio topic-RADIO'
                    name='radioOption'
                    options={radioOptions} />
                    
                <button type='submit'>Submit</button>
            </Form>
        }
            
        </Formik >
    )
}

export default Formikcontainer