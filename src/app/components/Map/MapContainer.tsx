'use client';

import { 
    MapContainer, 
    Marker, 
    Tooltip, 
    Popup, 
    TileLayer 
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { defaultIcon } from '../../../lib/markerIcons';
// import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
// import Image from 'next/image';
// import { Button } from '@mui/material';
import { MapComponents } from './MapComponents';

export const MapContainerComponent = () => {
    const position: LatLngExpression = [48.8566, 2.3522]; // Paris

    const connectedUsers = [
        {
            personWalletAddress: '0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7',
            image: 'https://api.cloudnouns.com/v1/pfp?text=0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7',
            lastConnection: '2021-08-01',
            coordinates: [52.5200, 13.4050]
        }
    ];

    return (
        <MapContainer 
            center={position} 
            zoom={7}
            minZoom={4}
        >
            <TileLayer
                attribution='Weave &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapComponents />
            
        </MapContainer>
    )
}

export default MapContainerComponent;