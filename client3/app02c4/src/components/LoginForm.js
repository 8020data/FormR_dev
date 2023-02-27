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
    <div>
      <form style={{ paddingLeft: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            ref={register({ })}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            ref={register({ })}
          />
        </div>
        <div>
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
