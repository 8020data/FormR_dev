import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import   AuthService       from "../../services/AuthService";

function ForgotPasswordForm() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    AuthService.validateEmail(data.email).then(
      () => {
        // add email action here
        localStorage.message =
          "A reset password email has been sent to " + data.email;
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
          <label>Email</label>
          <input type="text" name="email" ref={register({})} />
        </div>
        <div>
          <label></label>
          <button type="submit">Send Reset Email</button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
