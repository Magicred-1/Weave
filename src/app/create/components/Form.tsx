'use client'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import GHO from '@/app/assets/GHO.svg'
import ETH from '@/app/assets/ETH.svg'
import Radio from '@mui/material/Radio'
import USDC from '@/app/assets/USDC.svg'
import EURS from '@/app/assets/EURS.svg'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import { SelectChangeEvent } from '@mui/material/Select'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Card, CardContent, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import DynamicPreviewMap from './DynamicPreviewMap'
import { LatLngExpression } from 'leaflet'

interface RadioCardProps {
	value: string
	label: string
	checked: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	image: any
}

type AcceptedCurrency = "GHO" | "ETH" | "USDC" | "EURS";
type CercleColor = "red" | "blue" | "green" | "yellow" | "purple" | "orange" | "grey";

const Form = () => {
	const theme = createTheme({
		components: {
			MuiTextField: {
				styleOverrides: {
					root: {
						'& .MuiInputLabel-root': {
							color: '#A0AAB4',
						},
						'& .MuiInput-underline:after': {
							borderBottomColor: '#B2BAC2',
						},
						'& .MuiOutlinedInput-root': {
							color: 'white',
							'& fieldset': {
								borderColor: '#E0E3E7',
							},
							'&:hover fieldset': {
								borderColor: '#B2BAC2',
							},
							'&.Mui-focused fieldset': {
								borderColor: '#6F7E8C',
							},
						},
					},
				},
			},
		},
	})

	const [price, setPrice] = useState<number>();
	const [startDate, setStartDate] = useState<number>();
	const [endDate, setEndDate] = useState<number>();
	const [currency, setCurrency] = useState<AcceptedCurrency>("GHO");
	const [address, setAddress] = useState<string>("");
	const [mapPosition, setMapPosition] = useState<[number, number]>([51.505, -0.09]);
	const [description, setDescription] = useState<string>("");
	const [website, setWebsite] = useState<string>("");
	const [event, setEvent] = useState<string>("");
	const [logo, setLogo] = useState<File>();
	const [radius, setRadius] = useState<number>(200);
	const [color, setColor] = useState<CercleColor>("red");

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrency(e.target.value as AcceptedCurrency);
	}

	const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setLogo(e.target.files[0]);
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted with data:', {
			price,
			startDate,
			endDate,
			currency,
			address,
			mapPosition,
			description,
			website,
			event,
			logo,
			radius,
			color,
		});
	};

	const convertDateToUnix = (date: Date) => {
		return Math.round(date.getTime() / 1000);
	}

	const getLatLng = async (eventAddress: string) => {
		console.log(eventAddress);
		if (!eventAddress) {
		  return;
		}
	
		try {
			const response = await fetch(
				`https://geocode.maps.co/search?q=${encodeURIComponent(eventAddress)}`
			);
			const data = await response.json();
		
			console.log(data);
			const lat = data[0].lat;
			const lng = data[0].lon;
			setMapPosition([lat, lng]);
			return [lat, lng];
		} catch (error) {
			console.error("Error fetching coordinates:", error);
		}
	};

	const CustomRadioCard: React.FC<RadioCardProps> = ({ value, label, checked, onChange, image }) => (
		<Card
			variant="outlined"
			className={`bg-gray-600 rounded-2xl bg-clip-padding backdrop-filter text-center backdrop-blur-md bg-opacity-30 text-gray-200 ${
				checked && 'border-4 border-teal-600'
			}`}
		>
			<CardContent>
				<div className="w-full flex justify-center h-20 ">
					<Image src={image} alt="logo" />
				</div>
				<FormControlLabel
					value={value}
					control={<Radio checked={checked} onChange={onChange} style={{ color: 'transparent' }} />}
					label={label}
				/>
			</CardContent>
		</Card>
	)
	return (
		<>
		<form
			onSubmit={handleSubmit}
			className="max-w-4xl mx-4 mb-10 md:mx-0 px-8 py-6 md:ml-20 text-gray-200 bg-white-600 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 border border-gray-100"
		>
			{/* File Input */}
			<div className="mb-4">
				<label htmlFor="file" className="block text-sm font-medium ">
					Event Logo
				</label>
				<input
					type="file"
					id="file"
					name="file"
					accept='image/png, image/jpeg, image/jpg, image/gif'
					size={1000000}
					onChange={onChangeFile}
					className="mt-1 p-2 border rounded-md w-full"
				/>
			</div>
			{/* Event Name */}
			<ThemeProvider theme={theme}>
				<label htmlFor="file" className="block text-sm font-medium ">
					Event Name
				</label>
				<TextField 
					name="eventName"
					onChange={e => setEvent(e.target.value)} 
					fullWidth 
					required 
				/>
			</ThemeProvider>
			{/*Event Description  */}
			<label htmlFor="file" className="block text-sm font-medium ">
				Event Description
			</label>
			<TextareaAutosize
				minRows={2}
				name="eventDescription"
				onChange={e => setDescription(e.target.value)}
				className="mt-3 p-2 border rounded-md w-full text-gray-200 bg-transparent"
			/>
			<div className=" flex flex-col md:flex-row md:gap-4 text-gray-200">
				{/* Start Date */}
				<ThemeProvider theme={theme}>
					<label htmlFor="file" className="block text-sm font-medium mt-4">
						Start Date
					</label>
					<TextField
						type="date"
						name="startDate"
						onChange={e => setStartDate(convertDateToUnix(new Date(e.target.value)))}
						fullWidth
						required
						className="mt-3"
					/>
				</ThemeProvider>
				{/* End Date */}
				<ThemeProvider theme={theme}>
					<label htmlFor="file" className="block text-sm font-medium mt-4">
						End Date
					</label>
					<TextField
						type="date"
						name="endDate"
						onChange={e => setEndDate(convertDateToUnix(new Date(e.target.value)))}
						fullWidth
						required
						className="mt-3"
					/>
				</ThemeProvider>
			</div>
			{/* Event Website */}
			<ThemeProvider theme={theme}>
				<label htmlFor="file" className="block text-sm font-medium mt-3">
					Event Website
				</label>
				<TextField
					name="eventWebsite"
					onChange={e => setWebsite(e.target.value)}
					fullWidth
					required
				/>
			</ThemeProvider>
			{/* Max Participants */}
			<ThemeProvider theme={theme}>
				<label htmlFor="file" className="block text-sm font-medium mt-3">
					Max Participants
				</label>
				<TextField
					type="number"
					name="maxParticipants"
					onChange={e => setPrice(Number(e.target.value))}
					fullWidth
					required
				/>
			</ThemeProvider>
			{/* Payment Method */}
			<label htmlFor="file" className="block text-sm font-medium mt-3">
				Payment Method
			</label>
			<RadioGroup
				aria-label="Max Participants"
				name="paymentMethod"
				onChange={(e: SelectChangeEvent) => setCurrency(e.target.value as AcceptedCurrency)}
				className="w-full flex flex-col md:flex-row mt-2 gap-5"
				// style={{ flexDirection: 'row' }}
			>
				<CustomRadioCard
					value="GHO"
					label="Pay with GHO"
					checked={currency === 'GHO'}
					onChange={onChange}
					image={GHO}
				/>
				<CustomRadioCard
					value="ETH"
					label="Pay with ETH"
					checked={currency === 'ETH'}
					onChange={onChange}
					image={ETH}
				/>
				<CustomRadioCard
					value="USDC"
					label="Pay with USDC"
					checked={currency === 'USDC'}
					onChange={onChange}
					image={USDC}	
				/>
				<CustomRadioCard
					value="EURS"
					label="Pay with EURS"
					checked={currency === 'EURS'}
					onChange={onChange}
					image={EURS}
				/>
			</RadioGroup>
			{/* Event Venue Address */}
			<label htmlFor="file" className="block text-sm font-medium mt-3 ">
				Event Venue Address
			</label>
			<TextareaAutosize
				minRows={2}
				name="venueAddress"
				value={address}
				onChange={handleSubmit}
				className="mt-3 p-2 border rounded-md w-full text-gray-200 bg-transparent"
			/>
			<div className="flex flex-col md:flex-row md:gap-4">
				{/* Event Radius */}
				<div className="w-full flex flex-col mt-3">
					<label htmlFor="file" className="block text-sm font-medium ">
						Event Radius
					</label>
					<Select
						name="eventRadius"
						onChange={e => setRadius(Number(e.target.value))}
						className="mt-1 border rounded-md w-full"
					>
						<MenuItem value={50}>50</MenuItem>
						<MenuItem value={100}>100</MenuItem>
						<MenuItem value={200}>200</MenuItem>
						<MenuItem value={300}>300</MenuItem>
					</Select>
				</div>
				{/* Color */}
				<div className="w-full flex flex-col mt-3">
					<label htmlFor="file" className="block text-sm font-medium ">
						Color
					</label>
					<Select
						label="Color"
						name="color"
						onChange={e => setColor(e.target.value as CercleColor)}
						className="mt-1 border rounded-md w-full"
					>
						<MenuItem value="red">Red</MenuItem>
						<MenuItem value="blue">Blue</MenuItem>
						<MenuItem value="green">Green</MenuItem>
						<MenuItem value="yellow">Yellow</MenuItem>
						<MenuItem value="purple">Purple</MenuItem>
						<MenuItem value="orange">Orange</MenuItem>
						<MenuItem value="grey">Grey</MenuItem>
					</Select>
				</div>
			</div>

			<h3 className="w-full flex justify-center mt-3 text-gray-200 text-md font-bold ">
				Estimated cost for event : 60$ GHO
			</h3>
			{/* Submit Button */}
			<div className="w-full flex justify-center ">
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className=" mt-4 px-8 py-2 text-white rounded-full bg-[#008770]"
				>
					Proceed
				</Button>
			</div>
		</form>
		<DynamicPreviewMap 
			title={event}
			position={mapPosition as LatLngExpression}
			description={description}
			website={website}
			event={event}
			radius={radius}
			color={color}
			showMap={true}
		/>
		</>
	)
}

export default Form
