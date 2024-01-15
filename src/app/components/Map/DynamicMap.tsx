import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = () => {
    const Map = useMemo(
        () => dynamic(
            () => import('../../components/Map/MapContainer'),
            {
                loading: () => (
                    <div className="flex justify-center items-center h-300px">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-600">Loading...</p>
                        </div>
                    </div>
                ),
                ssr: false
            }
        ),
        []
    );

    return (
        <div>
            <Map />
        </div>
    );
}

export default DynamicMap;
