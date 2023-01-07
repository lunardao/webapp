import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import { useState } from 'react';
import Redeem from '../components/RedeemLunar';
import { Share } from '../components/Share';
import { Stake } from '../components/Stake';
import { Timer } from '../components/Timer';
import Join from '../components/modal/BuyLunar';
import Connect from '../components/modal/Connect';
import lunarLogo from '../public/lunarLogo.png';

const StyledSection = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	align-content: center;
	margin: 0 auto 0 auto;

	@media (max-width: 960px) {
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		margin: 0 auto 0 auto;
	}

	@media (max-width: 640px) {
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		margin: 0 auto 0 auto;
	}
`;

export default function IndexPage() {
	const { account } = useWeb3React();
	const [totalStake, userStakes] = Stake();
	const [endBlock, currentBlock] = Timer();
	const [lunarShare, voxShare] = Share();
	const blocksUntilStart = endBlock - currentBlock;
	const remainingDays = (blocksUntilStart * 12) / 86400;
	const remainingHours = (blocksUntilStart * 12) / 3600;

	return (
		<>
			<StyledSection style={{ margin: '2.5rem auto 0 auto', display: 'flex', justifyContent: 'center' }}>
				<Image
					src={lunarLogo}
					alt="Logo LUNAR"
					placeholder="blur"
					priority
					style={{
						objectFit: 'contain',
						width: '50%',
						height: '100%',
					}}
				/>
			</StyledSection>
			<StyledSection style={{ margin: '2.5rem auto 0 auto' }}>
				<b>Genesis Community Sale</b>
			</StyledSection>
			{account ? (
				<>
					<StyledSection style={{ margin: '1rem auto 0 auto' }}>Total Stake</StyledSection>
					{!totalStake ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Skeleton
								variant="text"
								sx={{
									width: 100,
									bgcolor: 'grey.900',
									fontSize: '1rem',
								}}
							/>
						</div>
					) : (
						<StyledSection style={{ margin: '0 auto 0 auto' }}>Ξ {totalStake}</StyledSection>
					)}
					<StyledSection style={{ margin: '1rem auto 0 auto' }}>Your Stake</StyledSection>
					{!userStakes ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Skeleton
								variant="text"
								sx={{
									width: 100,
									bgcolor: 'grey.900',
									fontSize: '1rem',
								}}
							/>
						</div>
					) : (
						<StyledSection style={{ margin: '0 auto 0 auto' }}>Ξ {userStakes}</StyledSection>
					)}
					<StyledSection style={{ margin: '2.5rem auto 2.5rem auto' }}>
						<Join />
					</StyledSection>

					<StyledSection style={{ margin: '0 auto 0 auto' }}>Your current share</StyledSection>
					{!lunarShare ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Skeleton
								variant="text"
								sx={{
									width: 100,
									bgcolor: 'grey.900',
									fontSize: '1rem',
								}}
							/>
						</div>
					) : (
						<StyledSection style={{ margin: '0 auto 0 auto' }}>$LUNAR {lunarShare}</StyledSection>
					)}
					{!voxShare ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Skeleton
								variant="text"
								sx={{
									width: 100,
									bgcolor: 'grey.900',
									fontSize: '1rem',
								}}
							/>
						</div>
					) : (
						<StyledSection style={{ margin: '0 auto 0 auto' }}>$VOX {voxShare}</StyledSection>
					)}
					{blocksUntilStart > 0 ? (
						<StyledSection style={{ margin: '2.5rem auto 0 auto' }}>
							Redeem your share in ~ {remainingDays.toFixed(0)} Day(s) & {remainingHours.toFixed(0)} Hour(s)
						</StyledSection>
					) : (
						<StyledSection style={{ margin: '2.5rem auto 0 auto' }}>
							<Redeem />
						</StyledSection>
					)}
				</>
			) : (
				<StyledSection style={{ margin: '2.5rem auto 0 auto' }}>
					<Connect />
				</StyledSection>
			)}
		</>
	);
}
