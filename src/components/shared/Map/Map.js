import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
const arrayOfLocation = [
  { latitude: 12.25, longitude: 109.19 },
  { latitude: 15.88, longitude: 108.36 },
  { latitude: 11.95, longitude: 108.44 },
  { latitude: 10.35, longitude: 107.08 },
  { latitude: 10.2, longitude: 103.96 },
  { latitude: 22.34, longitude: 103.84 },
  { latitude: 16.47, longitude: 107.6 },
  { latitude: 10.93, longitude: 108.1 },
];
const Map = props => {
  const [viewport, setViewport] = useState({
    latitude: 16.16667,
    longitude: 107.83333,
    width: "100%",
    height: "50vh",
    zoom: 4.5,
  });
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => setViewport(viewport)}
      mapStyle="mapbox://styles/julian-dang/ck98bvwme03b61ip514msmn7p"
    >
      {arrayOfLocation.map(location => (
        <Marker
          key={location.latitude + location.longitude}
          latitude={location.latitude}
          longitude={location.longitude}
        >
          <div className="marker"></div>
        </Marker>
      ))}
      {arrayOfLocation.map(location => (
        <Popup
          key={location.latitude + location.longitude}
          latitude={location.latitude}
          longitude={location.longitude}
          closeButton={false}
        >
          <p>Day 1: Vung Tau</p>
        </Popup>
      ))}
    </ReactMapGL>
  );
};

export default Map;
