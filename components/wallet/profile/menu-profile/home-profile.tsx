import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CoinSVG } from '@/components/svg';

import BalanceCard from '../balance-card';

const HomeProfile: FC = () => {
  return (
    <>
      <BalanceCard />
      <Box display="flex" gap="xs" p="xl"></Box>
      <Box
        my="m"
        px="xl"
        gap="xs"
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography size="small" variant="label">
          Coins
        </Typography>
        <Typography
          size="small"
          opacity="0.7"
          variant="label"
          color="onSurface"
        >
          NFA
        </Typography>
      </Box>
      <Box
        p="l"
        gap="s"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <CoinSVG
          width="6.765rem"
          height="7.476rem"
          maxHeight="100%"
          maxWidth="100%"
        />
        <Typography size="medium" variant="label">
          No tokens yet
        </Typography>
        <Typography
          size="small"
          opacity="0.7"
          variant="label"
          color="onSurface"
          textAlign="center"
        >
          Buy or transfer tokens to this wallet to get started.
        </Typography>
      </Box>
    </>
  );
};

export default HomeProfile;
