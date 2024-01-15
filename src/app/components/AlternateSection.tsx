import React from 'react'
import Image from 'next/image'

interface AlternateSectionProps {
	data: Array<{
		image: any
		description: any
	}>
}

const AlternateSection: React.FC<AlternateSectionProps> = ({ data }) => {
	return (
		<div className="flex flex-col items-center justify-center px-20 py-10">
			{data.map((item, index) => (
				<div
					key={index}
					className={`flex flex-col items-center h-80 mt-10  py-12 w-full bg-gray-900 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100 lg:flex-row ${
						index % 2 === 0 ? 'lg:flex-row-reverse' : ''
					}`}
				>
					<div className="lg:w-1/4 p-2">
						<Image src={item.image} alt="Alternate Section Image" className="w-full h-auto" />
					</div>
					<div className="lg:w-3/4 p-2">
						<p className="mb-8 text-lg font-[400] text-gray-100 lg:text-2xl sm:px-16 ">
							{item.description}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default AlternateSection
