import styled from '@emotion/styled';
import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import LunarLaunchPoolABI from '../../abi/LunarLaunchPool.json';

interface State {
	amount: string;
}

const StyledSection = styled.section`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	align-content: center;
	margin: 0 auto 0 auto;

	@media (max-width: 960px) {
		display: grid;
		align-items: center;
		margin: 0 auto 0 auto;
		grid-template-columns: 1fr;
		grid-gap: 2em;
	}
`;

const ModalButton = styled(Button)({
	color: '#fff',
	boxShadow: '0 0 5px #03A11F',
	textTransform: 'none',
	fontSize: 16,
	border: '1px solid',
	lineHeight: 1.5,
	backgroundColor: 'transparent',
	borderColor: '#03A11F',
	borderRadius: 5,
	'&:hover': {
		backgroundColor: 'transparent',
		borderColor: 'rgba(3, 161, 31, 0.5)',
		boxShadow: '0 0 0.5px #03A11F',
		transition: 'all 0.75s ease',
	},
	'&:active': {
		boxShadow: 'none',
		backgroundColor: '#0062cc',
	},
});

const BuyButton = styled(Button)({
	color: '#000',
	textTransform: 'none',
	width: '100px',
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 1.5,
	height: '100%',
	backgroundColor: 'rgba(3, 161, 31, 0.75)',
	borderRadius: 5,
	'&:hover': {
		backgroundColor: 'rgba(3, 161, 31, 0.75)',
		transition: 'all 0.75s ease',
	},
	'&:active': {
		boxShadow: 'none',
		backgroundColor: '#0062cc',
	},
});

const CancelButton = styled(Button)({
	color: '#fff',
	textTransform: 'none',
	width: '100px',
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 1.5,
	height: '100%',
	backgroundColor: 'rgba(161, 31, 3, 1)',
	borderRadius: 5,
	'&:hover': {
		backgroundColor: 'rgba(161, 31, 3, 1)',
		transition: 'all 0.75s ease',
	},
	'&:active': {
		boxShadow: 'none',
		backgroundColor: '#0062cc',
	},
});

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	height: 275,
	width: 500,
	bgcolor: '#95C9CB',
	borderColor: 'rgba(59, 59, 134, 0.5)',
	borderRadius: '10px',
	boxShadow: 24,
	pt: 4,
	px: 2,
	pb: 2,
};

export default function Buy() {
	const [open, setOpen] = useState(false);
	const { provider } = useWeb3React();
	const { enqueueSnackbar } = useSnackbar();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [pendingTx, setPendingTx] = useState(false);

	const [values, setValues] = useState<State>({
		amount: '0' || '' || (undefined as any),
	});

	const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const val = ethers.utils.parseEther(values.amount || '0');

	// Buy Function
	async function onBuy() {
		const signer = provider.getSigner();
		const lunarLaunchPool = new ethers.Contract('0xdAFc5B2D1be6dF7fCd563FFe4EDa5992b3c191dA', LunarLaunchPoolABI, signer);
		try {
			setPendingTx(true);
			const tx = await lunarLaunchPool.enterLaunchPool({ value: val, gasLimit: 250000 });
			enqueueSnackbar('Transaction signed succesfully!', {
				variant: 'success',
			});
			handleClose();
			await tx.wait();
			if (tx.hash) {
				enqueueSnackbar('Transaction mined succesfully!', {
					variant: 'success',
				});
			}
		} catch (error) {
			enqueueSnackbar('User rejected transaction!', {
				variant: 'error',
			});
		}
		setPendingTx(false);
	}

	return (
		<div>
			<ModalButton disabled={false} size="large" variant="outlined" onClick={handleClickOpen}>
				BUY $LUNAR
			</ModalButton>
			<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography
						style={{ fontSize: '25px', color: '#000', fontWeight: 'bold', margin: '0 auto 2.5rem auto' }}
						align="center"
						id="modal-modal-title"
					>
						Buy $LUNAR
					</Typography>
					<OutlinedInput
						fullWidth={true}
						id="outlined-adornment-amount"
						type="number"
						placeholder="0.0000"
						color="primary"
						required={false}
						onChange={handleChange('amount')}
						startAdornment={<InputAdornment position="start">Ξ</InputAdornment>}
						label="Amount"
					/>
					<StyledSection style={{ margin: '2.5rem auto 0 auto' }}>
						<CancelButton onClick={handleClose}>Cancel</CancelButton>
						{pendingTx ? (
							<BuyButton startIcon={<CircularProgress thickness={2.5} size={20} />} disabled={true}>
								Pending
							</BuyButton>
						) : (
							<BuyButton onClick={onBuy}>Buy</BuyButton>
						)}
					</StyledSection>
				</Box>
			</Modal>
		</div>
	);
}
