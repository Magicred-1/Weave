'use client'
import Image from 'next/image'
import { parseEther } from 'ethers'
import GHO from '@/app/assets/GHO.svg'
import ETH from '@/app/assets/ETH.svg'
import Radio from '@mui/material/Radio'
import USDC from '@/app/assets/USDC.svg'
import EURS from '@/app/assets/EURS.svg'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import { LatLngExpression } from 'leaflet'
import { ChangeEvent, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Loading from '@/app/components/Loading'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import DynamicPreviewMap from './DynamicPreviewMap'
import { SelectChangeEvent } from '@mui/material/Select'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ERC20ABI, EventsFactoryABI } from '@/app/components/abis'
import { Card, CardContent, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

interface RadioCardProps {
	value: string
	label: string
	checked: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	image: any
}

type AcceptedCurrency = 'GHO' | 'ETH' | 'USDC' | 'EURS'
type CercleColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'grey'
interface CurrencyAddressMapping {
	[currency: string]: string
}
type EventArguments =
	| readonly [
			string,
			string,
			bigint,
			bigint,
			bigint,
			bigint,
			readonly `0x${string}`[],
			bigint,
			string,
			`0x${string}`,
			bigint
	  ]
	| undefined

const currencyToAddressMapping: CurrencyAddressMapping = {
	GHO: '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60',
	ETH: '0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c',
	USDC: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
	EURS: '0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E',
}
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

	const [price, setPrice] = useState<number>(0)
	const [startDate, setStartDate] = useState<number>()
	const [endDate, setEndDate] = useState<number>()
	const [currency, setCurrency] = useState<AcceptedCurrency>('GHO')
	const [address, setAddress] = useState<string>('')
	const [mapPosition, setMapPosition] = useState<[number, number]>([51, 2])
	const [website, setWebsite] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [eventManagers, setEventManagers] = useState<readonly `0x${string}`[] | undefined>()
	const [event, setEvent] = useState<string>('')
	const [logo, setLogo] = useState<File>()
	const [radius, setRadius] = useState<number>(200)
	const [color, setColor] = useState<CercleColor>('red')
	const { address: userAddress, isConnected } = useAccount()
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrency(e.target.value as AcceptedCurrency)
	}

	// Price* = ((basePrice + dailyRate) * _numberOfDays) + (Date difference (Today - Start of event))
	const calculatePrice = (_endDate: number, _startDate: number) => {
		if (!_endDate || !_startDate) {
			return
		}

		if (_endDate < _startDate) {
			return
		}

		if (_endDate === _startDate) {
			return
		}

		const basePrice = 5
		const dailyRate = 7
		const numberOfDays = (_endDate - _startDate) / 86400
		const dateDifference = (_startDate - Math.round(new Date().getTime() / 1000)) / 86400
		const price = (basePrice + dailyRate) * numberOfDays + dateDifference
		setPrice(price)
	}

	const onChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setLogo(e.target.files[0])
		}
	}
	let startDateObject
	let endDateObject
	if (startDate && endDate) {
		startDateObject = new Date(startDate)
		endDateObject = new Date(endDate)
	}

	const {
		data: allowance,
		refetch,
		error: allowanceError,
	} = useContractRead({
		address: currencyToAddressMapping[currency].toString() as `0x${string}`,
		abi: ERC20ABI,
		functionName: 'allowance',
		args: userAddress && [userAddress, '0x3A9AeBbF8CBDcBcE7246C30DFE29277197c8046E'],
	})
	console.log('Allowance data', Number(allowance), allowanceError)
	// 2. (Only if no allowance): Write to ERC20, approve 0x Exchange Proxy to spend max integer
	const { config: approveConfig } = usePrepareContractWrite({
		address: currencyToAddressMapping[currency].toString() as `0x${string}`,
		abi: ERC20ABI,
		functionName: 'approve',
		args: ['0x3A9AeBbF8CBDcBcE7246C30DFE29277197c8046E', parseEther('9999')],
	})

	const {
		data: writeContractResult,
		writeAsync: approveAsync,
		error,
		isSuccess: approvalSuccess,
	} = useContractWrite(approveConfig)
	console.log('Approval data:', writeContractResult)
	const { isLoading: isApproving } = useWaitForTransaction({
		hash: writeContractResult ? writeContractResult.hash : undefined,
		onSuccess(data) {
			refetch()
		},
	})
	const args: EventArguments =
		event && description && startDateObject && endDateObject && eventManagers && currency && mapPosition
			? [
					event?.toString(),
					description?.toString(),
					BigInt(startDateObject.getTime()),
					BigInt(endDateObject.getTime()),
					BigInt(Math.round(mapPosition[0])),
					BigInt(Math.round(mapPosition[1])),
					eventManagers as readonly `0x${string}`[],
					BigInt(radius),
					color.toString() as `0x${string}`,
					currencyToAddressMapping[currency].toString() as `0x${string}`,
					BigInt(20),
			  ]
			: undefined
	const { config } = usePrepareContractWrite({
		address: '0x3A9AeBbF8CBDcBcE7246C30DFE29277197c8046E',
		abi: EventsFactoryABI,
		functionName: 'createEvent',
		args: args,
	})
	const { data: formData, isLoading: contractWriteLoading, isSuccess, write: formWrite } = useContractWrite(config)
	console.log(formData)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		try {
			getLatLng(address)
			if (isConnected) {
				setEventManagers([userAddress as `0x${string}`])
				if (currency) {
					if (Number(allowance) == 0) {
						approveAsync?.()
						formWrite?.()
					} else {
						formWrite?.()
					}
				}
			}
		} catch (error) {
			console.error('Error submitting form:', error)
		}

		console.log('Form submitted with data:', {
			price,
			startDate,
			endDate,
			currency,
			address,
			mapPosition,
			description,
			eventManagers,
			event,
			logo,
			radius,
			color,
		})
		calculatePrice(endDate as number, startDate as number)
	}

	const convertDateToUnix = (date: Date) => {
		return Math.round(date.getTime() / 1000)
	}

	const getLatLng = async (eventAddress: string) => {
		console.log(eventAddress)
		if (!eventAddress) {
			return
		}

		try {
			const response = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(eventAddress)}`)

			if (!response.ok) {
				throw new Error(`Failed to fetch coordinates. Status: ${response.status}`)
			}

			const data = await response.json()

			if (!data || data.length === 0) {
				throw new Error(`No coordinates found for address: ${eventAddress}`)
			}

			const lat = data[0].lat
			const lng = data[0].lon

			setMapPosition([lat, lng])
			return [lat, lng]
		} catch (error) {
			console.error('Error fetching coordinates:', error)
		}
	}

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
			{(contractWriteLoading || isApproving) && <Loading />}
			{!contractWriteLoading && !isApproving &&!isSuccess && (
				<div className="w-full flex flex-col md:flex-row gap-2">
					<form
						onSubmit={handleSubmit}
						className="max-w-4xl mx-4 mb-10 md:mx-0 px-8 py-6 md:ml-20 text-gray-200 bg-white-600 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 border border-gray-100"
					>
						{/* text Input */}
						<div className="mb-4">
							<label htmlFor="file" className="block text-sm font-medium ">
								Event Logo
							</label>
							<input
								type="file"
								id="file"
								name="file"
								accept="image/png, image/jpeg, image/jpg, image/gif"
								size={1000000}
								onChange={onChangeLogo}
								className="mt-1 p-2 border rounded-md w-full"
							/>
						</div>
						{/* Event Name */}
						<ThemeProvider theme={theme}>
							<label htmlFor="text" className="block text-sm font-medium ">
								Event Name
							</label>
							<TextField name="eventName" onChange={e => setEvent(e.target.value)} fullWidth required />
						</ThemeProvider>
						{/*Event Description  */}
						<label htmlFor="text" className="block text-sm font-medium ">
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
								<label htmlFor="text" className="block text-sm font-medium mt-4">
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
								<label htmlFor="text" className="block text-sm font-medium mt-4">
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
							<label htmlFor="text" className="block text-sm font-medium mt-3">
								Event Website
							</label>
							<TextField
								name="eventWebsite"
								onChange={e => setWebsite(e.target.value)}
								fullWidth
								required
							/>
						</ThemeProvider>
						{/* Max Participtexfiletants
				<ThemeProvider theme={theme}>
					<label htmlFor="text" className="block text-sm font-medium mt-3">
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
						<label htmlFor="text" className="block text-sm font-medium mt-3">
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
						<label htmlFor="text" className="block text-sm font-medium mt-3 ">
							Event Venue Address
						</label>
						<TextareaAutosize
							minRows={2}
							name="eventDescription"
							onChange={e => setAddress(e.target.value)}
							className="mt-3 p-2 border rounded-md w-full text-gray-200 bg-transparent"
						/>
						<div className="flex flex-col md:flex-row md:gap-4">
							{/* Event Radius */}
							<div className="w-full flex flex-col mt-3">
								<label htmlFor="text" className="block text-sm font-medium ">
									Event Radius
								</label>
								<Select
									name="eventRadius"
									onChange={e => setRadius(Number(e.target.value))}
									className="mt-1 border rounded-md w-full text-gray-200"
								>
									<MenuItem value={50}>50</MenuItem>
									<MenuItem value={100}>100</MenuItem>
									<MenuItem value={200}>200</MenuItem>
									<MenuItem value={300}>300</MenuItem>
								</Select>
							</div>
							{/* Color */}
							<div className="w-full flex flex-col mt-3">
								<label htmlFor="text" className="block text-sm font-medium text-gray-200">
									Color
								</label>
								<Select
									label="Color"
									name="color"
									onChange={e => setColor(e.target.value as CercleColor)}
									className="mt-1 border rounded-md w-full text-gray-200"
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

						{price > 0 ? (
							<h3 className="w-full flex justify-center mt-3 text-gray-200 text-md font-bold ">
								Estimated cost for event : {price} {currency}
							</h3>
						) : null}

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
				</div>
			)}
			{!contractWriteLoading && !isApproving && isSuccess && (
				<h1 className="mb-4 text-4xl h-screen font-extrabold tracking-tight leading-none  w-full text-white text-center py-6">
					🎉Event Submitted!
				</h1>
			)}
		</>
	)
}

export default Form
