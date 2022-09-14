import "./../style/Login.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* sign-in api call request */
  const signIn = () => {
    console.log("sign-in");

    Axios.post("http://localhost:3000/users/login", {
      email: email,
      password: password,
    }).then((response) => {
      /* If login succeeds retrieve authentication token from server
        and store it in session storage */
      const authUser = response.data;
      const userAuthToken = authUser.auth;
      const userName = authUser.user.name;
      const userID = authUser.user._id;

      sessionStorage.setItem("token", userAuthToken);
      sessionStorage.setItem("name", userName);
      sessionStorage.setItem("id", userID);

      console.log(authUser);

      console.log(response.data);

      console.log(sessionStorage.getItem("name"));
      history.push("/");
    });
  };

  return (
    <div className="screen">
      <div className="App">
        {/* display pantry logo */}
        <button className="pantry-button" type="button">
          <h1 className="pantry-title">MyPantry</h1>
          <img src="/pantrylogo2.png" className="pantry-logo"></img>
        </button>

        {/* display login and signup text and input */}
        <div className="login-signup-flex">
          <button className="setup-button">Login</button>
          <button className="signup-button">
            <Link to="/SignUp" className="signup-link">
              Sign-Up
            </Link>
          </button>
        </div>
      </div>
      
      <br></br>
      <br></br>
      <br></br>

      {/* display email address text and input */}
      <div className="email-password-flex">
        <p className="email-text">Email Address</p>
        <input
          className="email-input"
          type="text"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        ></input>

        {/* display password text and input */}
        <p className="password-text">Password</p>
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
      </div>

      <br></br>

      {/* display login text and button */}
      <div className="login">
        <button className="login-page-button" onClick={signIn}>
          Login
        </button>
      </div>

    </div>
  );
}

export default Login;
