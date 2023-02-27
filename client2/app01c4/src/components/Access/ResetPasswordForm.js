import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import   AuthService       from "../../services/AuthService";

function ResetPasswordForm() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    AuthService.resetPassword(data.email, data.newPassword).then(
      () => {
        localStorage.message = "You have successfully changed your password";
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
          <label>Password</label>
          <input type="password" name="newPassword" ref={register({})} />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmNewPassword" ref={register({})} />
        </div>
        <div>
          <label></label>
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
