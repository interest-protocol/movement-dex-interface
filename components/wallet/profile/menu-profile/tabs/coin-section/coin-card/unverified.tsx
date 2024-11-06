import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import TokenIcon from '@/components/token-icon';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { ZERO_BIG_NUMBER } from '@/utils';

import { UnverifiedCoinCardProps } from '../../../user-info.types';
import CardWrapper from './card-wrapper';

const UnverifiedCoinCard: FC<UnverifiedCoinCardProps> = ({ token }) => {
  const network = useNetwork<Network>();
  const { coinsMap } = useCoins();

  const decimals = token.decimals;
  const symbol = token.symbol;

  const balance = FixedPointMath.toNumber(
    coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[token.type]?.decimals ?? decimals
  );

  return (
    <CardWrapper
      TokenIcon={
        <TokenIcon
          withBg
          size="1.5rem"
          symbol={symbol}
          network={network}
          rounded={token.standard === TokenStandard.FA}
        />
      }
      symbol={symbol}
      supportingText="SEND"
    >
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Typography size="large" variant="label" lineHeight="1.5rem">
          {balance} {symbol}
        </Typography>
      </Box>
    </CardWrapper>
  );
};

export default UnverifiedCoinCard;
