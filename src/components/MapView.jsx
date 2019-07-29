import React, { useContext, useEffect } from 'react';
import ol from 'openlayers';
import { SuperMapCloud } from '@supermap/iclient-openlayers';
import { MapContext } from '../App';

function MapView() {

    const map = useContext(MapContext);

    useEffect(() => {
        let layer = new ol.layer.Tile({
            source: new SuperMapCloud()
        });
        map.setProperties({
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });
        map.addLayer(layer);
    });

    return (
        <div id="map" />
    );
}

export default MapView;
