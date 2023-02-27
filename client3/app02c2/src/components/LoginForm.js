import React from "react";

function LoginForm () {

  return (
    <div>
      <form style={{ paddingLeft: '20px' }}>
        <div>
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
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
