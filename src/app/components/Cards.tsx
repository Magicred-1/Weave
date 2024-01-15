import Image from 'next/image'
import event from '@/app/assets/event.png'
import { Chip, Stack } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Card, CardHeader, CardBody } from '@material-tailwind/react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface Cardsprops {
	title: any
	description: any
	place: any
	tags: any
	cashprize: any
}

const Cards: React.FC<Cardsprops> = ({ title, description, place, tags, cashprize }) => {
	return (
		<Card
			className=" w-80 px-4 bg-gray-800 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border-2 border-teal-600
"
		>
			<CardHeader shadow={false} floated={false} className=" h-48 py-3  rounded-lg bg-transparent ">
				<Image src={event} alt="card-image" className="h-full w-full object-cover rounded-xl" />
			</CardHeader>
			<CardBody>
				<div className="mb-2 flex items-center justify-between text-gray-200">
					<h1 className=" text-xl font-bold">{title}</h1>
				</div>
				<p className="text-gray-400 font-normal mb-2 text-sm">{description}</p>
				<p className="text-teal-600 font-semibold">
					<span>
						<LocationOnIcon className="  mr-1" />
					</span>
					{place}
				</p>
				<Stack direction="row" spacing={1} className="mt-4 w-full flex flex-wrap gap-1">
					{tags?.map((item:any, key:any) => {
						return (
							<Chip
								key={key}
								label={item}
								icon={<FiberManualRecordIcon fontSize="small" />}
								color="primary"
								variant="outlined"
								className="m-1"
							/>
						)
					})}
				</Stack>
			</CardBody>
			<div className="flex flex-col space-y-4 py-5 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
				<a
					href="#"
					className=" hover:bg-teal-600 hover:text-white inline-flex justify-center text-teal-600 items-center py-2 px-10 h-full w-fit rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-teal-600"
				>
					{cashprize}
				</a>
			</div>
		</Card>
	)
}

export default Cards
