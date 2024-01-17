
import { Metadata } from 'next'
import Navbar from '../components/Navbar'
import background from '@/app/assets/bg.jpg'
import DynamicMap from '../components/Map/DynamicMap'

export const metadata: Metadata = {
	title: 'Map',
}

const MapPage = () => {
	return (
		<>
			<div
				style={{
					zIndex: -2,
					backgroundImage: `url(${background.src})`,
					backgroundColor: 'black',
					backgroundSize: 'cover',
					minHeight:'100vh',
				}}
			>
				<Navbar />
				<DynamicMap />
			</div>
		</>
	)
}

export default MapPage
