import * as React from "react";
import "./../style/TabBar.css";
import UserInfoIcon from "./../user/UserInfoIcon.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

// Navigation bar/header
export default function TabBar() {
  const history = useHistory();

  // Redirect to Login page
  const goToLogin = () => {
    history.push("/Login");
  };

  // Set user_info as a Login button
  var user_info = (
    <button className="login-button-tab" onClick={goToLogin}>
      Login
    </button>
  );
  
  // If a user is logged in, user_info is set to a UserInfoIcon 
  // component, which displays the Logout button with the username
  const userName = sessionStorage.getItem("name");
  if (userName) {
    user_info = <UserInfoIcon name={userName} />;
  }

  return (
    <div className="tab-bar">
      <div className="site-title">
        {/* Display MyPantry logo with a link back to Dashboard */}
        <Link
          className="nav-bar-title"
          to={{
            pathname: "/",
          }}
        >
          MyPantry
          <img src="./favicon.ico" className="pantry-img"></img>
        </Link>

        {/* Display user_info (login or logout button) */}
        <div className="user-info-flex">{user_info}</div>
      </div>
    </div>
  );
}
