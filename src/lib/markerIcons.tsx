import { Icon } from "leaflet";

const nounsIcon = (address: `0x${string}`) => `https://api.cloudnouns.com/v1/pfp?text=${address}`;

export const defaultIcon = new Icon({
    iconUrl: '/images/default_marker.svg',
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28]
});

export const userIcon = (address: `0x${string}`) => new Icon ({
    iconUrl: nounsIcon(address),
    iconSize: [50, 50],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    className: 'user-marker'
})

export const visitorIcon = (address: `0x${string}`) => new Icon ({
    iconUrl: nounsIcon(address),
    iconSize: [50, 50],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    className: 'visitor-marker'
})