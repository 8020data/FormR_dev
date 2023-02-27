import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import   AuthService       from "../../services/AuthService";

function ForgotPasswordForm() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    AuthService.validateEmail( data.email ).then(
      () => {
        // add email action here
        localStorage.message = "A reset password email has been sent to " + data.email;
        history.push("/home");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          localStorage.message = resMessage;
          history.push("/home");
      }
    );
  };

  return (
    <body className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Forgot Password </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control-border"
                  placeholder="Email"
                  name="email"
                  ref={register({})}
                />
              </div>
              <div className="card-footer">
                <label></label>
                <button type="submit">Send Reset Email</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}

export default ForgotPasswordForm;
