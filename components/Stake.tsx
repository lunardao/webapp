import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import LunarLaunchPoolABI from '../abi/LunarLaunchPool.json';

export function Stake() {
	const { account } = useWeb3React();
	const [totalStake, setTotalStake] = useState(0);
	const [userStakes, setUserStakes] = useState(0);

	useEffect(() => {
		const getStake = async () => {
			try {
				const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/922ceefebd0d4cd29766ea22f19cba23');
				const lunarLaunchPool = new ethers.Contract('0xbAFaAedFEeBB79fa942cFd5A9DbfB3446E6AEa6D', LunarLaunchPoolABI, provider);

				// userStakes
				const getTotalStake = await lunarLaunchPool.totalStake();
				const totalStakeInHex = getTotalStake.toHexString();

				// userStakes
				const getuserStakes = await lunarLaunchPool.userStakes(account);
				const userStakesInHex = getuserStakes.toHexString();

				// Convert hex to decimal
				const hexToDecimal = (hex) => parseInt(hex, 16);

				// Get decimal value
				const totalStake = hexToDecimal(totalStakeInHex).toString();
				const userStakes = hexToDecimal(userStakesInHex).toString();

				// Convert to ether
				const weiToEther = (wei) => wei / 1000000000000000000;

				// Get ether value
				const totalS = weiToEther(totalStake).toFixed(4);
				const userS = weiToEther(userStakes).toFixed(4);

				setTotalStake(totalS);
				setUserStakes(userS);
			} catch (error) {}
		};
		getStake();
		const interval = setInterval(getStake, 10000);

		return () => clearInterval(interval);
	}, [account]);

	return [totalStake, userStakes];
}
