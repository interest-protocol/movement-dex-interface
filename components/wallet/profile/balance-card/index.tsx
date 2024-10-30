import { COINS, Network } from '@interest-protocol/aptos-move-dex';
import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';

const BalanceCard: FC = () => {
  const { coinsMap } = useCoins();
  const coins = values(COINS[Network.Porto]);
  const type = coins[0].type;
  const decimals = coins[0].decimals;
  const symbol = coins[0].symbol;

  const balance = FixedPointMath.toNumber(
    coinsMap[type]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[type]?.metadata.decimals ?? decimals
  );

  if (!balance)
    return (
      <Box my="m" px="xl" gap="xs" width="100%">
        <Typography
          size="small"
          opacity="0.7"
          variant="label"
          color="onSurface"
        >
          {'--'}
        </Typography>
      </Box>
    );

  return (
    <Box
      my="m"
      px="xl"
      gap="xs"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Typography size="small" variant="display">
        {balance} {symbol}
      </Typography>
      <Typography size="small" opacity="0.7" variant="label" color="onSurface">
        {balance
          ? formatDollars(
              +BigNumber(balance).times(BigNumber(0)).toNumber().toFixed(3)
            )
          : '--'}{' '}
      </Typography>
    </Box>
  );
};

export default BalanceCard;
