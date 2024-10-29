import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CoinSVG, FireSVG, MergeSVG } from '@/components/svg';

import AssetInfo from '../asset-info';
import BalanceCard from '../balance-card';

const MenuContent: FC = () => {
  return (
    <>
      <BalanceCard balance={0} dollarAmount={0} />
      <Box display="flex" gap="xs" p="xl">
        <AssetInfo Icon={FireSVG} label="Burn scams" />
        <AssetInfo Icon={MergeSVG} label="Merge coin" />
      </Box>
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
          Token
        </Typography>
        <Typography
          size="small"
          opacity="0.7"
          variant="label"
          color="onSurface"
        >
          NFT
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

export default MenuContent;
