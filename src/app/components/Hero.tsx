import React from 'react'

const Hero = () => {
  return (
		<div className="flex w-full items-center justify-center max-h-screen pt-56">
			<div className="text-center">
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-6xl lg:text-6xl text-white">
					Weave
				</h1>
				<p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 xl:px-48">
					Connecting Web3, One Thread at a Time!
				</p>
				<div className="flex  mb-8 lg:mb-16 space-y-4 flex-row justify-center sm:space-y-0 sm:space-x-4">
					<a
						href="/map"
						className="inline-flex justify-center text-white items-center py-3 px-6 h-full w-fit rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
					>
						Get started
						<svg
							className="ml-2 -mr-1 w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</a>
				</div>
          </div>
          
		</div>
  )
}

export default Hero