'use client'
import Footer from '../Footer'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { ThreeDots } from 'react-loading-icons'
import {  Box, Modal, TextField, ThemeProvider, createTheme } from '@mui/material'
const style = {
	position: 'absolute' as 'absolute',
	top: '70%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 500,
	bgcolor: ' rgba( 24, 24, 24, 0.95 )',
	border: '4px solid #006d5b',
	borderRadius: '5%',
	boxShadow: 24,
	p: 8,
}
const DynamicMap = () => {
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
	const [open, setOpen] = useState(true)
	const [showMap, setShowMap] = useState(false)
	const handleOpen = () => setOpen(true)
	const [nickName, setNickName] = useState<String>()
	const handleClose = () => setOpen(false)
	const handleOnSubmit = () => {
		setOpen(false)
		setShowMap(true)
	}
	const Map = useMemo(
		() =>
			dynamic(() => import('../../components/Map/MapContainer'), {
				loading: () => (
					<div className="flex justify-center items-center h-[80vh]">
						<div className="bg-[rgba( 85, 85, 85, 0.45 )] p-6 rounded-lg shadow-md max-h-96">
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
							<p className="mt-4 text-sm text-black-600 text-center">
								<ThreeDots stroke="#000" />
								Loading...
							</p>
						</div>
					</div>
				),
				ssr: false,
			}),
		[]
	)

	return (
		<>
			{' '}
			<ThemeProvider theme={theme}>
				<Modal
					open={open}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					className=" h-[80vh]"
				>
					<Box sx={style}>
						<form onSubmit={handleOnSubmit}>
							<p className="block text-center text-lg font-medium text-teal-600">Time to get Onboard!</p>
							<label htmlFor="text" className="block text-center text-md mb-2 text-teal-600">
								You need to set a Username first.
							</label>
							<TextField
								name="eventName"
								onChange={e => setNickName(e.target.value)}
								fullWidth
								required
								className="mt-3 text-sm font-medium text-gray-200"
							/>
							<div className="w-full flex justify-center ">
								<button type="submit" className=" mt-4 px-8 py-2 text-white rounded-full bg-[#008770]">
									submit
								</button>
							</div>
						</form>
					</Box>
				</Modal>
			</ThemeProvider>
			{showMap && (
				<>
					<Map />
					<Footer />
				</>
			)}
		</>
	)
}

export default DynamicMap
