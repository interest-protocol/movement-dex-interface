import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SuiCoinsSVG } from '@/components/svg';

import CoinCard from './coin-card';
import NoCoin from './no-coin';

const CoinSection: FC = () => {
  const existCoin = true;

  return (
    <Box
      p="l"
      gap="s"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      {existCoin ? (
        <Box display="flex" flexDirection="column" gap="xs">
          <CoinCard
            Icon={SuiCoinsSVG}
            coin="123"
            usdPrice={0.89}
            percentage={2.0}
            balance="0.018 ADA"
          />
          <Typography
            mt="s"
            size="large"
            opacity={0.7}
            variant="label"
            color="onSurface"
          >
            12 unverified coins
          </Typography>
        </Box>
      ) : (
        <NoCoin />
      )}
    </Box>
  );
};

export default CoinSection;
