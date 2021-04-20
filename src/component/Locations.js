import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Card,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@material-ui/core";
// import { getData } from "../store/actions";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GoogleMapReact from "google-map-react";

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
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const style = useStyles();

  useEffect(() => {
    // dispatch(getData());
  }, []);

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };

  const points = [
    { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
    { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
    { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 },
  ];

  return (
    // <Grid>
    // <Container>
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
        {/* {points.map(({ lat, lng, id, title }) => {
          return (
            <MyMarker key={id} lat={lat} lng={lng} text={id} tooltip={title} />
          );
        })} */}
      </GoogleMapReact>
    </div>
  );
  {
    /* </Container> */
  }
};

export default Locations;
