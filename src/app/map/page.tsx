import { Metadata } from 'next';
import DynamicMap from '../components/Map/DynamicMap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
    title: "Map",
};    

const MapPage = () => {
    return (
        <div>
            <Navbar />
            {/* <DynamicMap /> */}
            <Footer />
        </div>
    )
}

export default MapPage;
