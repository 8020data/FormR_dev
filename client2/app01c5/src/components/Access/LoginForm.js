import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";

function LoginForm() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    AuthService.login(data.username, data.password).then(
      () => {
        localStorage.message = "Welcome, " + data.username.charAt(0).toUpperCase() + data.username.slice(1)
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
          <b>Login </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Login to start your session</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control-border"
                  placeholder="Username"
                  name="username"
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

              <div className="card-footer">
                <label></label>
                <button type="submit">Login</button>
              </div>
            </form>
            <div>
              <hr></hr>
                <p className="mb-1">
                  <a href="./forgotpassword">I forgot my password</a>
                </p>
                <hr></hr>
                <p className="mb-1">
                  <a href="./register"><b>Register</b> for a new account</a>
                </p>
              </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default LoginForm;
