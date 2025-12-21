"use client";
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const iso2to3 = {
    'AF': 'AFG', 'AL': 'ALB', 'DZ': 'DZA', 'AR': 'ARG', 'AM': 'ARM', 'AU': 'AUS', 'AT': 'AUT', 'AZ': 'AZE',
    'BS': 'BHS', 'BH': 'BHR', 'BD': 'BGD', 'BY': 'BLR', 'BE': 'BEL', 'BZ': 'BLZ', 'BJ': 'BEN', 'BT': 'BTN',
    'BO': 'BOL', 'BA': 'BIH', 'BW': 'BWA', 'BR': 'BRA', 'BG': 'BGR', 'BF': 'BFA', 'BI': 'BDI', 'KH': 'KHM',
    'CM': 'CMR', 'CA': 'CAN', 'CV': 'CPV', 'CF': 'CAF', 'TD': 'TCD', 'CL': 'CHL', 'CN': 'CHN', 'CO': 'COL',
    'KM': 'COM', 'CG': 'COG', 'CD': 'COD', 'CR': 'CRI', 'HR': 'HRV', 'CU': 'CUB', 'CY': 'CYP', 'CZ': 'CZE',
    'DK': 'DNK', 'DJ': 'DJI', 'DM': 'DMA', 'DO': 'DOM', 'EC': 'ECU', 'EG': 'EGY', 'SV': 'SLV', 'GQ': 'GNQ',
    'ER': 'ERI', 'EE': 'EST', 'ET': 'ETH', 'FJ': 'FJI', 'FI': 'FIN', 'FR': 'FRA', 'GA': 'GAB', 'GM': 'GMB',
    'GE': 'GEO', 'DE': 'DEU', 'GH': 'GHA', 'GR': 'GRC', 'GD': 'GRD', 'GT': 'GTM', 'GN': 'GIN', 'GW': 'GNB',
    'GY': 'GUY', 'HT': 'HTI', 'HN': 'HND', 'HU': 'HUN', 'IS': 'ISL', 'IN': 'IND', 'ID': 'IDN', 'IR': 'IRN',
    'IQ': 'IRQ', 'IE': 'IRL', 'IL': 'ISR', 'IT': 'ITA', 'JM': 'JAM', 'JP': 'JPN', 'JO': 'JOR', 'KZ': 'KAZ',
    'KE': 'KEN', 'KP': 'PRK', 'KR': 'KOR', 'KW': 'KWT', 'KG': 'KGZ', 'LA': 'LAO', 'LV': 'LVA', 'LB': 'LBN',
    'LS': 'LSO', 'LR': 'LBR', 'LY': 'LBY', 'LI': 'LIE', 'LT': 'LTU', 'LU': 'LUX', 'MK': 'MKD', 'MG': 'MDG',
    'MW': 'MWI', 'MY': 'MYS', 'MV': 'MDV', 'ML': 'MLI', 'MT': 'MLT', 'MR': 'MRT', 'MU': 'MUS', 'MX': 'MEX',
    'FM': 'FSM', 'MD': 'MDA', 'MC': 'MCO', 'MN': 'MNG', 'ME': 'MNE', 'MA': 'MAR', 'MZ': 'MOZ', 'MM': 'MMR',
    'NA': 'NAM', 'NP': 'NPL', 'NL': 'NLD', 'NZ': 'NZL', 'NI': 'NIC', 'NE': 'NER', 'NG': 'NGA', 'NO': 'NOR',
    'OM': 'OMN', 'PK': 'PAK', 'PW': 'PLW', 'PA': 'PAN', 'PG': 'PNG', 'PY': 'PRY', 'PE': 'PER', 'PH': 'PHL',
    'PL': 'POL', 'PT': 'PRT', 'QA': 'QAT', 'RO': 'ROU', 'RU': 'RUS', 'RW': 'RWA', 'KN': 'KNA', 'LC': 'LCA',
    'VC': 'VCT', 'WS': 'WSM', 'SM': 'SMR', 'ST': 'STP', 'SA': 'SAU', 'SN': 'SEN', 'RS': 'SRB', 'SC': 'SYC',
    'SL': 'SLE', 'SG': 'SGP', 'SK': 'SVK', 'SI': 'SVN', 'SB': 'SLB', 'SO': 'SOM', 'ZA': 'ZAF', 'SS': 'SSD',
    'ES': 'ESP', 'LK': 'LKA', 'SD': 'SDN', 'SR': 'SUR', 'SZ': 'SWZ', 'SE': 'SWE', 'CH': 'CHE', 'SY': 'SYR',
    'TW': 'TWN', 'TJ': 'TJK', 'TZ': 'TZA', 'TH': 'THA', 'TL': 'TLS', 'TG': 'TGO', 'TO': 'TON', 'TT': 'TTO',
    'TN': 'TUN', 'TR': 'TUR', 'TM': 'TKM', 'TV': 'TUV', 'UG': 'UGA', 'UA': 'UKR', 'AE': 'ARE', 'GB': 'GBR',
    'US': 'USA', 'UY': 'URY', 'UZ': 'UZB', 'VU': 'VUT', 'VE': 'VEN', 'VN': 'VNM', 'YE': 'YEM', 'ZM': 'ZMB',
    'ZW': 'ZWE'
};

const WorldMap = ({ countries = [] }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const visitedIso3 = React.useMemo(() => {
        return countries.map(country => {
            const code = country.code || '';
            const upperCode = code.toUpperCase().trim();
            return iso2to3[upperCode] || upperCode;
        }).filter(Boolean);
    }, [countries]);

    useEffect(() => {
        if (map.current) return; // stops map from initializing more than once

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: {
                version: 8,
                projection: {
                    type: 'globe'
                },
                sources: {
                    'world-borders': {
                        type: 'geojson',
                        data: { type: 'FeatureCollection', features: [] } // Start empty
                    }
                },
                layers: [
                    {
                        id: 'countries-fill',
                        type: 'fill',
                        source: 'world-borders',
                        paint: {
                            'fill-color': [
                                'case',
                                ['in', ['get', 'iso3'], ['literal', visitedIso3]],
                                '#ff6b6b',     // Highlight Color (Salmon Red)
                                '#ffffff'      // Default Color (White)
                            ],
                            'fill-outline-color': '#d1d1d1',
                            'fill-opacity': 1
                        }
                    },
                    {
                        id: 'countries-highlight', // Hover layer
                        type: 'fill',
                        source: 'world-borders',
                        paint: {
                            'fill-color': '#ff4757',
                            'fill-opacity': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                1, 0
                            ]
                        }
                    }
                ]
            },
            center: [10, 50],
            zoom: 2.6,
            scrollZoom: false,
            doubleClickZoom: false
        });

        map.current.on('load', () => {
            fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
                .then(res => res.json())
                .then(data => {
                    // Inject ID into properties so we can safely access it
                    data.features = data.features.map(f => {
                        f.properties.iso3 = f.id;
                        return f;
                    });

                    const source = map.current.getSource('world-borders');
                    if (source) {
                        source.setData(data);
                    }
                })
                .catch(err => console.error("Error loading map data:", err));
        });

    }, [visitedIso3]);

    return (
        <section className="world-map-section" style={{ position: 'relative', height: '800px', width: '100%' }}>
            <div ref={mapContainer} style={{ width: '100%', height: '100%', background: '#f0f5f9' }} />
        </section>
    );
};

export default WorldMap;