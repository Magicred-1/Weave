import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ThreeDots } from 'react-loading-icons';

const DynamicMap = () => {
    const Map = useMemo(
        () => dynamic(
            () => import('../../components/Map/MapContainer'),
            {
                loading: () => (
                    <div className="flex justify-center items-center h-screen">
                        <div className="bg-white p-6 rounded-lg shadow-md max-h-96">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p className="mt-4 text-sm text-black-600 text-center">
                                <ThreeDots stroke="#000" />
                                Loading...
                            </p>
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
