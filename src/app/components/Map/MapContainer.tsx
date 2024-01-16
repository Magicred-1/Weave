'use client';

import { 
    MapContainer,
    TileLayer 
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { MapComponents } from './MapComponents';

export const MapContainerComponent = () => {
    const position: LatLngExpression = [48.8566, 2.3522]; // Paris

    return (
        <>
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
        </>
    );
}

export default MapContainerComponent;