import React       from 'react'

function HomePage() {
  var message = localStorage.message;
  localStorage.message = "";
  message = message ? message : "Welcome to FormR";
  return (
    <b>{ message }</b>
  );
}
export default HomePage;
