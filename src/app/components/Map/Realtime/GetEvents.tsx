import React, { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { Marker, Popup, Circle, Tooltip, useMap } from 'react-leaflet';
import { Button } from '@mui/material';
import { isUserMarkerInsideMarkerRadius } from '../isUserInsideMarkerRadius';
import { eventIcon } from '../../../../lib/markerIcons';

export interface Events {
    id: string;
    name: string;
    image: string;
    description: string;
    startDate: string;
    endDate: string;
    website: string;
    maxParticipants: number;
    venueAddress: string;
    coordinates: LatLngExpression;
    radius: number;
    radiusColor: string;
}

// Pass the Events array as a prop to this component
export const GetEvents = ({ events }: { events: Events[] }) => {
  const [userPosition, setUserPosition] = useState<LatLngExpression>([42, 18]);
  
  const map = useMap();

  useEffect(() => {
    const handleLocationFound = (e: any) => {
        setUserPosition([e.latlng.lat, e.latlng.lng]);
    };

    const handleLocationError = (e: any) => {
        console.log(
            'You need to have your wallet connected and your location enabled to use the map.'
        );
        setUserPosition([0, 0]);
    };

    const handleMapClick = (e: any) => {
        console.log(e.latlng);
    };

    map
        .locate()
        .on('locationfound', handleLocationFound)
        .on('locationerror', handleLocationError)
        .on('click', handleMapClick);

    return () => {
        // Clean up event listeners when component unmounts
        if (map) {
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);
            map.off('click', handleMapClick);
        }
    };
  }, [map]);

  return (
    <>
    {events.map((event: Events, index: number) => (
        <div key={index}>
            <Marker key={index} position={event.coordinates} icon={eventIcon("test")} riseOnHover={true}>
                <Popup>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <img src={events[index].image} alt={events[index].name} />
                        </div>
                        <div className="flex flex-row">
                            <p>
                                {events[index].name}
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <p>
                                {events[index].description}
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <p>
                                <a href={events[index].website} target="_blank" rel="noreferrer"> {events[index].website} </a>
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <p>
                                {"Address : " + events[index].venueAddress}
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <p>
                                {"Dates : " + events[index].startDate + ' - ' + events[index].endDate}
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <p>
                                {"Max participants : " + events[index].maxParticipants}
                            </p>
                        </div>
                        <div className="flex flex-row">
                            {
                                <Button 
                                    color='success'
                                    variant='contained'
                                    disabled={
                                        !isUserMarkerInsideMarkerRadius
                                        (
                                            userPosition, 
                                            event.coordinates, 
                                            event.radius || 400
                                        )
                                    }>
                                    Claim Points
                                </Button>
                            }
                        </div>
                    </div>
                </Popup>
                <Circle key={index} center={event.coordinates} radius={event.radius} color='green'>
                    <Tooltip>{event.name}</Tooltip>
                </Circle>
            </Marker>
        </div>
    ))}
    </>
    );
};