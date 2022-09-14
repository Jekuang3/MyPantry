import React, { useEffect } from "react";
import "./../style/Dashboard.css";
import PantryCard from "./../pantry/PantryCard.js";
import TabBar from "./TabBar.js";
import Divider from "@mui/material/Divider";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

// MyPantry landing page
function Dashboard() {
  const [pantryList, setPantryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = sessionStorage.getItem("token");
  console.log(sessionStorage.getItem("name"));

  // Clears the search bar input
  const clearInput = () => {
    setSearchTerm("");
    document.getElementById("myInput").value = "";
  };

  // Retrieves response obj containing all pantries from the database
  // and places each in a list as dictionaries
  const getPantries = () => {
    console.log("hello get pantries");
    Axios.get("http://localhost:3000/pantries").then((response) => {
      response.data.pantries.map((val, key) => {
        console.log(response);
        setPantryList((pantryList) => [
          {
            id: val.id,
            name: val.name,
            location: val.location,
            pantryBio: val.pantryBio,
            contact: val.contact,
            hours: val.hours,
            pantryImg: val.pantryImg,
          },
          ...pantryList,
        ]);
      });
    });
  };
  // Calls getPantries once when page loads
  useEffect(() => {
    getPantries();
  }, []);

  return (
    <div className="background">
      <TabBar />

      <div className="title-button-container">
        <h1 className="title">Pantries</h1>
        {/* If a user is logged in, display Add Pantry button
         (links to RegisterPantry when clicked) */}
        {token && (
          <button className="add-pantry-button" title="add-button">
            <Link to="/RegisterPantry" className="add-pantry-link">
              Add Pantry
            </Link>
          </button>
        )}
      </div>

      <Divider />

      {/* Display search bar for pantries (calls clearInput when closing search bar) */}
      <div className="search">
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          id="myInput"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>

        <div className="searchIcon">
          {searchTerm.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        <br></br>
      </div>

      <div className="cards">
        {console.log(pantryList.length)}
        {pantryList
          // Filter through pantries according to the search bar input
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          // Map list elements (pantries) to a PantryCard by passing props
          .map((val, key) => {
            return (
              <PantryCard
                key={val.id}
                name={val.name}
                location={val.location}
                pantryBio={val.pantryBio}
                pantryId={val.id}
                contact={val.contact}
                hours={val.hours}
                pantryImg={val.pantryImg}
                startTime="1 p.m."
                endTime="4 p.m"
                days="everyday"
                image="./fnb.png"
                isOpen="OPEN"
              />
            );
          })}
      </div>

      <br></br>
      
    </div>
  );
}

export default Dashboard;
