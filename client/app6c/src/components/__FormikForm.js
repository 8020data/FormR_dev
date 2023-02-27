import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function __FormikForm() {
    const dropdownOptions = [
        { key: 'Select an option', value: '' },
        { key: 'Option1', value: 'option1' },
        { key: 'Option2', value: 'option2' },
        { key: 'Option3', value: 'option3' }   
    ]
    const radioOptions = [
        { key: 'Option1', value: 'roption1' },
        { key: 'Option2', value: 'roption2' },
        { key: 'Option3', value: 'roption3' }   
    ]
    const checkboxOptions = [
        { key: 'Option1', value: 'coption1' },
        { key: 'Option2', value: 'coption2' },
        { key: 'Option3', value: 'coption3' }   
    ]
    const initialValues = {
        id: "",
        title: "",
        description: "",
        published: "",
        createdAt: "",
        updatedAt: "",
        LastUpdated: "",

    }
    const validationSchema = Yup.object({
    
        id: Yup.string().required('Required'),
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        published: Yup.string().required('Required'),
        createdAt: Yup.string().required('Required'),
        updatedAt: Yup.string().required('Required'),
        LastUpdated: Yup.string().required('Required'),
    })
    const onSubmit = values => {
        console.log('Form data', values)
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
        {
            formik => 
            < Form >
<tutorialControl control='input' type='text' label='id' name='id' />                    
                <button type='submit' disabled={!formik.isValid}>Submit</button>
            </Form>
        }
            
        </Formik >
    )
}

export default __FormikForm