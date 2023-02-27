import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";

function LoginForm() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    AuthService.login(data.username, data.password).then(
      () => {
        history.push("/profile");
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
        <h3 class="card-title">Login Form</h3>
      </div>

      <form class="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <div class="card-body">
          <div class="form-group row">
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
          <div class="form-group row">
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
