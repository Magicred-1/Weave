import React from 'react'
import localfont from 'next/font/local';
import { FaGithub } from "react-icons/fa";

const PressStart2P = localfont({src: './../assets/fonts/PressStart2P.ttf'});

const Footer = () => {
	return (
		<footer className=" w-full h-full bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-t border-gray-100">
			<div className="w-full ">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between justify-center md:px-20 py-4">
					<span className={`${PressStart2P.className} self-center text-3xl font-bold whitespace-nowrap dark:text-white`}>
						<a href='/'>Weave</a>
					</span>
					<span className="block text-sm text-gray-500 text-center dark:text-gray-400">
						© 2023{' '}
						<a href="/" className="hover:underline">
							Weave
						</a>
					</span>
					<ul className="flex  justify-center mb-6 text-lg font-medium text-gray-200 sm:mb-0 ">
						<li>
							<a href="https://github.com/Magicred-1/Weave" target='_blank' className="hover:underline  flex gap-2"><FaGithub className='mt-2' /> Github
							</a>
						</li>
					</ul>
				</div>
			
			</div>
		</footer>
	)
}

export default Footer
