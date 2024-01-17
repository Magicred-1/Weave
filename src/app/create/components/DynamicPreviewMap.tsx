// DynamicPreviewMap.js

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ThreeDots } from 'react-loading-icons';
import type { LatLngExpression } from 'leaflet';

interface PreviewComponentProps {
  title: string;
  position: LatLngExpression;
  description: string;
  website: string;
  event: string;
  radius: number;
  color: string;
  showMap: boolean;
}

const DynamicPreviewMap = ({
  title,
  position,
  description,
  website,
  event,
  radius,
  color,
  showMap,
}: PreviewComponentProps) => {
  const Map = useMemo(
    () => dynamic(
        () => import('./PreviewMap/PreviewComponent'),
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
      <Map
        title={title}
        position={position}
        description={description}
        website={website}
        event={event}
        radius={radius}
        color={color}
        showMap={showMap}
      />
    </div>
  );
};

export default DynamicPreviewMap;
