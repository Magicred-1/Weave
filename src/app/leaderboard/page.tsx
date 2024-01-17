import { Metadata } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import background from '@/app/assets/bg.jpg'
import { LeaderboardComponent } from './../components/Leaderboard/LeaderboardComponent'
export const metadata: Metadata = {
    title: "Leaderboard",
};

const LeaderboardPage = () => {
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
			<h1 className=" text-4xl font-extrabold tracking-tight leading-none -mb-6  text-white text-center py-6">
				Leaderboard
			</h1>
			<LeaderboardComponent />
			<Footer />
		</div>
	)
}

export default LeaderboardPage;