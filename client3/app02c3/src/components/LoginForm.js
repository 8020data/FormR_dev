import React from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 4));
    console.log(data);
  };

  return (
    <div>
      <form style={{ paddingLeft: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <div>
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
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            ref={register({ 
              required: true, 
              minLength: 10,
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
              })}
          />
          {errors.password && errors.password.type === "required" && (
            <p>Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p>
              Password should be at-least 10 characters.
            </p>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <p>Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.</p>
          )}
        </div>
        <div>
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
