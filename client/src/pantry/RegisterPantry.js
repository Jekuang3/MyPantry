import "./../style/RegisterPantry.css";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

// Create a new pantry profile with user input fields
function RegisterPantry() {
  const [name, setName] = useState("");
  const [pantryBio, setPantryBio] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [hours, setTime] = useState("");
  const [pantryImg, setImage] = useState("");
  const history = useHistory();

  // Creates a pantry entry in the database
  const addPantry = () => {
    let formData = new FormData();
    name && formData.append("name", name);
    pantryBio && formData.append("pantryBio", pantryBio);
    location && formData.append("location", location);
    contact && formData.append("contact", contact);
    hours && formData.append("hours", hours);
    let imgUrl =
      typeof pantryImg.name === "undefined"
        ? "./food_pantry.jpg"
        : "./" + pantryImg.name;
    formData.append("pantryImg", imgUrl);

    console.log("add pantry");
    Axios.post("http://localhost:3000/pantries", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      console.log(response);
      console.log(pantryImg);
      console.log(pantryImg.name);
      console.log(response.data);
      // Redirects to dashboard page
      history.push("/");
    });
  };

  // Sets pantryImg to the file object value
  const handleChange = (name) => (event) => {
    const value =
      name === "pantryImg" ? event.target.files[0] : event.target.value;
    setImage(value);
  };

  return (
    <div className="screen">
      <div className="App">
        <h1 className="pantry-title">Register Pantry</h1>
      </div>

      <div className="name-bio-location-flex">
        {/* Pantry name field */}
        <p> Name </p>
        <input
          className="input"
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>

        {/* Pantry bio field */}
        <p> Bio </p>
        <textarea
          className="input"
          type="text"
          placeholder="Bio"
          onChange={(event) => {
            setPantryBio(event.target.value);
          }}
        ></textarea>

        {/* Pantry profile image upload field */}
        <p> Pantry profile image </p>
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          id="pantry-img"
          onChange={handleChange("pantryImg")}
        />
        <label htmlFor="pantry-img">
          <Button variant="contained" component="span">
            Upload
            <FileUpload />
          </Button>
        </label>
        <span className="input">{pantryImg ? pantryImg.name : ""}</span>

        {/* Pantry location field */}
        <p> Location </p>
        <input
          className="input"
          type="text"
          placeholder="32 Cherry Tree Drive, Cowell College, etc"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        ></input>

        {/* Pantry hours field */}
        <p> Hours </p>
        <input
          className="input"
          type="text"
          placeholder="Hours"
          onChange={(event) => {
            setTime(event.target.value);
          }}
        ></input>

        {/* Contact info field */}
        <p> Contact Info </p>
        <textarea
          className="input"
          type="text"
          placeholder="Contact"
          onChange={(event) => {
            setContact(event.target.value);
          }}
        ></textarea>
      </div>

      {/* Add pantry button (calls addPantry function) */}
      <div className="login">
        <button className="register-button-pantry" onClick={addPantry}>
          Register
        </button>
      </div>

      <br></br>
      <br></br>
      
    </div>
  );
}

export default RegisterPantry;
