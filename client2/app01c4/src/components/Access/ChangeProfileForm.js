import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { useHistory, Redirect } from "react-router-dom";
import AuthService from "../../services/AuthService";

function ChangeProfileForm() {
  let history = useHistory();

  var currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    localStorage.message = "You are not logged in";
    history.push("/home");
    window.location.reload();
  }

  const { register, handleSubmit, watch, errors } = useForm({
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
    <div>
      <form style={{ paddingLeft: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="hidden"
            name="id"
            className="form-control-border"
            ref={register()}
          />
        </div>
        <div>
          <label>Username</label>
          <input type="text" name="username" ref={register({})} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" ref={register({})} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" ref={register({})} />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" ref={register({})} />
        </div>
        <div>
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default ChangeProfileForm;
