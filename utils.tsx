import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import type { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import Image from 'next/image';
import CoinbaseWalletLogo from '/public/svg/CoinbaseWallet.svg';
import MetaMaskLogo from '/public/svg/MetaMask.svg';
import WalletConnectLogo from '/public/svg/WalletConnect.svg';

export function getName(connector: Connector) {
	if (connector instanceof MetaMask) return 'MetaMask';
	if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet';
	if (connector instanceof WalletConnect) return 'WalletConnect';
	return 'Unknown';
}

export function getLogo(connector: Connector) {
	if (connector instanceof MetaMask) return <Image style={{ marginRight: '0.75rem' }} src={MetaMaskLogo} width="50" height="50" alt="Logo" />;
	if (connector instanceof CoinbaseWallet)
		return <Image style={{ margin: '0 1.2rem 0 0.25rem' }} src={CoinbaseWalletLogo} width="38" height="38" alt="Logo" />;
	if (connector instanceof WalletConnect) return <Image style={{ marginRight: '1rem' }} src={WalletConnectLogo} width="45" height="45" alt="Logo" />;
	return undefined;
}
