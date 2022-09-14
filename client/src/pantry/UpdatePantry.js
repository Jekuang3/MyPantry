import "./../style/UpdatePantry.css";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";

// Update pantry profile fields with user input
function UpdatePantry(props) {
  const { id } = props.location.state;
  const { pantryName } = props.location.state;
  const [pantryBio, setPantryBio] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [hours, setTime] = useState("");
  const [pantryImg, setImage] = useState("");
  const history = useHistory();

  // Retrieves previously set field values for this pantry
  const getPantryInfo = () => {
    const url = "http://localhost:3000/pantries/" + pantryName;
    Axios.get(url).then((response) => {
      console.log(response);
      console.log(response.data.pantry.location);
      setLocation(response.data.pantry.location);
      setPantryBio(response.data.pantry.pantryBio);
      setContact(response.data.pantry.contact);
      setTime(response.data.pantry.hours);
      setImage(response.data.pantry.pantryImg);
    });
  };
  // Calls getPantryInfo once when page loads
  useEffect(() => {
    getPantryInfo();
  }, []);

  // Sends pantry fields specified by states to the database
  const updatePantry = () => {
    let formData = new FormData();
    pantryBio && formData.append("pantryBio", pantryBio);
    location && formData.append("location", location);
    contact && formData.append("contact", contact);
    hours && formData.append("hours", hours);
    let imgUrl =
      typeof pantryImg.name === "undefined"
        ? "./food_pantry.jpg"
        : "./" + pantryImg.name;
    formData.append("pantryImg", imgUrl);
    
    console.log("update pantry");
    const url = "http://localhost:3000/pantries/" + pantryName;
    Axios.put(url, formData).then((response) => {
      console.log(response);
      // redirects to pantry profile page
      history.push({
        pathname: "/PantryProfile",
        state: {
          id: id,
          name: pantryName,
        },
      });
    });
  };

  // Sets pantryImg to the file object value
  const handleImgChange = (name) => (event) => {
    const value =
      name === "pantryImg" ? event.target.files[0] : event.target.value;
    setImage(value);
  };

  return (
    <div className="screen">
      <div className="App">
        <h1 className="pantry-title">Update Pantry</h1>
      </div>

      <div className="name-bio-location-flex">
        {/* Pantry bio field */}
        <p> Bio </p>
        <textarea
          className="input"
          type="text"
          value={pantryBio}
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
          onChange={handleImgChange("pantryImg")}
        />
        <label htmlFor="pantry-img">
          <Button variant="contained" component="span">
            Upload
            <FileUpload />
          </Button>
        </label>
        {/* Display image file name below upload button */}
        <span className="input">{pantryImg ? pantryImg.name : ""}</span>

        {/* Pantry location field */}
        <p> Location </p>
        <input
          className="input"
          type="text"
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        ></input>

        {/* Pantry hours field */}
        <p> Hours </p>
        <input
          className="input"
          type="text"
          value={hours}
          onChange={(event) => {
            setTime(event.target.value);
          }}
        ></input>

        {/* Contact info field */}
        <p> Contact Info </p>
        <textarea
          className="input"
          type="text"
          value={contact}
          onChange={(event) => {
            setContact(event.target.value);
          }}
        ></textarea>
      </div>

      {/* Update pantry button (calls updatePantry function) */}
      <div className="login">
        <button className="update-button" onClick={updatePantry}>
          Update Pantry
        </button>
      </div>
    </div>
  );
}

export default UpdatePantry;
