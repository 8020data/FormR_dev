   import   React                                 from 'react'

   import { List,      Datagrid,  EditButton    } from 'react-admin'
   import { TextField, DateField                } from 'react-admin'

   import { Edit, Create, SimpleForm            } from 'react-admin'
// import { TextInput,    DateInput             } from 'react-admin'
   import {               DateInput             } from 'react-admin'

// import { AutocompleteInput                   } from 'react-admin'
// import { required                            } from 'react-admin'
//  const   Select         =  AutocompleteInput

export const CountryList   =  function( props ) {
  return (
    <List                        {...props}>
      <Datagrid rowClick="edit">
        <TextField  source="Code"           />
        <TextField  source="Name"           />
        <TextField  source="Continent"      />
        <TextField  source="Region"         />
        <TextField  source="SurfaceArea"    />
        <TextField  source="IndepYear"      />
        <TextField  source="Population"     />
        <TextField  source="LifeExpectancy" />
        <TextField  source="GNP"            />
        <TextField  source="GNPOld"         />
        <TextField  source="LocalName"      />
        <TextField  source="GovernmentForm" />
        <TextField  source="HeadOfState"    />
        <TextField  source="Capital"        />
        <TextField  source="Code2"          />
        <DateField  source="createdAt"      />
        <DateField  source="updatedAt"      />
        <EditButton/>
      </Datagrid>
    </List>
    ) };

export const CountryEdit   =  function( props ) {
  return (
    <Edit title='Edit User'      {...props} >
      <SimpleForm>
        <TextField  source="Code"           />
        <TextField  source="Name"           />
        <TextField  source="Continent"      />
        <TextField  source="Region"         />
        <TextField  source="SurfaceArea"    />
        <TextField  source="IndepYear"      />
        <TextField  source="Population"     />
        <TextField  source="LifeExpectancy" />
        <TextField  source="GNP"            />
        <TextField  source="GNPOld"         />
        <TextField  source="LocalName"      />
        <TextField  source="GovernmentForm" />
        <TextField  source="HeadOfState"    />
        <TextField  source="Capital"        />
        <TextField  source="Code2"          />
        <DateInput  source="createdAt"    label="Created At"                disabled               helperText="Date User was Created"        />
        <DateInput  source="updatedAt"    initialValue={new Date()}         disabled               helperText="Date User was Last Updated"   /> 
      </SimpleForm>
    </Edit>
    ) };

export const CountryCreate =  function( props ) {
  return (
    <Create title='Create a User' {...props} >
      <SimpleForm>
        <TextField  source="Code"           />
        <TextField  source="Name"           />
        <TextField  source="Continent"      />
        <TextField  source="Region"         />
        <TextField  source="SurfaceArea"    />
        <TextField  source="IndepYear"      />
        <TextField  source="Population"     />
        <TextField  source="LifeExpectancy" />
        <TextField  source="GNP"            />
        <TextField  source="GNPOld"         />
        <TextField  source="LocalName"      />
        <TextField  source="GovernmentForm" />
        <TextField  source="HeadOfState"    />
        <TextField  source="Capital"        />
        <TextField  source="Code2"          />
        <DateInput  source="createdAt"    initialValue={new Date()}         disabled               helperText="Date User was Created"        />
{/*     <DateInput  source="updatedAt"    initialValue={new Date()}         disabled               helperText="Date User was Last Updated"   /> */}
      </SimpleForm>
    </Create>
    ) };