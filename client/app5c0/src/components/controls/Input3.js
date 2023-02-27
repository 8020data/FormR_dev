import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

export function Input(props) {
    const { label, name, ...rest }  = props  

    return (
        <div className='Row'>
            <div className='Cell'>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className='Cell'>
                <Field id={name} name={name} {...rest} />
                <ErrorMessage name={name} component={TextError} />
            </div>
            <div className='Cell'>
                <label htmlFor={name}>Help info</label>
            </div>
        </div>

    )
}
export default Input