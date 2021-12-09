import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import NaviBar from '../components/NaviBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from '../components/Filter.js';
import { useState } from 'react';

const HomePage = (props) => {
  const [view, setView] = useState('list');
  const [isClick, setIsClick] = useState(false);

  const ChangeView = (input) => {
    setView(input);
  }

  const handleClick = () => {
    setIsClick(!isClick);
  }

  return (
    <div>
      Welcome back to Next.js!
      <NaviBar />
      <button  onClick={() => handleClick()}>filter</button>
      {isClick? <Filter/>:<></>}
      {view === 'list' ? <p onClick={() => ChangeView('map')}>Show Map</p> : <p onClick={() => ChangeView('list')}>Show List</p>}
      {view === 'map' && <MapView />}
      {view === 'list' && <ListView />}
    </div>
  )
}

export default HomePage;