import React, { useContext, useEffect } from 'react';
import ol from 'openlayers';
import { SuperMapCloud } from '@supermap/iclient-openlayers';
import { MapContext } from '../context/MapContext';

function MapView() {
    let map = useContext(MapContext);

    useEffect(() => {
        const baseLayer = new ol.layer.Tile({
            source: new SuperMapCloud()
        });
        const vectorLayer = new ol.layer.Vector();
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
