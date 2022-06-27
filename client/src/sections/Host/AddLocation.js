import React, { useEffect, useRef } from "react";
import ReactMapGl, {
  Marker,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import { Box } from "@mui/material";
import { useValue } from "../Home/components/context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "./Geocoder";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();
  const mapRef = useRef();

  useEffect(() => {
    if (!lng && !lat) {
      fetch("https://ipapi.co/json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          dispatch({
            type: "UPDATE_LOCATION",
            payload: { lng: data.longitude, lat: data.latitude },
          });
        });
    }
  });

  return (
    <Box sx={{ height: 400, position: "relative" }}>
      <ReactMapGl
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoiYXJ0ZW1wdXN0b3ZvaXQiLCJhIjoiY2wwcDJza3F4MXU2ODNibTk1emd1MGRrMCJ9.EatApQyQ8v8siTEoggPzJQ"
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
            })
          }
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.coords.longitude, lat: e.coords.latitude },
            })
          }
        />
        <Geocoder />
      </ReactMapGl>
    </Box>
  );
};

export default AddLocation;
