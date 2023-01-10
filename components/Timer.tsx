import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import LunarLaunchPoolABI from '../abi/LunarLaunchPool.json';

export function Timer() {
	const [endBlock, setEndBlock] = useState(0);
	const [currentBlock, setCurrentBlock] = useState(0);

	useEffect(() => {
		const getBlockNumbers = async () => {
			try {
				const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`);
				const lunarLaunchPool = new ethers.Contract('0xdAFc5B2D1be6dF7fCd563FFe4EDa5992b3c191dA', LunarLaunchPoolABI, provider);

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
