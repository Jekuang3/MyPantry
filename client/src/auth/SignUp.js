import "./../style/SignUp.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // api call request to add a user
  const addUser = () => {
    console.log("add user");
    Axios.post("http://localhost:3000/users/create", {
      email: email,
      name: username,
      password: password,
    }).then((response) => {
      console.log(response);
      // return to Login page once sign-up info is added to database
      history.push("/Login");
    });
  };
  return (
    <div className="screen">
      <div className="App">
        <button className="pantry-button" type="button">
          <h1 className="pantry-title">Sign Up</h1>
        </button>

        {/* Display Login and Signup text and input */}
        <div className="login-signup-flex">
          <button className="setup-button">
            <Link to="/Login" class="signup-link">
              Login
            </Link>
          </button>
          <button className="setup-button">Sign-up</button>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>

      {/* Display email address text and input */}
      <div className="email-password-flex">
        <p className="email-text">Email Address</p>
        <input
          className="input"
          type="text"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>

        {/* Display username text and input */}
        <p className="username-text">Username</p>
        <input
          className="input"
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>

        {/* Display password text and input */}
        <p className="password-text">Password</p>
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>

        {/* Display confirm password text and input */}
        <p className="confirm-password-text">Confirm Password</p>
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
        ></input>

      </div>

      <br></br>
      
      {/* Display Signup text and button */}
      <div className="login">
        <button className="setup-sign-up-button" onClick={addUser}>
          Sign-up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
