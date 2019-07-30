import React, { useEffect } from 'react';
import ol from 'openlayers';
import { SuperMapCloud } from '@supermap/iclient-openlayers';

function MapView(props) {
    let map = props.map;

    useEffect(() => {
        const baseLayer = new ol.layer.Tile({
            source: new SuperMapCloud()
        });
        const vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        map.setProperties({
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });
        map.getLayers().insertAt(0, baseLayer);
        map.getLayers().insertAt(1, vectorLayer);
    });

    return (
        <div id="map" />
    );
}

export default MapView;
