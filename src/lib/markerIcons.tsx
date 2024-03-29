import { Icon } from "leaflet";

const nounsIcon = (address: `0x${string}`) => `https://api.cloudnouns.com/v1/pfp?text=${address}`;

export const defaultIcon = new Icon({
    iconUrl: 'https://emerald-impressive-salmon-919.mypinata.cloud/ipfs/QmQYodKkWXSWsfUp8i8vympi8pC4GTqzDxjdtofQgDkmYS',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    className: 'event-marker'
})

export const userIcon = (address: `0x${string}`) => new Icon ({
    iconUrl: nounsIcon(address),
    iconSize: [45, 45],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    className: 'user-marker'
})

export const visitorIcon = (address: `0x${string}`) => new Icon ({
    iconUrl: nounsIcon(address),
    iconSize: [40, 40],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    className: 'visitor-marker'
})

export const eventIcon = (IPFSCID: string) => new Icon ({
    iconUrl: `https://emerald-impressive-salmon-919.mypinata.cloud/ipfs/${IPFSCID}`,
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    className: 'event-marker'
})