import { Metadata } from 'next';
import DynamicMap from '../components/Map/DynamicMap';
import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

export const metadata: Metadata = {
    title: "Map",
};

const MapPage = () => {
    return (
        <>
            {/* <Navbar /> */}
            <DynamicMap />
            <Footer />
        </>
    )
}

export default MapPage;
