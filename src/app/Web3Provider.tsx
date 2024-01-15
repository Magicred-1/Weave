'use client'

import { SiweMessage } from 'siwe'
import { APP_NAME } from '@/lib/consts'
import { FC, PropsWithChildren } from 'react'
import { WagmiConfig, createConfig } from 'wagmi'
import { ConnectKitProvider, SIWEConfig, SIWEProvider, getDefaultConfig } from 'connectkit'
import { mainnet, sepolia } from "wagmi/chains";

const chains = [mainnet, sepolia]

const config = createConfig(
	getDefaultConfig({
		appName: APP_NAME,
		appDescription: 'Connecting Web3, One Thread at a Time!',
		appUrl: "https://weave-three.vercel.app/",
		appIcon: '/icon_logo.png',
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
		walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
		chains,
	})
)

const siweConfig = {
	getNonce: async () => {
		const res = await fetch(`/api/siwe`, { method: 'PUT' })
		if (!res.ok) throw new Error('Failed to fetch SIWE nonce')

		return res.text()
	},
	createMessage: ({ nonce, address, chainId }) => {
		return new SiweMessage({
			nonce,
			chainId,
			address,
			version: '1',
			uri: window.location.origin,
			domain: window.location.host,
			statement: 'Sign In With Ethereum to prove you control this wallet to use Weave.',
		}).prepareMessage()
	},
	verifyMessage: ({ message, signature }) => {
		return fetch(`/api/siwe`, {
			method: 'POST',
			body: JSON.stringify({ message, signature }),
			headers: { 'Content-Type': 'application/json' },
		}).then(res => res.ok)
	},
	getSession: async () => {
		const res = await fetch(`/api/siwe`)
		if (!res.ok) throw new Error('Failed to fetch SIWE session')

		const { address, chainId } = await res.json()
		return address && chainId ? { address, chainId } : null
	},
	signOut: () => fetch(`/api/siwe`, { method: 'DELETE' }).then(res => res.ok),
} satisfies SIWEConfig

const Web3Provider: FC<PropsWithChildren<{}>> = ({ children }) => (
	<WagmiConfig config={config}>
		<SIWEProvider {...siweConfig}>
			<ConnectKitProvider theme='retro' mode='dark'>{children}</ConnectKitProvider>
		</SIWEProvider>
	</WagmiConfig>
)

export default Web3Provider
