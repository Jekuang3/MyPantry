import React, { useEffect } from "react";
import "./../style/PantryProfile.css";
import TabBar from "./../core/TabBar.js";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Map from "./Map.js";
import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

// Displays profile for a selected pantry
function PantryProfile(props) {
  const { name } = props.location.state;

  const [location, setLocation] = useState("");
  const [pantryBio, setPantryBio] = useState("");
  const [id, setId] = useState("");
  const [contact, setContact] = useState("");
  const [hours, setTime] = useState("");
  const [pantryImg, setImage] = useState("");

  const history = useHistory();
  const [locationReady, setLocationReady] = useState("false");
  const token = sessionStorage.getItem("token");

  // Removes pantry from database and returns back to Dashboard
  const deletePantry = () => {
    console.log("delete pantry");
    const url = "http://localhost:3000/pantries/" + name;
    Axios.delete(url).then((response) => {
      console.log(response);
      history.push("/");
    });
  };

  // Retrieves previously set field values
  const getPantryInfo = () => {
    console.log("get pantry Info");
    const url = "http://localhost:3000/pantries/" + name;
    Axios.get(url).then((response) => {
      console.log(response);
      setId(response.data.pantry.id);
      setLocation(response.data.pantry.location);
      setPantryBio(response.data.pantry.pantryBio);
      setContact(response.data.pantry.contact);
      setTime(response.data.pantry.hours);
      setImage(response.data.pantry.pantryImg);
      setLocationReady(true);
    });
  };
  useEffect(() => {
    getPantryInfo();
  }, []);

  return (
    <div className="background">
      <TabBar />

      <div className="image-container">
        {/* Display pantry image and name*/}
        <img src={pantryImg} className="image-fit"></img>
        <div className="pantry-name-container">
          <h1 className="pantry-profile-name">{name}</h1>
        </div>

        {/* Display pantry hours and location */}
        <div className="inner-container">
          <div className="pantry-hours-container">
            <p className="pantry-text">Hours: {hours}</p>
          </div>
          <div className="pantry-address-container">
            <p className="pantry-text">Location: {location}</p>
          </div>
        </div>
      </div>

      {/* Display pantry Summary and Posts navigation bar */}
      <div className="nav-container">
        <button className="pantry-summary-button">Summary</button>
        {/* Navigate to PantryPosts page if Posts button is clicked*/}
        <button className="pantry-posts-button">
          <Link
            to={{
              pathname: "/PantryPosts",
              state: {
                name: name,
                location: location,
                pantryBio: pantryBio,
                id: id,
              },
            }}
            className="posts-activity-text"
          >
            Posts
          </Link>
        </button>
      </div>

      <br></br>

      <Divider />

      {/* If a user is logged in, display Update Pantry and Remove Pantry buttons */}
      <div className="button-container">
        {token && (
          // Navigate to UpdatePantry page if Update button is clicked
          <button className="update-pantry-button">
            <Link
              className="update-pantry-link-button"
              to={{
                pathname: "/UpdatePantry",
                state: {
                  id: id,
                  pantryName: name,
                },
              }}
            >
              Update Information
            </Link>
          </button>
        )}
        {token && (
          // Call deletePantry method if Delete button is clicked
          <button className="delete-pantry-button" onClick={deletePantry}>
            Remove Pantry
          </button>
        )}
      </div>

      <br></br>
      <br></br>

      {/* Display pantry description */}
      <div className="description-box">
        <p className="description-text">{pantryBio}</p>
      </div>

      {/* Display pantry contact info */}
      <h1 className="references-text">Contact: {contact}</h1>
      <br></br>

      {/* Display location map */}
      <div className="map-container">
        {locationReady == true && (
          <Map location={location} name={name} pantryImg={pantryImg} />
        )}
      </div>

      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

export default PantryProfile;
