import { Metadata } from "next";
import Form from "./components/Form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import background from '@/app/assets/bg.jpg'
import MapComponent from "./components/MapComponent";
export const metadata: Metadata = {
    title: "Create Event",
};


const CreateEventPage = () => {
    return (
		<div
			style={{
				zIndex: -2,
				backgroundImage: `url(${background.src})`,
				backgroundColor: 'black',
				backgroundSize: 'cover',
				height: 'fit-content',
			}}
		>
			<Navbar />
			<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none   text-white text-center py-6">
				Create an Event
			</h1>
			<div className="flex flex-col md:flex-row justify-between">
				{' '}
				<Form />
				{/* <MapComponent/> */}
			</div>
			<Footer />
		</div>
	)
}

export default CreateEventPage;