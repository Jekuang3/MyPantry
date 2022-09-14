import React, { useEffect } from "react";
import "./../style/PantryPosts.css";
import Post from "./Post.js";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import TabBar from "./../core/TabBar.js";
import Divider from "@mui/material/Divider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import { useState } from "react";

function PantryPosts(props) {
  const [modalToggle, setModalToggle] = useState(false);
  const [updateModalToggle, setUpdateModalToggle] = useState(false);
  const [post, setPost] = useState("");
  const [postsList, setPostsList] = useState([]);
  const [pickedPostId, setPickedPostId] = useState();
  const { name } = props.location.state;
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("name");

  const [location, setLocation] = useState("");
  const [hours, setTime] = useState("");
  const [id, setId] = useState("");
  const [pantryImg, setImage] = useState("");

  /* Set toggle for modal display */
  const onPostStatusClicked = () => {
    setModalToggle(!modalToggle);
  };
  const onUpdateStatusClicked = () => {
    setUpdateModalToggle(!updateModalToggle);
  };

  const onUpdateStatusClickedFromEditButton = (id) => {
    console.log("update button");
    console.log(id);
    setPickedPostId(id);
    setUpdateModalToggle(!updateModalToggle);
  };

  /* get pantry info api request call */
  const getPantryInfo = () => {
    console.log("get pantries info");
    const url = "http://localhost:3000/pantries/" + name;
    Axios.get(url).then((response) => {
      console.log(response);
      setId(response.data.pantry.id);
      setLocation(response.data.pantry.location);
      setTime(response.data.pantry.hours);
      setImage(response.data.pantry.pantryImg);
    });
  };

  useEffect(() => {
    getPantryInfo();
    getPantryPosts();
  }, []);

  /* get pantry posts api request call */
  const getPantryPosts = () => {
    console.log("get pantries posts");
    const url = "http://localhost:3000/pantries/" + name + "/posts";
    Axios.get(url, {
      pantry: name,
    }).then((response) => {
      console.log(response);
      response.data.posts.map((val, key) => {
        setPostsList((postsList) => [
          { name: name, body: val.body, user: val.user, id: val.id },
          ...postsList,
        ]);
      });
    });
  };

  /* add post api request call */
  const addPost = () => {
    setModalToggle(!modalToggle);
    console.log("add post");
    const userId = sessionStorage.getItem("id");
    const userName = sessionStorage.getItem("name");
    console.log(userId);

    const url = "http://localhost:3000/pantries/" + name + "/posts";
    Axios.post(url, {
      pantry: name,
      author: userId,
      body: post,
    }).then((response) => {
      console.log(response);
      setPostsList((postsList) => [
        {
          name: name,
          body: response.data.body,
          user: userName,
          id: response.data._id,
        },
        ...postsList,
      ]);
    });
  };

  /* update post api request call */
  const updatePost = () => {
    console.log("update post");
    console.log(post);
    setUpdateModalToggle(!updateModalToggle);
    const url =
      "http://localhost:3000/pantries/" + name + "/posts/" + pickedPostId;
    Axios.put(url, {
      body: post,
    }).then((response) => {
      console.log(response);
      setPostsList(
        postsList.map((val) => {
          return val.id == pickedPostId
            ? {
                name: val.name,
                body: post,
                user: val.user,
                id: val.id,
              }
            : val;
        })
      );
    });
  };

  /* delete pantry api request call */
  const deletePantry = (id) => {
    console.log("delete pantry");
    const url = "http://localhost:3000/pantries/" + name + "/posts/" + id;
    Axios.delete(url).then((response) => {
      console.log(response);
      setPostsList(
        postsList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  return (
    <div className="background">
      <TabBar />
      {/* display name, hours, location, pantry info */}
      <div className="image-container">
        <img src={pantryImg} className="image-fit"></img>
        <div className="pantry-name-container">
          <h1 className="pantry-profile-name">{name}</h1>
        </div>

        <div className="inner-container">
          <div className="pantry-hours-container">
            <p className="pantry-text">Hours: {hours}</p>
          </div>
          <div className="pantry-address-container">
            <p className="pantry-text">{location}</p>
          </div>
        </div>
      </div>

      {/* Display pantry Summary and Posts navigation bar  */}
      <div className="nav-container">
        <button className="pantry-summary-button">
          <Link
            to={{
              pathname: "/PantryProfile",
              state: {
                name: name,
                id: id,
              },
            }}
            className="posts-summary-text"
          >
            Summary
          </Link>
        </button>
        <button className="pantry-posts-button">Posts</button>
      </div>

      <br></br>

      <Divider />

      {/* Display post prompt at top of post board */}
      {token && (
        <div className="center-container">
          <div className="posts-create-container">
            <Avatar
              alt="Remy Sharp"
              sx={{ height: 50, width: 50, marginLeft: 3, marginTop: 2 }}
            />
            <button className="post-button" onClick={onPostStatusClicked}>
              Write a post
            </button>
          </div>
        </div>
      )}
      {/* display all posts in the list */}
      <div className="posts-section">
        {postsList.map((val, key) => {
          return (
            <div className="posts-section">
              <Post
                name={val.name}
                body={val.body}
                userName={val.user}
                id={val.id}
                pantryName={name}
              />
              {/* only display update/delete button for logged in user with auth */}
              {val.user == username && (
                <div className="icon-container">
                  <button
                    className="edit-button"
                    onClick={() => onUpdateStatusClickedFromEditButton(val.id)}
                  >
                    <EditIcon className="edit-icon" sx={{ color: "green" }} />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deletePantry(val.id)}
                  >
                    <DeleteIcon className="delete-icon" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* display a 'write a new post' form */}
      {modalToggle == true ? (
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close" onClick={onPostStatusClicked}>
              &times;
            </span>
            <h2>Write a new Post</h2>
            <br></br>
            <textarea
              type="text"
              className="post-input"
              placeholder={"Share something about".concat(" ", name)}
              onChange={(event) => {
                setPost(event.target.value);
              }}
            ></textarea>
            <br></br>
            <button className="post-submit-button" onClick={addPost}>
              Post
            </button>
            <button className="cancel-button" onClick={onPostStatusClicked}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      {/* display a 'update a post' form */}
      {updateModalToggle == true ? (
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close" onClick={onUpdateStatusClicked}>
              &times;
            </span>
            <h2>Update Your Post</h2>
            <br></br>
            <textarea
              type="text"
              className="post-input"
              placeholder={"Update something about".concat(" ", name)}
              onChange={(event) => {
                setPost(event.target.value);
              }}
            ></textarea>
            <br></br>
            <button className="post-submit-button" onClick={updatePost}>
              Update
            </button>
            <button className="cancel-button" onClick={onUpdateStatusClicked}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

export default PantryPosts;
