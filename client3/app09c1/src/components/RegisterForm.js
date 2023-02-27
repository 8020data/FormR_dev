   import   React, { useRef } from "react";
// import   ReactDOM from "react-dom";
   import { useForm } from "react-hook-form";

   import { useHistory } from "react-router-dom";
   import   AuthService from "../services/AuthService";

function RegisterForm() {
  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    AuthService.register(data.username, data.email, data.password).then(
      () => {
        alert(data.username + " was successfully added");
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
    <form class="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <div class="card-body">
        <div class="form-group row">
         <label>Username</label>
          <input
            type="text"
            name="username"
            ref={register({
              required: true,
              minLength: 6,
            })}
          />
          {errors.username && errors.username.type === "required" && (
            <p>Username is required.</p>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <p>Username should be at-least 6 characters.</p>
          )}
        </div>
        <div class="form-group row">
          <label>Email</label>
          <input
            type="text"
            name="email"
            ref={register({
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p>Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p>Email is not valid.</p>
          )}
        </div>
        <div class="form-group row">
          <label>Password</label>
          <input
            type="password"
            name="password"
            ref={register({
              required: true,
              minLength: 4,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p>Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p>Password should be at-least 4 characters.</p>
          )}
        </div>
        <div class="form-group row">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            ref={register({
              validate: value =>
                value === password.current || "The passwords do not match"
            })}
          />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="card-footer">
          <label></label>
          <button type="submit">Register</button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
