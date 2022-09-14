import * as React from "react";
import Avatar from "@mui/material/Avatar";
import "./../style/Post.css";
import { useState } from "react";

export default function Post(props) {
  const [modalToggle, setModalToggle] = useState(false);
  const [post, setPost] = useState("");
  const userName = sessionStorage.getItem("name");

  /* Set toggle for modal display */
  const onPostStatusClicked = () => {
    setModalToggle(!modalToggle);
  };

  return (
    <div className="post-paper">
      <div className="post-container">
        {/* Display user symbol */}
        <Avatar
          alt="Remy Sharp"
          sx={{ height: 50, width: 50, marginLeft: 8, marginTop: 11 }}
        />
        {/* Display the post's owner and the name of the pantry */}
        <p className="post-name">{props.userName}</p>
        <p className="in">in</p>
        <img className="logo" src="./favicon.ico" />
        <p className="pantry-name">{props.name}</p>
      </div>
      <p className="post-role">Pantry User</p>
      {/* Display the post message */}
      <div className="post-text-container">
        <p className="post-text">{props.body}</p>
      </div>

      {/* If user created the post, they are able to edit and delete the post. */}
      {/* Otherwise, edit and delete access is not available. */}
      {modalToggle == true ? (
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close" onClick={onPostStatusClicked}>
              &times;
            </span>
            <h2>Update Your Post</h2>
            <br></br>
            <textarea
              type="text"
              className="post-input"
              placeholder={"Share an update about".concat(
                " ",
                props.pantryName
              )}
              onChange={(event) => {
                setPost(event.target.value);
              }}
            ></textarea>
            <br></br>
            <button className="post-submit-button">Update</button>
            <button className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
