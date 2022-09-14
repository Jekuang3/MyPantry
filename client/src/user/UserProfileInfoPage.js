import * as React from "react";
import "./../style/UserProfileInfoPage.css";
import TabBar from "./../core/TabBar.js";
import Avatar from "@mui/material/Avatar";

export default function UserProfileInfoPage(props) {
  const userName = sessionStorage.getItem("name");
  return (
    <div className="screen">
      {/* Display profile header */}
      <div className="user-profile-header">
        <h2 className="profile-text">Profile</h2>
      </div>

      {/* Display profile picture */}
      <div className="user-profilepic-header">
        <Avatar
          alt="Remy Sharp"
          sx={{ height: 120, width: 120, marginTop: 5, marginBottom: 5 }}
        />
      </div>

      {/* Display user info such as username */}
      <div className="user-profile-paper-container">
        <div className="user-profile-paper">
          <p className="public-information-text">User Information</p>
          <div className="user-flex-row-container">
            <div className="user-property-flex-column-container">
              <p>Username</p>
            </div>
            <div className="user-value-flex-column-container">
              <p className="user-username">{userName}</p>
            </div>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
