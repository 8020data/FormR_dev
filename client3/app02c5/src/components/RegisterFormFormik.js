import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";
import FormikControl from "./FormikControl";
import AuthService from "../services/AuthService";

function RegisterForm() {
  let history = useHistory();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password doesn't match"
        ),
      }),
  });

  const onSubmit = (values) => {
    AuthService.register(values.username, values.email, values.password).then(
      () => {
        alert(values.username + " was successfully added");
        history.push("/home");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert("Error: " + resMessage);
      }
    );
  };

  return (
    <div class="card card-info">
      <div class="card-header">
        <h3 class="card-title">Register Form</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form class="form-horizontal">
            <div class="card-body">
              <FormikControl
                control="input3"
                type="text"
                label="Username"
                name="username"
              />
              <FormikControl
                control="input3"
                type="email"
                label="Email"
                name="email"
              />
              <FormikControl
                control="input3"
                type="password"
                label="Password"
                name="password"
              />
              <FormikControl
                control="input3"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
              />
              {/* Footer */}
              <div className="card-footer">
                <button
                  type="submit"
                  class="btn btn-info"
                  disabled={!formik.isValid}
                >
                  Register{" "}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
