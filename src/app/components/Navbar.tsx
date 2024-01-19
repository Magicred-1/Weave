'use client'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import React, { useState } from 'react'
import localfont from 'next/font/local'
import { ConnectKitButton } from 'connectkit'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Drawer, List, ListItem, Toolbar, IconButton, Menu, MenuItem } from '@mui/material'

const PressStart2P = localfont({ src: './../assets/fonts/PressStart2P.ttf' })

const Navbar = () => {
	const { isConnected } = useAccount()
	const userIsEventOwner = true
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setMenuAnchor(event.currentTarget)
	}

	const handleMenuClose = () => {
		setMenuAnchor(null)
	}

	return (
		<nav className="flex border-b border-gray-200 pb-4">
			<div className="w-full flex items-center justify-between mx-auto p-4">
				{/* Desktop View */}
				<div className=" flex flex-row items-center ">
					<a href="/" className="flex">
						<Image src="/icon_logo.png" alt="Weave Logo" width={50} height={50} />
						<span
							className={`${PressStart2P.className} self-center text-sm md:text-2xl font-semibold whitespace-nowrap text-white`}
						>
							Weave
						</span>
					</a>
				</div>

				{/* Desktop Navigation Links */}
				<div className="hidden md:flex items-center justify-between w-full md:w-auto">
					<ul className="flex gap-12 h-full w-full bg-gray-600 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border p-5 border-gray-100 ">
						<li>
							<a
								href="/map"
								className="block py-1 px-5 text-white hover:rounded-full hover:bg-[#008790] rounded-full focus:bg-[#008770]"
							>
								Map
							</a>
						</li>
						<li>
							<a
								href="/leaderboard"
								className="block py-1 px-5 text-white hover:rounded-full hover:bg-[#008790] rounded-full focus:bg-[#008770]"
							>
								Leaderboard
							</a>
						</li>
						<li>
							<a
								href="/create"
								className="block py-1 px-5 text-white  hover:bg-[#008790] rounded-full focus:bg-[#008770]"
							>
								Add your own event
							</a>
						</li>
						{isConnected && userIsEventOwner ? (
							<li>
								<a
									href="/events/dashboard"
									className="block py-1 px-5 text-white hover:bg-[#008790] rounded-full focus:bg-[#008770]"
								>
									Event Dashboard
								</a>
							</li>
						) : null}
						{isConnected ? (
							<li>
								<a
									href={`/leaderboard/${useAccount().address}`}
									className="block py-1 px-5 text-white hover:bg-[#008790] rounded-full focus:bg-[#008770]"
								>
									Profile
								</a>
							</li>
						) : null}
					</ul>
				</div>
				<ConnectKitButton />
				{/* Mobile View */}
				<div className="md:hidden">
					<IconButton
						onClick={handleMenuOpen}
						className="p-2 w-10 h-10 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					>
						<MenuIcon />
					</IconButton>
					<Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose} >
						{[
							'Map',
							'Leaderboard',
							'Add your own event',
							isConnected && userIsEventOwner && 'Event Dashboard',
							isConnected && 'Profile',
						].map((text, index) => (
							<MenuItem key={index} onClick={handleMenuClose} className=''>
								{text && typeof text === 'string' ? (
									<a href={`/${text.toLowerCase().replace(/ /g, '-')}`} className="text-black">
										{text}
									</a>
								) : null}
							</MenuItem>
						))}
					</Menu>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
