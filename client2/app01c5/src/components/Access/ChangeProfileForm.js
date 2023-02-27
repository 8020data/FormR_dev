import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";

function ChangeProfileForm() {
  let history = useHistory();

  var currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    localStorage.message = "You are not logged in";
    history.push("/home");
    window.location.reload();
  }

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      id: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      password: "",
      confirmPassword: "",
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);

    AuthService.updateCurrentUser(
      data.id,
      data.username,
      data.email,
      data.password
    ).then(
      () => {
        alert(data.username + " was successfully updated");
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
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Change User Profile </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="hidden"
                  name="id"
                  className="form-control-border"
                  ref={register()}
                />
              </div>
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
                  name="email"
                  className="form-control-border"
                  placeholder="Email"
                  ref={register({})}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="password"
                  className="form-control-border"
                  placeholder="Password"
                  ref={register({})}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="confirmPassword"
                  className="form-control-border"
                  placeholder="Confirm Password"
                  ref={register({})}
                />
              </div>
              <div className="card-footer">
                <label></label>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfileForm;
