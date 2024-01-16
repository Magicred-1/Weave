'use client';

import React from 'react'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import Image from 'next/image'

const Navbar = () => {
	const { isConnected } = useAccount()
	const userIsEventOwner = true

	return (
		<nav className="flex">
			<div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
				<a className="flex items-center space-x-3 rtl:space-x-reverse" href='/'>
					<Image src="/icon_logo.png" alt="Weave Logo" width={50} height={50} />
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Weave</span>
				</a>
				<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
					<ConnectKitButton />
					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-sticky"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
				</div>
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-sticky"
				>
					<ul className="flex gap-12 h-full w-full bg-gray-600 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border p-5 border-gray-100">
						<li>
							<a
								href="/map"
								className="block py-1 px-5 text-white hover:rounded-full hover:bg-[#008790]
									focus:rounded-full focus:bg-[#008770]"
								aria-current="page"
							>
								Map
							</a>
						</li>
						<li>
							<a 
								href="/leaderboard" 
								className="block py-1 px-5 text-white hover:rounded-full hover:bg-[#008790]
									focus:rounded-full focus:bg-[#008770]"
							>
								Leaderboard
							</a>
						</li>
						<li>
							<a 	
								href="#" 
								className="block py-1 px-5 text-white hover:rounded-full hover:bg-[#008790]
								focus:rounded-full focus:bg-[#008770]"
							>
								Add your own event
							</a>
						</li>
						{ isConnected && userIsEventOwner
							? <li>
								<a href="#" 
									className="block py-1 px-5 text-white hover:rounded-full hover:bg-[#008790]
										focus:rounded-full focus:bg-[#008770]"
								>
									Event Dashboard
								</a>
							</li> : null
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
