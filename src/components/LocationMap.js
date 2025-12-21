"use client";
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const LocationMap = ({ lat, lng }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        if (!lat || !lng) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.openfreemap.org/styles/bright',
            center: [lng, lat],
            zoom: 10
        });

        new maplibregl.Marker({ color: "#ff4757" })
            .setLngLat([lng, lat])
            .addTo(map.current);

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    }, [lat, lng]);

    return (
        <div className="location-map-container" style={{ position: 'relative', height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default LocationMap;
