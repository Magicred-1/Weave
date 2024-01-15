import supabaseClient from "../../../../lib/supabase";
import type { LatLngExpression } from "leaflet";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { Marker, Popup, Tooltip } from "react-leaflet";
import { isUserMarkerInsideMarkerRadius } from "../isUserInsideMarkerRadius";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { Circle, useMap } from "react-leaflet";
import { userIcon, visitorIcon } from "../../../../lib/markerIcons";
import moment from "moment";
import { Button } from '@mui/material';

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

    const handleBroadcast = (data: any) => {
        setConnectedUsers((prev) => {
          const userExists = prev.some((user) => user.personWalletAddress === data.payload.personWalletAddress);
          if (!userExists) {
            console.log(`${data.payload.personWalletAddress} has joined the chat`);
            return [...prev, data.payload];
          }
          return prev;
        });
      };
    
      useEffect(() => {
        const myChannel = supabaseClient.channel(CHANNEL_NAME, {
          config: { broadcast: { ack: true } },
        });
    
        myChannel.on("broadcast", { event: "connectedUser" }, (payload: any) => handleBroadcast(payload));
    
        myChannel.subscribe((status: `${REALTIME_SUBSCRIBE_STATES}`) => {
          if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
            if (isConnected && address) {         
              myChannel.send({
                type: "broadcast",
                event: "connectedUser",
                payload: {
                  image: `https://api.cloudnouns.com/v1/pfp?text=${address}`,
                  personWalletAddress: address,
                  coordinates: userPosition,
                  lastConnection: moment().format("MMMM Do YYYY, h:mm:ss a"),
                },
              });
            }
          }
        });
      }, [userPosition, isConnected, address]);

      return (
        <>
          <MarkerClusterGroup>
            {connectedUsers.map((connectedUser, index) => (
              <Marker key={index} position={connectedUser.coordinates} icon={visitorIcon(connectedUser.personWalletAddress)}>
                <Tooltip>{connectedUser.personWalletAddress}</Tooltip>
                <Popup>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <p className="rounded-full">
                        <img src={connectedUsers[index].image} alt="user-profile" width={80} height={80} />
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <p>Wallet Address : {connectedUsers[index].personWalletAddress}</p>
                    </div>
                    <div className="flex flex-row">
                      <p>Last Connection : {connectedUsers[index].lastConnection}</p>
                    </div>
                    <div className="flex flex-row">
                    <Button 
                        variant="contained" 
                        color="primary"
                        disabled={!isUserMarkerInsideMarkerRadius(userPosition, connectedUser.coordinates, USER_RADIUS)}
                      >
                        Send Message
                    </Button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          <LocationMarker isConnected={isConnected} />
        </>
      );
};
