import styled from '@emotion/styled';
import { CircularProgress, Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import { Fragment, useState } from 'react';
import LunarLaunchPoolABI from '../abi/LunarLaunchPool.json';
import { Timer } from './Timer';

const BuyButton = styled(Button)({
	color: '#fff',
	boxShadow: '0 0 5px #3B3B86',
	textTransform: 'none',
	fontSize: 16,
	border: '1px solid',
	lineHeight: 1.5,
	backgroundColor: 'transparent',
	borderColor: '#3B3B86',
	borderRadius: 5,
	'&:hover': {
		backgroundColor: 'transparent',
		borderColor: 'rgba(59, 59, 134, 0.5)',
		boxShadow: '0 0 0.5px #3B3B86',
		transition: 'all 0.75s ease',
	},
	'&:active': {
		boxShadow: 'none',
		backgroundColor: '#0062cc',
	},
});

export default function FormDialog() {
	const { provider } = useWeb3React();
	const { enqueueSnackbar } = useSnackbar();
	const [pendingTx, setPendingTx] = useState(false);
	const [endBlock, currentBlock] = Timer();
	const blocksUntilStart = endBlock - currentBlock;

	// Redeem Function
	async function onJoin() {
		const signer = provider.getSigner();
		const lunarLaunchPool = new ethers.Contract('0xdAFc5B2D1be6dF7fCd563FFe4EDa5992b3c191dA', LunarLaunchPoolABI, signer);
		try {
			setPendingTx(true);
			const tx = await lunarLaunchPool.redeemToken({ gasLimit: 250000 });
			enqueueSnackbar('Transaction signed succesfully!', {
				variant: 'success',
			});
			await tx.wait();
			if (tx.hash) {
				enqueueSnackbar('Transaction mined succesfully!', {
					variant: 'success',
				});
			}
		} catch (error) {
			enqueueSnackbar('Transaction failed!', {
				variant: 'error',
			});
			setPendingTx(false);
		}
	}

	return (
		<div>
			{pendingTx ? (
				<BuyButton startIcon={<CircularProgress thickness={2.5} size={25} />} disabled={true}>
					Pending
				</BuyButton>
			) : !endBlock && !currentBlock ? (
				<Skeleton sx={{ height: 35, width: 100, bgcolor: 'grey.900' }} animation="wave" variant="rounded" />
			) : (
				<BuyButton variant="outlined" onClick={onJoin}>
					REDEEM
				</BuyButton>
			)}
		</div>
	);
}
