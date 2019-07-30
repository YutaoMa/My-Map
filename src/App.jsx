import React from 'react';
import ol from 'openlayers';
import MapView from './components/MapView';
import SideBar from './components/SideBar';
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './css/ol.css';
import './css/iclient.css';

function App() {
  const map = new ol.Map();

  return (
    <div className="App">
      <Layout hasSider>
          <Layout.Sider collapsible>
            <SideBar map={map} />
          </Layout.Sider>
          <Layout.Content>
            <MapView map={map} />
          </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
