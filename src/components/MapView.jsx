import React, { useEffect } from 'react';
import ol from 'openlayers';
import { SuperMapCloud } from '@supermap/iclient-openlayers';

function MapView(props) {
    let map = props.map;

    useEffect(() => {
        const baseLayer = new ol.layer.Tile({
            source: new SuperMapCloud(),
            projection: "EPSG:3857"
        });
        const markerLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            projection: "EPSG:3857"
        });
        const featureLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            projection: "EPSG:3857"
        });
        const measureLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            projection: "EPSG:3857"
        });
        map.setProperties({
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 3,
                projection: "EPSG:3857"
            })
        });
        map.addControl(new ol.control.ZoomSlider());
        map.addControl(new ol.control.OverviewMap());
        map.getLayers().insertAt(0, baseLayer);
        map.getLayers().insertAt(1, markerLayer);
        map.getLayers().insertAt(2, featureLayer);
        map.getLayers().insertAt(3, measureLayer);
    });

    return (
        <div id="map" />
    );
}

export default MapView;
