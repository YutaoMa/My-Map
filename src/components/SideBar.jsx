import React from 'react';
import ol from 'openlayers';
import { SuperMapCloud, BaiduMap } from '@supermap/iclient-openlayers';
import { Collapse, Radio } from 'antd';

function SideBar(props) {
    let map = props.map;

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

    let draw = null;

    function changeDraw(e) {
        map.removeInteraction(draw);
        let source = map.getLayers().getArray()[1].getSource();
        switch(e.target.value) {
            case "NONE":
                break;
            default:
                draw = new ol.interaction.Draw({
                    source: source,
                    type: e.target.value
                });
                map.addInteraction(draw);
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
                <Radio.Group buttonStyle="solid" defaultValue="NONE" onChange={changeDraw}>
                    <Radio.Button value="None">无绘制</Radio.Button>
                    <Radio.Button value="Point">点</Radio.Button>
                    <Radio.Button value="LineString">线</Radio.Button>
                    <Radio.Button value="Polygon">多边形</Radio.Button>
                    <Radio.Button value="Circle">圆</Radio.Button>
                </Radio.Group>
            </Collapse.Panel>
        </Collapse>
    );
}

export default SideBar;
