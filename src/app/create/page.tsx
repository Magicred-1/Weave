import { Metadata } from "next";
import background from '@/app/assets/bg.jpg'
import Navbar from "../components/Navbar";
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
				height: '100vh',
			}}
		>
			<Navbar />
		</div>
	)
}

export default CreateEventPage;