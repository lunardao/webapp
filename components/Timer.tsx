import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import LunarLaunchPoolABI from '../abi/LunarLaunchPool.json';

export function Timer() {
	const [endBlock, setEndBlock] = useState(0);
	const [currentBlock, setCurrentBlock] = useState(0);

	useEffect(() => {
		const getBlockNumbers = async () => {
			try {
				const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/922ceefebd0d4cd29766ea22f19cba23');
				const lunarLaunchPool = new ethers.Contract('0xbAFaAedFEeBB79fa942cFd5A9DbfB3446E6AEa6D', LunarLaunchPoolABI, provider);

				// currentBlock
				const getCurrentBlock = await provider.getBlockNumber();

				// endBlock LaunchPool
				const getEndBlock = await lunarLaunchPool.endBlock();
				const endBlockInHex = getEndBlock.toHexString();

				// Convert hex to number
				const hexToNumber = (hex) => parseInt(hex, 16);

				// Get decimal value
				const endBlock = hexToNumber(endBlockInHex);

				setEndBlock(endBlock);
				setCurrentBlock(getCurrentBlock);
			} catch (error) {}
		};
		getBlockNumbers();
		const interval = setInterval(getBlockNumbers, 10000);

		return () => clearInterval(interval);
	}, []);

	return [endBlock, currentBlock];
}
