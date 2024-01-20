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
import { WeaveABI } from "../../abis";
import { useContractRead } from "wagmi";

interface ConnectedUser {
    image?: string;
    username?: string;
    personWalletAddress: `0x${string}`;
    coordinates: LatLngExpression;
    lastConnection?: string;
    online?: boolean;
}


const USER_RADIUS = 400; // in meters
const CHANNEL_NAME = 'Weave'; // for Supabase Realtime channel

export const GetUsersPositions = () => {
    const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
    const [userPosition, setUserPosition] = useState<LatLngExpression>([42, 18]);
    const [visiblePosition, setVisiblePosition] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { address, isConnected } = useAccount();

    const {
      data: onboardingData,
      error,
      isLoading: contractReadLoading,
    } = useContractRead({
      abi: WeaveABI,
      functionName: 'getUsername',
      address: "0x5f856baB0F63a833b311fC9d853a14c8762d583d",
      args: address && [address],
    })
    console.log('Read contract data and error', onboardingData)

    const sendMessages = (messageContent: string, recipientAddress: `0x${string}`) => {
        fetch("/api/chats", {
          method: "POST",
          body: JSON.stringify({
            recipientAddress,
            messageContent,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log("error", err));
    }

    const LocationMarker: React.FC<{isConnected: boolean}> = ({ isConnected }) => {
        const map = useMap();

        useEffect(() => {
            const handleLocationFound = (e: any) => {
                setUserPosition([e.latlng.lat, e.latlng.lng]);
                setVisiblePosition(true);
            }

            const handleLocationError = (e: any) => {
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
            console.log(`${data.payload.personWalletAddress} has joined Weave!`);
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
                  username: onboardingData ? onboardingData : 'Anonymous',
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
                      <h2>{connectedUsers[index].username}</h2>
                    </div>
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
                    {isUserMarkerInsideMarkerRadius(userPosition, connectedUser.coordinates, USER_RADIUS) ? (
                      <>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <Button 
                          variant="contained" 
                        
                          onClick={() => sendMessages(message, connectedUser.personWalletAddress)}
                         /> 
                      </>
                  ) :
                  (
                    <Button 
                      variant="contained" 
                      color="primary"
                      disabled={!isUserMarkerInsideMarkerRadius(userPosition, connectedUser.coordinates, USER_RADIUS)}
                    >
                      You need to be closer to send a first message
                  </Button>
                  )}
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
