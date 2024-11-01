import { Network } from '@interest-protocol/aptos-move-dex';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { SelectionFieldValues, TokenListProps } from '../../pool-form.types';

const PoolFormWithdrawReceiveTokens: FC<TokenListProps> = ({ type }) => {
  const network = useNetwork<Network>();

  const isOneCoin = type === SelectionFieldValues.OneCoin;

  return (
    <Box py="xs" borderTop="2px solid" borderColor="lowestContainer">
      {[1, 2].map(() => (
        <Box
          py="m"
          px="xl"
          key={v4()}
          display="flex"
          cursor="pointer"
          alignItems="center"
          justifyContent="space-between"
          transition="all 350ms ease-in-out"
          nHover={isOneCoin && { bg: 'lowContainer' }}
        >
          <Box display="flex" gap="xs" alignItems="center">
            <TokenIcon withBg network={network} symbol={'USDT'} />
            <Typography variant="body" size="large">
              Move
            </Typography>
          </Box>
          <Typography variant="body" ml="m" size="large">
            10
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PoolFormWithdrawReceiveTokens;
