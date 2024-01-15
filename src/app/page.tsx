'use client'
import Navbar from './components/Navbar'
import background from '@/app/assets/bg.jpg'
import background2 from '@/app/assets/bg2.jpg'
import { ConnectKitButton } from 'connectkit'
import Hero from './components/Hero'
import Cards from './components/Cards'
import reward from "@/app/assets/reward.svg"
import gps from "@/app/assets/gps.svg";
import spoofing from "@/app/assets/spoofing.svg"
import quality from"@/app/assets/quality.svg"
import AlternateSection from './components/AlternateSection'
import Footer from './components/Footer'
const Home = () => {
	const staticData = {
	cardData: [
		{
			title:"Hacking Dao",
			place: "Paris, France",
			description: "Welcome to the Hackin’Dau event located in Paris...",
			tags:["ZK","students","Green", "IT", "solidity"],
			fees:"5000€",
		},
				{
		title:"Hacking Dao",
			place:  "Paris, France",
			description: "Welcome to the Hackin’Dau event located in Paris...",
			tags:["ZK","students","Green" ,"IT", "solidity"],
			fees:"5000€"
		},
		{
		title:"Hacking Dao",
			place:  "Paris, France",
			description: "Welcome to the Hackin’Dau event located in Paris...",
			tags:["ZK","students","Green" ,"IT", "solidity"],
			fees:"5000€"
		},
	],
			section3data: {
				title: "What is Weave?",
				description: "At the heart of Weave is the idea that participants at physical events can earn rewards through an interactive platform. ",
				childs: [
					
				{
					image: reward,
					description:"At the heart of Weave is the idea that participants at physical events can earn rewards through an interactive platform."
				},{
					image: gps,
					description:"This allocation is determined by their GPS coordinates, introducing a dynamic and location-based reward system"
			}, {
					image: spoofing,
				description:"While the concept is innovative, Weave acknowledges the challenge of GPS spoofing. Ensuring the integrity of the location-based reward system is a priority, and Weave is actively working on devising a solution to prevent spoofing, guaranteeing the fairness and authenticity of the rewards."
			}, {
					image: quality,
				description:"Organizers contribute to the community by allocating 2% of the event price in GHO, a cryptocurrency or token, to participants physically present."
				}
					
				]
				}
}
	return (
		<>
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
				<Hero/>
			</div>
			<section className='bg-black w-100vw flex justify-center py-12 gap-12'>
			{staticData?.cardData.map((item,key)=>{
					return <Cards title={item.title} description={item.description} place={item.place} tags={item.tags} fees={item.fees}/>
			})} 
				</section>
		 <section style={{
      zIndex: -2,
      position: 'relative',
      height:"fit-content",
      backgroundImage: `url(${background2.src})`,
      backgroundSize: 'cover',
    }}>
     <div className="flex flex-col w-full items-center justify-center max-h-screen text-center pt-10">
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-6xl lg:text-6xl text-gray-200">{staticData.section3data.title}</h1>
			<p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48">{staticData.section3data.description}</p>
	 </div>
	 <AlternateSection data={staticData.section3data.childs}/>
	 <Footer/>
    </section>
		</>
	)
}

export default Home
