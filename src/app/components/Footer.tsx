import React from 'react'

const Footer = () => {
	return (
		<footer className=" w-full h-full bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-t border-gray-100">
			<div className="w-full ">
				<div className="sm:flex sm:items-center sm:justify-between px-20 py-4">
					<span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">
						<a href='/'>Weave</a>
					</span>
					<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2023{' '}
						<a href="/" className="hover:underline">
							Weave
						</a>
					</span>
					<ul className="flex flex-wrap items-center mb-6 text-lg font-medium text-gray-200 sm:mb-0 ">
						<li>
							<a href="https://github.com/Magicred-1/Weave" target='_blank' className="hover:underline me-4 md:me-6">
								Github
							</a>
						</li>
					</ul>
				</div>
			
			</div>
		</footer>
	)
}

export default Footer
