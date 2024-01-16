import React from 'react'

const Footer = () => {
	return (
		<footer className="h-full w-full bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-t border-gray-100">
			<div className="w-full ">
				<div className="flex flex-col md:flex-row items-center justify-between px-20 py-4 gap-4">
					<span className="self-center text-3xl font-bold whitespace-nowrap text-white">Weave</span>
					<span className="block text-sm text-gray-200 sm:text-center ">
						© 2024{' '}
						<a href="3" className="hover:underline">
							Weave
						</a>
					</span>
					<ul className="flex flex-wrap items-center mb-6 text-lg font-medium text-gray-200 sm:mb-0 ">
						<li>
							<a href="#" className="hover:underline md:me-6">
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
