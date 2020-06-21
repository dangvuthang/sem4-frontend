import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import moment from "moment";
const Map = ({ location }) => {
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
      {location.map(l => (
        <Marker
          key={l.id}
          latitude={l.locationId.latitude}
          longitude={l.locationId.longitude}
        >
          <div className="marker"></div>
        </Marker>
      ))}
      {location.map(l => (
        <Popup
          key={l.id}
          latitude={l.locationId.latitude}
          longitude={l.locationId.longitude}
          closeButton={false}
        >
          <p>
            {moment(l.date).format("DD/MM/YYYY")}: {l.locationId.name}
          </p>
        </Popup>
      ))}
    </ReactMapGL>
  );
};

export default Map;
