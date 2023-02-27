import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function ConfigurationForm() {
    const initialValues = {
        id: null,
        description: '',
        settings: '',
    }    
    const validationSchema = Yup.object({
        description: Yup.string().required('Required'),
        settings: Yup.string().required('Required'),
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
                    <div className='Heading'>
                        <div className='Cell'>&nbsp;</div>
                        <div className='Cell'>&nbsp;</div>
                        <div className='Cell'>&nbsp;</div>
                    </div>

                    <FormikControl
                        control='input'
                        type='text'
                        label='Description'
                        name='description' />

                    <div className='Row'><div className='Cell'>&nbsp;</div></div>

                    <FormikControl
                        control='input'
                        type='text'
                        label='Settings'
                        name='settings' />

                    <div className='Row'><div className='Cell'>&nbsp;</div></div>

                    <button type='submit' disabled={!formik.isValid}>Submit</button>
                </Form>
        }
            
        </Formik >
    )
}

export default ConfigurationForm