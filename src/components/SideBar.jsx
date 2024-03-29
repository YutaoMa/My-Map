import React from 'react';
import ol from 'openlayers';
import { SuperMapCloud, BaiduMap, AddressMatchService, GeoCodingParameter, MeasureParameters, MeasureService } from '@supermap/iclient-openlayers';
import { Collapse, Radio, Input, Select, Switch, message } from 'antd';

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
            case "None":
                break;
            case "Clear":
                source.clear();
                message.info('标注层已清除');
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

    let searchArea = "北京市";
    let addressUrl = "http://support.supermap.com.cn:8090/iserver/services/addressmatch-Address/restjsr/v1/address";
    let addressMatchService = new AddressMatchService(addressUrl);

    function searchAddress(value) {
        let geoCodeParam = new GeoCodingParameter({
            address: value,
            filters: searchArea,
            prjCoordSys: "{epsgcode:3857}",
            maxReturn: 1
        });
        addressMatchService.code(geoCodeParam, (res) => {
            let source = map.getLayers().getArray()[2].getSource();
            source.clear();
            if (res.result != null && res.result.length > 0) {
                let location = res.result[0].location;
                let coordinate = [location.x, location.y];
                let feature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinate)
                });
                feature.setStyle(new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(37, 241, 239, 0.2)'
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#e81818'
                        })
                    }),
                    zIndex: 20
                }));
                source.addFeature(feature);
                map.getView().setCenter(coordinate);
                map.getView().setZoom(12);
            } else {
                message.error('没有找到该地址！');
            }
        });
    }

    function changeSearchArea(value) {
        searchArea = value;
    }

    function changeFeatureLayer() {
        let featureLayer = map.getLayers().getArray()[2];
        let current = featureLayer.getVisible();
        featureLayer.setVisible(!current);
    }

    function changeMarkerLayer() {
        let markerLayer = map.getLayers().getArray()[1];
        let current = markerLayer.getVisible();
        markerLayer.setVisible(!current);
    }

    function changeBaseLayer() {
        let baseLayer = map.getLayers().getArray()[0];
        let current = baseLayer.getVisible();
        baseLayer.setVisible(!current);
    }

    function changeMeasureLayer() {
        let measureLayer = map.getLayers().getArray()[3];
        let current = measureLayer.getVisible();
        measureLayer.setVisible(!current);
    }

    let measureUrl = "http://support.supermap.com.cn:8090/iserver/services/map-world/rest/maps/World";
    let measureFeature = null;

    function changeMeasure(e) {
        map.removeInteraction(draw);
        let source = map.getLayers().getArray()[3].getSource();
        source.clear();

        switch (e.target.value) {
            case "None":
                break;
            case "LineString":
                draw = new ol.interaction.Draw({
                    source: source,
                    type: "LineString"
                });
                draw.on('drawstart', (evt) => {
                    measureFeature = evt.feature;
                });
                draw.on('drawend', () => {
                    let distanceMeasureParam = new MeasureParameters(measureFeature.getGeometry(), {
                        prjCoordSys: 'EPSG:3857'
                    });
                    new MeasureService(measureUrl).measureDistance(distanceMeasureParam, (res) => {
                        if (res.result.succeed) {
                            message.info(res.result.distance + "米");
                        }
                    });
                });
                map.addInteraction(draw);
                break;
            case "Polygon":
                    draw = new ol.interaction.Draw({
                        source: source,
                        type: "Polygon"
                    });
                    draw.on('drawstart', (evt) => {
                        measureFeature = evt.feature;
                    });
                    draw.on('drawend', () => {
                        let distanceMeasureParam = new MeasureParameters(measureFeature.getGeometry(), {
                            prjCoordSys: 'EPSG:3857'
                        });
                        new MeasureService(measureUrl).measureArea(distanceMeasureParam, (res) => {
                            if (res.result.succeed) {
                                message.info(res.result.area + "平方米");
                            }                            
                        });
                    });
                    map.addInteraction(draw);
                break;
            default:
                break;
        }
    }

    return (
        <Collapse>
            <Collapse.Panel header="图层开关">
                <Switch defaultChecked checkedChildren="测量" unCheckedChildren="测量" onChange={changeMeasureLayer} />
                <Switch defaultChecked checkedChildren="搜索" unCheckedChildren="搜索" onChange={changeFeatureLayer} />
                <Switch defaultChecked checkedChildren="标注" unCheckedChildren="标注" onChange={changeMarkerLayer} />
                <Switch defaultChecked checkedChildren="底图" unCheckedChildren="底图" onChange={changeBaseLayer} />
            </Collapse.Panel>
            <Collapse.Panel header="切换底图">
                <Radio.Group buttonStyle="solid" defaultValue="SuperMapCloud" onChange={changeBaseMap}>
                    <Radio.Button value="SuperMapCloud">超图云</Radio.Button>
                    <Radio.Button value="BaiduMap">百度地图</Radio.Button>
                    <Radio.Button value="OSM">OpenStreetMap</Radio.Button>
                </Radio.Group>
            </Collapse.Panel>
            <Collapse.Panel header="标注">
                <Radio.Group buttonStyle="solid" defaultValue="None" onChange={changeDraw}>
                    <Radio.Button value="None">无绘制</Radio.Button>
                    <Radio.Button value="Point">点</Radio.Button>
                    <Radio.Button value="LineString">线</Radio.Button>
                    <Radio.Button value="Polygon">多边形</Radio.Button>
                    <Radio.Button value="Circle">圆</Radio.Button>
                    <Radio.Button value="Clear">清除标注</Radio.Button>
                </Radio.Group>
            </Collapse.Panel>
            <Collapse.Panel header="地址匹配">
                <Select defaultValue="北京市" onChange={changeSearchArea}>
                    <Select.Option value="北京市">北京市</Select.Option>
                </Select>
                <Input.Search placeholder="中文地址" onSearch={searchAddress} />
            </Collapse.Panel>
            <Collapse.Panel header="测量">
                <Radio.Group buttonStyle="solid" defaultValue="None" onChange={changeMeasure}>
                    <Radio.Button value="None">无测量</Radio.Button>
                    <Radio.Button value="LineString">距离</Radio.Button>
                    <Radio.Button value="Polygon">面积</Radio.Button>
                </Radio.Group>
            </Collapse.Panel>
        </Collapse>
    );
}

export default SideBar;
