import React, { useEffect } from 'react';
import ol from 'openlayers';
import { SuperMapCloud } from '@supermap/iclient-openlayers';

function MapView(props) {
    let map = props.map;

    useEffect(() => {
        const baseLayer = new ol.layer.Tile({
            source: new SuperMapCloud()
        });
        const markerLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        const featureLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        map.setProperties({
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });
        map.addControl(new ol.control.ZoomSlider());
        map.addControl(new ol.control.OverviewMap());
        map.getLayers().insertAt(0, baseLayer);
        map.getLayers().insertAt(1, markerLayer);
        map.getLayers().insertAt(2, featureLayer);
    });

    return (
        <div id="map" />
    );
}

export default MapView;
