import React, { useContext } from 'react';
import ol from 'openlayers';
import { SuperMapCloud, BaiduMap } from '@supermap/iclient-openlayers';
import { MapContext } from '../context/MapContext';
import { Collapse, Radio } from 'antd';

function SideBar() {
    let map = useContext(MapContext);

    function changeBaseMap(e) {
        map.getLayers().removeAt(0);
        switch (e.target.value) {
            case "SuperMapCloud":
                map.getLayers().insertAt(0, new ol.layer.Tile({
                    source: new SuperMapCloud()
                }));
                break;
            case "BaiduMap":
                map.getLayers().insertAt(0, new ol.layer.Tile({
                    source: new BaiduMap()
                }));
                break;
            case "OSM":
                map.getLayers().insertAt(0, new ol.layer.Tile({
                    source: new ol.source.OSM()
                }));
                break;
            default:
                break;
        }
    }

    return (
        <Collapse>
            <Collapse.Panel header="切换底图">
                <Radio.Group buttonStyle="solid" defaultValue="SuperMapCloud" onChange={changeBaseMap}>
                    <Radio.Button value="SuperMapCloud">高德地图</Radio.Button>
                    <Radio.Button value="BaiduMap">百度地图</Radio.Button>
                    <Radio.Button value="OSM">OpenStreetMap</Radio.Button>
                </Radio.Group>
            </Collapse.Panel>
            <Collapse.Panel header="标注">
            </Collapse.Panel>
        </Collapse>
    );
}

export default SideBar;
