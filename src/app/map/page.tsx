import { Metadata } from 'next';
import DynamicMap from '@/components/Map/DynamicMap';

export const metadata: Metadata = {
    title: "Map",
};    

const MapPage = () => {
    return (
        <div>
            <DynamicMap />
        </div>
    )
}

export default MapPage;
