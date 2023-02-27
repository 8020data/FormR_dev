   import   React         from 'react'
   
   import   Input         from './controls/Input.js'
// import   Textarea      from './controls/Textarea'
// import   Select        from './controls/Select'
// import   RadioButtons  from './controls/RadioButtons'
// import   CheckboxGroup from './controls/CheckboxGroup'
// import   DatePicker    from './controls/DatePicker'

function FormikControl( props ) {

   const { control, ...rest } = props

   switch (control) {
     case 'input'     : return <Input         { ...rest } />
//   case 'textarea'  : return <Textarea      { ...rest } />
//   case 'select'    : return <Select        { ...rest } />
//   case 'radio'     : return <RadioButtons  { ...rest } />
//   case 'checkbox'  : return <CheckboxGroup { ...rest } />
//   case 'date'      : return <DatePicker    { ...rest } />
       default        : return null
       }       
     }

   export default FormikControl