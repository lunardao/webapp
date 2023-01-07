import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import CoinbaseWalletConnect from '../connectorButtons/CoinbaseWalletConnect';
import MetaMaskConnect from '../connectorButtons/MetaMaskConnect';
import WalletConnect from '../connectorButtons/WalletConnect';

const ConnectButton = styled(Button)({
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

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	height: 400,
	width: 350,
	bgcolor: '#95C9CB',
	borderColor: 'rgba(59, 59, 134, 0.5)',
	borderRadius: '10px',
	boxShadow: 24,
	pt: 4,
	px: 2,
	pb: 2,
};

function ConnectHeader() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<ConnectButton disabled={false} size="large" variant="outlined" fullWidth={true} onClick={handleOpen}>
				Connect
			</ConnectButton>
			<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography
						style={{ fontWeight: 'bold', margin: '0 auto 0.75rem auto' }}
						align="center"
						color={'#000'}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Connect a wallet
					</Typography>
					<MetaMaskConnect />
					<CoinbaseWalletConnect />
					<WalletConnect />
				</Box>
			</Modal>
		</div>
	);
}

export default ConnectHeader;
