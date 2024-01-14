import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = () => {
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map/MapContainer'),
        { 
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
        ), [])

    return <div>
    <Map />
    </div>
}

export default DynamicMap;