import { Metadata } from 'next';
import DynamicMap from '../components/Map/DynamicMap';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
    title: "Map",
};

const MapPage = () => {
    return (
        <div className=" bg-gray-900">
            <Navbar />
            <DynamicMap />
            <Footer />
        </div>
    )
}

export default MapPage;
