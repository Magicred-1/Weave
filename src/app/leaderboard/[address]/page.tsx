import { Metadata } from 'next'
import background from '@/app/assets/bg.jpg'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import ProfileComponent from '@/app/components/Profile/ProfileComponent'

export const metadata: Metadata = {
	title: 'Profile',
}

interface Props {
	params: {
		address: `0x${string}`
		icon: string
	}
}

const ProfileComponentPage = ({ params }: Props) => {
	return (
		<>
			{' '}
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
				<div className="w-full mb-8 rounded-lg overflow-hidden">
					<ProfileComponent {...params} />
				</div>
				<Footer />
			</div>
		</>
	)
}

export default ProfileComponentPage
