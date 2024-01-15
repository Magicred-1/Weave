import { Metadata } from 'next';
import DynamicMap from '../components/Map/DynamicMap';
import Footer from '../components/Footer';
// import Footer from '../components/Footer';

export const metadata: Metadata = {
    title: "Map",
};

const MapPage = () => {
    return (
        <div>
            <DynamicMap />
            <Footer />
        </div>
    )
}

export default MapPage;
