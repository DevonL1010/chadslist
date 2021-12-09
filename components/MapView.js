import {useState} from 'react';

// import { GoogleMap } from 'map-loader';
import {mapsAPI} from '../tempConfig.js'
import {Loader}  from '@googlemaps/js-api-loader';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
const loader = new Loader(mapsAPI);

loader.load().then( () => {
  console.log('Maps JS API Loaded')
})

function displayMap() {
  const mapOptions = {
    center ={ lat: -33.860664, lng: 151.208138 },
    zoom: 14
  }
}




const MapView = (props) => {
  const [list, setList] = useState(false);

  return (
    <div> Maps View here

    </div>
  )
}

export default MapView;