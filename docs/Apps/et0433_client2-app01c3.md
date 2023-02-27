# Client2 App01c3  (433)  
## !_Login Form with React+Formik+Yup 
  
<img src="Apps/images/et0433_client2-app01c3_screen1.png" class="img4" style="width:400px;"></br>
  
## Notes:  

- As you can see the login form above has no style, except ...
- In line `<Form style={{ paddingLeft: '10px' }}>`, in the code below, an inline style can be used if you follow three new syntax rules
  1. The style definition is an Javascript object, i.e. `{ style: 'value' }`
  2. It must have duble curly braces `{{ ... }}`
  3. Style names use camelCase since hypens are not allowed
- Nothing happens when clicking on Submit except the `console.log('Form data', values)` shows the form values in the browser's developer tools console.
- No client-side routes are defined 
  
</br>

## Code:
```javascript
   import   React          from 'react'
   import { Formik, Form } from 'formik'
   import   * as Yup       from 'yup'
   
   import   FormikControl  from './FormikControl'

function LoginForm() {

    const initialValues = {
        email: '',
        password: ''
        }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required')       
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
            < Form style={{ padding: '10px' }}>
                <FormikControl
                    control='input'
                    type='email'
                    label='Email: '
                    name='email' />
                <FormikControl
                    control='input'
                    type='password'
                    label='Password: '
                    name='password' />

                <button type='submit' disabled={!formik.isValid}>Submit</button>
            </Form>
        }
            
        </Formik >
    )}

export default LoginForm
```

