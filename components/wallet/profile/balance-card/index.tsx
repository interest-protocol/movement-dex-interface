import { COINS, Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';

const BalanceCard: FC = () => {
  const { coinsMap } = useCoins();
  const defaultCoin = COINS[Network.Porto].APT;

  const type = defaultCoin.type;
  const decimals = defaultCoin.decimals;
  const symbol = defaultCoin.symbol;

  const balance = FixedPointMath.toNumber(
    coinsMap[type]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[type]?.decimals ?? decimals
  );

  return (
    <Box
      my="m"
      px="xl"
      gap="xs"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Typography size="small" variant="display">
        {balance} {symbol}
      </Typography>
      <Typography size="small" opacity="0.7" variant="label" color="onSurface">
        {formatDollars(
          +BigNumber(balance).times(BigNumber(0)).toNumber().toFixed(3)
        )}
      </Typography>
    </Box>
  );
};

export default BalanceCard;
