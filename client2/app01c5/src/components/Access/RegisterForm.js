import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import   AuthService       from "../../services/AuthService";

function RegisterForm() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    AuthService.register(data.username, data.email, data.password).then(
      () => {
        localStorage.message = "You have successfully registered, " + data.username.charAt(0).toUpperCase() + data.username.slice(1);
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
          <b>Register </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control-border"
                  placeholder="Username"
                  ref={register({})}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control-border"
                  placeholder="Email"
                  name="email"
                  ref={register({})}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control-border"
                  placeholder="Password"
                  name="password"
                  ref={register({})}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control-border"
                  placeholder="Confirm Password"
                  ref={register({})}
                />
              </div>
              <div className="card-footer">
                <label></label>
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}

export default RegisterForm;
