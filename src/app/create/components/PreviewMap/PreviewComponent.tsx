"use client";

import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  Circle,
  Tooltip,
  TileLayer,
} from 'react-leaflet';
import { defaultIcon } from '@/lib/markerIcons';
import { Button } from '@mui/material';
import { LatLngExpression } from 'leaflet';

interface PreviewComponentProps {
  title: string;
  position: LatLngExpression;
  description: string;
  website: string;
  event: string;
  radius: number;
  color: string;
  showMap: boolean;
}

const PreviewComponent = ({
  position,
  title,
  description,
  website,
  event,
  radius,
  color,
  showMap,
}: PreviewComponentProps) => {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>(position);
  const [eventName, setEventName] = useState<string>(title);
  const [eventDescription, setEventDescription] = useState<string>(description);
  const [eventWebsite, setEventWebsite] = useState<string>(website);
  const [eventTitle, setEventTitle] = useState<string>(event);
  const [eventRadius, setEventRadius] = useState<number>(radius);
  const [eventColor, setEventColor] = useState<string>(color);

  useEffect(() => {
    setMapPosition(position);
    setEventName(title);
    setEventDescription(description);
    setEventWebsite(website);
    setEventTitle(event);
    setEventRadius(radius);
    setEventColor(color);
  }, [position, title, description, website, event, radius, color]);

  return showMap ? (
    <MapContainer
      center={mapPosition}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={mapPosition} icon={defaultIcon}>
        <Popup>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <p>{eventName}</p>
            </div>
            <div className="flex flex-row">
              <p>{eventDescription}</p>
            </div>
            <div className="flex flex-row">
              <p>
                <a href={eventWebsite} target="_blank" rel="noreferrer">
                  {eventWebsite}
                </a>
              </p>
            </div>
            <div className="flex flex-row">
              <Button color="success">Claim Rewards</Button>
            </div>
          </div>
        </Popup>
        <Tooltip>
          <span>{eventTitle}</span>
        </Tooltip>
      </Marker>
      <Circle
        center={mapPosition}
        radius={eventRadius || 400}
        pathOptions={{ color: eventColor }}
      />
    </MapContainer>
  ) : null;
};

export default PreviewComponent;
