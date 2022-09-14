import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import Axios from "axios";
const {
  MarkerWithLabel,
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

/* define style for map */
const containerStyle = {
  width: "600px",
  height: "300px",
};

function Map(props) {
  const [isWindowVisible, setIsWindowVisible] = useState(false);

  const toggleWindow = () => {
    setIsWindowVisible(!isWindowVisible);
  };
  /* specify credential key from google maps api */
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCw-AslkWVquyIW2A9OUv47I7Rgupu_b70",
  });
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const [map, setMap] = React.useState(null);

  const center = {
    lat: lat,
    lng: long,
  };
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const defaultMapOptions = {
    disableDefaultUI: true,
  };

  const getLatAndLong = () => {
    const formattedLocation = props.location.split(" ").join("+");
    if (props.location != "Not Available") {
      const url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        formattedLocation +
        "+Santa+Cruz&key=AIzaSyCw-AslkWVquyIW2A9OUv47I7Rgupu_b70";
      /* make api call to get latitude and longitude of address */
      Axios.get(url).then((response) => {
        console.log(response);
        console.log(response.data.results[0].geometry.location.lat);
        console.log(response.data.results[0].geometry.location.lng);
        setLat(response.data.results[0].geometry.location.lat);
        setLong(response.data.results[0].geometry.location.lng);
      });
    }
  };

  useEffect(() => {
    getLatAndLong();
  }, []);

  /* render map with marker */
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={defaultMapOptions}
      onUnmount={onUnmount}
    >
      <Marker
        position={{ lat: lat, lng: long }}
        onClick={toggleWindow}
      ></Marker>
      {isWindowVisible && (
        <InfoWindow
          position={{
            lat: lat,
            lng: long,
          }}
        >
          <div>
            <img
              src={props.pantryImg}
              style={{ height: 80, width: "auto" }}
            ></img>

            <h3 className="map-pantry-name">{props.name}</h3>

            <p className="map-pantry-location">{props.location}</p>
          </div>
        </InfoWindow>
      )}

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
