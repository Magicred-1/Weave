import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ThreeDots } from 'react-loading-icons';

const DynamicPreviewMap = () => {
    const PreviewMap = useMemo(
        () => dynamic(
            () => import('@/app/create/components/PreviewMap/PreviewComponent'),
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
            <PreviewMap {
                // @ts-ignore
                ...{
                    position: [0, 0],
                    title: 'Title',
                    description: 'Description',
                    website: 'Website',
                    event: 'Event',
                    radius: 400,
                    color: 'red',
                    showMap: true,
                }
            } />
        </div>
    );
}

export default DynamicPreviewMap;
