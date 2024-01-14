'use client';

import { MapContainer, Marker, Tooltip, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { defaultIcon, userIcon, visitorIcon } from '../../lib/markerIcons';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';

export const MapContainerComponent = () => {
    const position: LatLngExpression = [48.8566, 2.3522]; // Paris
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
        
            <MarkerClusterGroup>
                <Marker position={position} icon={defaultIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={[48.8566, 2.3522]} icon={userIcon('0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7')}>
                    <Tooltip>
                        That's me!
                    </Tooltip>
                </Marker>
                <Marker position={[52.5200, 13.4050]} icon={visitorIcon('0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7')}>
                    <Popup>
                        Here's a other visitor!
                    </Popup>
                </Marker>
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default MapContainerComponent;