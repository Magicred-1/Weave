import L, { LatLngExpression } from 'leaflet';

export const isUserMarkerInsideMarkerRadius = (userPosition: LatLngExpression, markerPosition: LatLngExpression, radius: number | undefined) => {
    const distance = L.latLng(userPosition).distanceTo(L.latLng(markerPosition));
    
    if (radius) {
        return distance <= radius;
    }
}