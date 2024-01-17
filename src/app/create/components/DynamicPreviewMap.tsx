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
  const PreviewComponent = useMemo(
    () =>
      dynamic(() => import('@/app/create/components/PreviewMap/PreviewComponent')),
    []
  );

  return (
    <div>
      <PreviewComponent
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
