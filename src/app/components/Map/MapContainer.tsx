'use client';

import { 
    MapContainer, 
    Marker, 
    Tooltip, 
    Popup, 
    TileLayer 
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { defaultIcon, userIcon, visitorIcon } from '../../../lib/markerIcons';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import Image from 'next/image';
import { Button } from '@mui/material';

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
        
            <MarkerClusterGroup>
                <Marker position={position} icon={defaultIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={[48.8566, 2.3522]} icon={userIcon('0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7')}>
                    <Tooltip>Me!</Tooltip>
                </Marker>
                <Marker position={[52.5200, 13.4050]} icon={visitorIcon('0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7')}>
                    <Popup>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <p className="rounded-full">
                                <Image src={connectedUsers[0].image} alt="user image" width={50} height={50} />
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <p>Wallet Address : {connectedUsers[0].personWalletAddress}</p>
                        </div>
                        <div className="flex flex-row">
                            <p>Last Connection : {connectedUsers[0].lastConnection}</p>
                        </div>
                        <div className="flex flex-row">
                            <Button variant="contained" color="primary">Send Message</Button>
                        </div>
                    </div>
                    </Popup>
                </Marker>
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default MapContainerComponent;