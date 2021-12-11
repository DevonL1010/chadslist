import React from 'react'
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

//TODO: Remove after real/formatted data is provided
//SampleTest data for showing markers
const items = [
  {
    name: 'Space Needle',
    coordinates: { lat: 47.6205, lng: -122.3493 },
  },
  {
    name: "Cal Anderson Park",
    coordinates: { lat: 47.6173, lng: -122.3195 },
  },
]


function MapView(props) {

  //Current Place holder data
  const position = { lat: 47.61483, lng: -122.3146 }
  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: 47.6253,
    lng: -122.3222
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.mapAPI}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      {items.map( (item, index) => {
        return (
          <Marker
            onLoad={onLoad}
            position={item.coordinates}
            key={index}
          />
        )
      })}

      </GoogleMap>
    </LoadScriptNext>
  )
}

export default MapView