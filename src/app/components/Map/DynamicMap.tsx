import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = () => {
    const Map = useMemo(
        () => dynamic(
            () => import('../../components/Map/MapContainer'),
            { 
                loading: () => (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '300px'
                    }}>
                        <div>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                ),
                ssr: false
            }
        ),
        []
    );
    
    return <div>
        <Map />
    </div>
}

export default DynamicMap;
