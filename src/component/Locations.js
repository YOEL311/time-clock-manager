/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";

import "./map.css";

const useStyles = makeStyles((theme) => ({
  TextField: {
    margin: 20,
  },
}));

const MyMarker = ({ text, tooltip }) => (
  <div className="circle">
    <span className="circleText" title={tooltip}>
      {text}
    </span>
  </div>
);

const Locations = () => {
  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };

  const points = [
    { id: "yoel", title: "Round Pond", lat: 32, lng: 35 },
    { id: 2, title: "The Long Water", lat: 32.2, lng: 34.8 },
    { id: 3, title: "The Serpentine", lat: 32.4, lng: 35.2 },
  ];

  return (
    <div style={{ width: "80Vw", height: "80vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_API_MAP_KEY,
          language: "il",
          region: "IL",
        }}
        defaultCenter={{ lat: 32, lng: 35 }}
        defaultZoom={8}
        distanceToMouse={distanceToMouse}
      >
        {points.map(({ lat, lng, id, title }) => {
          return (
            <MyMarker key={id} lat={lat} lng={lng} text={id} tooltip={title} />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Locations;
