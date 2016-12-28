import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

const API_KEY = 'AIzaSyCEaCNFxgZ28-vG-ofUccVdqAUhVGRot7c';

export default (props) => (
  <GoogleMapLoader
    containerElement={
      <div style={{
          height: "100%",
        }}
      />
    }
    googleMapElement={
      <GoogleMap
        bootstrapURLKeys={{ key: API_KEY }}
        defaultZoom={12}
        defaultCenter={{ lat: props.lat, lng: props.lon }}
      />
    }
  />
);