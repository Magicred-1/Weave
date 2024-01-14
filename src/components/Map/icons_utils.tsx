import { Icon } from "leaflet";

const nounsIcon = (address: `0x${string}`) => `https://api.adorable.io/avatars/41/${address}.png`;

export const defaultIcon = new Icon({
    iconUrl: '/images/default_marker.svg',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28]
});

export const userIcon = (address: `0x${string}`) => new Icon ({
    iconUrl: nounsIcon(address),
    iconSize: [41, 41],
    iconAnchor: [12.5, 41],
     // center it
    popupAnchor: [0, -41]
})