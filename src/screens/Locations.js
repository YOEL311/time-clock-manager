import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import { getListLocations } from "../store/actions/locationsActions";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  circle: {
    background: "#d83b01",
    borderRadius: "50%",
    color: "#fff",
    height: "0.7em",
    position: "relative",
    width: "0.7em",
    border: "1px solid transparent",
  },
  circleText: {
    textAlign: "center",
    height: "50%",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
}));

const MyMarker = ({ text, tooltip }) => {
  const styles = useStyles();
  return (
    <div className={styles.circle}>
      <span className={styles.circleText} title={tooltip}>
        {text}
      </span>
    </div>
  );
};

const Locations = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);

  useEffect(() => {
    dispatch(getListLocations());
  }, []);

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };

  return (
    <div style={{ width: "90Vw", height: "90vh" }}>
      <Typography variant="h5">Locations</Typography>
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
        {locations.map(({ lat, lng, id, title }) => {
          return (
            <MyMarker
              key={`${lat}${lng}`}
              lat={lat}
              lng={lng}
              text={id}
              tooltip={title}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Locations;
