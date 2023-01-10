import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import LunarLaunchPoolABI from '../abi/LunarLaunchPool.json';

export function Share() {
	const { account } = useWeb3React();
	const [lunarShare, setLunarShare] = useState(0);
	const [voxShare, setVoxShare] = useState(0);

	useEffect(() => {
		const getShare = async () => {
			try {
				const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`);
				const lunarLaunchPool = new ethers.Contract('0xdAFc5B2D1be6dF7fCd563FFe4EDa5992b3c191dA', LunarLaunchPoolABI, provider);

				// userStakes
				const getUserShare = await lunarLaunchPool.userShare(account);
				const { 0: lunarShare, 1: voxShare } = getUserShare;

				const lunarShareInHex = lunarShare.toHexString();
				const voxShareInHex = voxShare.toHexString();

				// Convert hex to decimal
				const hexToDecimal = (hex) => parseInt(hex, 16);

				// Get decimal value
				const lunarShareInDeceimal = hexToDecimal(lunarShareInHex);
				const voxShareInDecimal = hexToDecimal(voxShareInHex);

				// Convert to ether
				const weiToEther = (wei) => wei / 1000000000000000000;

				// Get ether value
				const lShare = weiToEther(lunarShareInDeceimal).toFixed(4);
				const vShare = weiToEther(voxShareInDecimal).toFixed(4);

				// to number
				// const totalStakeinNumber = Number(totalS);
				// const userStakesinNumber = Number(userS);

				setLunarShare(lShare);
				setVoxShare(vShare);
			} catch (error) {}
		};
		getShare();
		const interval = setInterval(getShare, 30000);

		return () => clearInterval(interval);
	}, [account]);

	return [lunarShare, voxShare];
}
