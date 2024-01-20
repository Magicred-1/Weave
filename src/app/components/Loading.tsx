import React from 'react'
import { ThreeDots } from 'react-loading-icons'

const Loading = () => {
	return (
		<div className="w-full flex justify-center items-center h-[80vh]">
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
	)
}

export default Loading
