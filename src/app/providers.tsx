'use client';

import {
	RainbowKitProvider,
	connectorsForWallets,
	getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import {
	argentWallet,
	ledgerWallet,
	trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import * as React from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import {
	arbitrum,
	base,
	goerli,
	mainnet,
	optimism,
	polygon,
	zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[
		mainnet,
		polygon,
		optimism,
		arbitrum,
		base,
		zora,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
	],
	[publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

const { wallets } = getDefaultWallets({
	appName: 'Cross Streams',
	projectId,
	chains,
});

const appInfo = {
	appName: 'Cross Streams',
};

const connectors = connectorsForWallets([
	...wallets,
	{
		groupName: 'Other',
		wallets: [
			argentWallet({ projectId, chains }),
			trustWallet({ projectId, chains }),
			ledgerWallet({ projectId, chains }),
		],
	},
]);

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains} appInfo={appInfo}>
				{mounted && children}
			</RainbowKitProvider>
		</WagmiConfig>
	);
}