// import supabaseClient from "../../../../lib/supabase";
import type { LatLngExpression } from "leaflet";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
// import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { Marker, Popup, Tooltip } from "react-leaflet";
// import { isUserMarkerInsideMarkerRadius } from "../lib/isUserInsideMarkerRadius";
// import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { Circle, useMap } from "react-leaflet";
import { userIcon, visitorIcon } from "../../../../lib/markerIcons";

interface ConnectedUser {
    image?: string;
    personWalletAddress: `0x${string}`;
    coordinates: LatLngExpression;
    lastConnection?: string;
    online?: boolean;
}

const USER_RADIUS = 100; // in meters
const CHANNEL_NAME = 'Weave'; // for Supabase Realtime channel

export const GetUsersPositions = () => {
    const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
    const [userPosition, setUserPosition] = useState<LatLngExpression>([42, 18]);
    const [visiblePosition, setVisiblePosition] = useState<boolean>(false);

    const { address, isConnected } = useAccount(); 

    const LocationMarker: React.FC<{isConnected: boolean}> = ({ isConnected }) => {
        const map = useMap();

        useEffect(() => {
            const handleLocationFound = (e: any) => {
                setUserPosition([e.latlng.lat, e.latlng.lng]);
                setVisiblePosition(true);
                map.flyTo(e.latlng, map.getZoom());
            }

            const handleLocationError = (e: any) => {
                console.log("You both need to have your wallet connected and your location enabled to be seen by other users.");
                setVisiblePosition(false);
            };

            map
            .locate()
            .on("locationfound", handleLocationFound)
            .on("locationerror", handleLocationError);

        return () => {
            map.off("locationfound", handleLocationFound);
            map.off("locationerror", handleLocationError);
        };
    }, [map, isConnected]);

    return isConnected && visiblePosition ? (
        <div>
          <Marker position={userPosition} riseOnHover={true} icon={userIcon(address || "0x1234567890")}>
            <Tooltip>You are here</Tooltip>
            <Popup>
              <h2>You</h2>
            </Popup>
          </Marker>
          <Circle center={userPosition} radius={USER_RADIUS} color="blue">
            <Tooltip>You are here</Tooltip>
          </Circle>
        </div>
      ) : null;
    };
}