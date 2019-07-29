import React from 'react';
import ol from 'openlayers';
import MapView from './components/MapView';

export const MapContext = React.createContext();

function App() {
  return (
    <div className="App">
      <MapContext.Provider value={new ol.Map()}>
        <MapView />
      </MapContext.Provider>
    </div>
  );
}

export default App;
