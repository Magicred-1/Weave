'use client'
import { WeaveABI } from '../abis'
import { Badge } from '../ui/badge'
import { useAccount, useContractRead } from 'wagmi'
import { AvatarImage, AvatarFallback, Avatar } from '../ui/avatar'
import { CardTitle, CardHeader, CardContent, Card } from '../ui/card'

type ProfileComponentProps = {
	address: `0x${string}`
	icon?: string
}

export default function ProfileComponent({ address }: ProfileComponentProps) {
	const { isConnected } = useAccount()
	const {
		data: onboardingData,
		error,
		isLoading: contractReadLoading,
	} = useContractRead({
		abi: WeaveABI,
		functionName: 'getUsername',
		address: "0x5f856baB0F63a833b311fC9d853a14c8762d583d",
		args: address && [address],
	})
	console.log('Read contract data and error', onboardingData)
	const profileIcon = `https://api.cloudnouns.com/v1/pfp?text=${address}`

	return (
		<>
			{isConnected && !contractReadLoading ? (
				<div className="flex flex-col items-center space-y-6 p-6">
					<div className=" h-fit w-fit p-4 border-4 rounded-full border-teal-600">
						<Avatar className="h-24 w-24">
							<AvatarImage alt="user-profile" src={profileIcon} />
							<AvatarFallback className="text-gray-200">Loading ..</AvatarFallback>
						</Avatar>
					</div>
					<div className="text-center text-gray-200">
						<h2 className="text-3xl font-bold">{onboardingData ? onboardingData : 'Nickname'}</h2>
						<p className="text-sm font-semibold mt-2">{address}</p>
					</div>
					<Badge className="items-center">
						<UserIcon className="h-5 w-5 mr-2" />
						User Score: 85 / Events Attended: 85
					</Badge>
					<Card className="w-full max-w-md border-4 border-teal-600">
						<CardHeader>
							<CardTitle>Events Attended</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc list-inside space-y-2">
								<li>
									<a href="/events/1">Event 1</a>
								</li>
								<li>
									<a href="/events/2">Event 2</a>
								</li>
								<li>
									<a href="/events/3">Event 3</a>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			) : (
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none   text-white text-center py-6">
					Please Connect your wallet!
				</h1>
			)}
		</>
	)
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	)
}
