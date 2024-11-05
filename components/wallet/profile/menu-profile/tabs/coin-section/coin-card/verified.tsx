import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useEffect, useState } from 'react';

import { RateDownSVG, RateUpSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
import { PRICE_TYPE } from '@/constants/prices';
import { CoinMetadata, FAMetadata } from '@/interface';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isCoin } from '@/lib/coins-manager/coins-manager.utils';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';

import { VerifiedCoinCardProps } from '../../../user-info.types';
import CardWrapper from './card-wrapper';

const VerifiedCoinCard: FC<VerifiedCoinCardProps> = ({ token, apy }) => {
  const network = useNetwork<Network>();
  const [USDPrice, setUSDPrice] = useState(0);
  const { coinsMap } = useCoins();

  const decimals = token.decimals;
  const symbol = token.symbol;

  const id =
    (token as CoinMetadata).type || (token as FAMetadata).address?.toString();

  const balance = FixedPointMath.toNumber(
    coinsMap[id]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[id]?.metadata.decimals ?? decimals
  );

  useEffect(() => {
    fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
      method: 'POST',
      body: JSON.stringify({ coins: [PRICE_TYPE[symbol]] }),
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    })
      .then((response) => response.json())
      .then((data) => setUSDPrice(data[0].price))
      .catch(() => null);
  }, []);

  return (
    <CardWrapper
      TokenIcon={
        <TokenIcon
          withBg
          size="1.5rem"
          symbol={symbol}
          network={network}
          rounded={!isCoin(token)}
        />
      }
      symbol={symbol}
      supportingText={`${balance} ${symbol}`}
    >
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Typography size="large" variant="label" lineHeight="1.5rem">
          {USDPrice ? (
            formatDollars(
              +BigNumber(balance)
                .times(BigNumber(USDPrice))
                .toNumber()
                .toFixed(3)
            )
          ) : (
            <Box width="1rem" height="1rem" position="relative" display="flex">
              <Box
                position="absolute"
                top="-1.5rem"
                display="flex"
                justifySelf="flex-end"
              >
                <ProgressIndicator variant="loading" size={15} />
              </Box>
            </Box>
          )}
        </Typography>
        <Box
          gap="xs"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {apy < 0.5 ? (
            <RateDownSVG
              width="1rem"
              height="1rem"
              maxHeight="100%"
              maxWidth="100%"
            />
          ) : (
            <RateUpSVG
              width="1rem"
              height="1rem"
              maxHeight="100%"
              maxWidth="100%"
            />
          )}
          <Typography
            size="large"
            opacity={0.7}
            variant="label"
            color="onSurface"
            fontSize="0.625rem"
            lineHeight="1rem"
          >
            {apy}
          </Typography>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default VerifiedCoinCard;
