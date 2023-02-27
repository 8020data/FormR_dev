import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, FieldArray, Field } from "formik";
import Input from "./Input";
import "./styles.css";

const initialFormData = undefined;

function App() {

  const [formData, setFormData] = useState( initialFormData );

  useEffect( ( ) => {   // this is replacement for a network call that would load the data from a server
    setTimeout( ( ) => {
      setFormData( {
        id       :  1,
        firstName: "First Name 1",
        friends  : [
          { id: 2, firstName: "First Name 2", lastName: "Last Name 2" },
          { id: 3, firstName: "First Name 3", lastName: "Last Name 3" }
            ]
        } );
     }, 1000);

    // Missing dependency array here

    }, [ ] );

  return (

    <div className="app">

      { formData && (
        <Formik initialValues={ formData } enableReinitialize >

          { ({ values }) => (

            <Form>
              <Input      name="name" label="Name: " />

              <FieldArray name="friends">

                { arrayHelpers => (

                  <div>

                    <button
                      onClick={ ( ) =>
                        arrayHelpers.push( {
                          id       : Math.floor(Math.random() * 100) / 10,
                          firstName: "",
                          lastName : ""
                          } )
                        }
                      >
                      add
                    </button>

                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>FirstName</th>
                          <th>LastName</th>
                          <th />
                        </tr>
                      </thead>

                      <tbody>

                        {values.friends && values.friends.length > 0 ? (

                          values.friends.map(( friend, index ) => (
                            <tr key={index}>
                              <td>{ friend.id }</td>
                              <td><Input name={ `friends[${index}].firstName` } /></td>
                              <td><Input name={ `friends[${index}].lastName`  } /></td>
                              <td><button onClick={() => arrayHelpers.remove(index)} >
                                  remove
                                </button>
                              </td>
                            </tr>
                          ) )
                        ) : (
                          <tr>
                            <td>no friends :(</td>
                          </tr>
                        ) }
                      </tbody>
                    </table>

                  </div>
                ) } // eof arrayHelpers => ( <div> ... </div> )

              </FieldArray>

            </Form>
          ) }
        </Formik>

      ) } // eof { ({ values }) => ( ... )
    </div>

  ); // eof { formData && (
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);