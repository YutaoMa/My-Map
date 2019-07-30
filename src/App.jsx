import React, { useState } from 'react';
import ol from 'openlayers';
import MapView from './components/MapView';
import SideBar from './components/SideBar';
import { MapContext } from './context/MapContext';
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './css/ol.css';
import './css/iclient.css';

function App() {
  const map = new ol.Map();

  return (
    <div className="App">
      <MapContext.Provider value={map}>
        <Layout hasSider>
            <Layout.Sider collapsible>
              <SideBar />
            </Layout.Sider>
            <Layout.Content>
              <MapView />
            </Layout.Content>
        </Layout>
      </MapContext.Provider>
    </div>
  );
}

export default App;
