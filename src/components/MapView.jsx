import React, { Component } from 'react';
import ol from 'openlayers';
import { SuperMapCloud } from '@supermap/iclient-openlayers';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: new ol.Map()
        };
    }

    componentDidMount() {
        this.state.map.setProperties({
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });
        let layer = new ol.layer.Tile({
            source: new SuperMapCloud()
        });
        this.state.map.addLayer(layer);
    }

    render() {
        return <div id="map" />;
    }
}

export default MapView;
