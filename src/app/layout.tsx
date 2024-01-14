import './globals.css'
import ClientLayout from './Web3Provider'
import { FC, PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Weave',
	icons: [
		{
			url: '/icon_logo.png',
			type: 'image/png',
			sizes: '512x512',
		}
	],
	description: 'Connecting Web3, One Thread at a Time.',
		
}

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<html lang="en">
			<metadata />
			<body>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	)
}

export default RootLayout
