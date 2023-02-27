import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";                                   // .(10322.05.01 RAM Add ../ because this files is inside ./components/access)

function LoginForm() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    AuthService.login(data.username, data.password).then(
      () => {
        history.push("/");                                                              // .(10321.06.1 Was /profile. Let App.js determine where to go.)
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
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Login Form</h3>
      </div>

      <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <div className="form-group row">
            <label>Username</label>
            <input type="text" name="username" 
            ref={register({
              required: true,
            })}
          />
          {errors.username && errors.username.type === "required" && (
            <p>Username is required.</p>
          )}
          </div>
          <div className="form-group row">
            <label>Password</label>
            <input type="password" name="password"
            ref={register({
              required: true,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p>Password is required.</p>
          )}
          </div>
          <div className="card-footer">
            <label></label>
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
