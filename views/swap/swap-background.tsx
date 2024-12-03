import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { COIN_TYPE_TO_FA, COINS_EXPOSED } from '@/constants/coin-fa';
import { PRICE_TYPE } from '@/constants/prices';
import { FixedPointMath } from '@/lib';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { formatDollars, parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

const label = 'to';

const POSITIONS = [
  [10, 10],
  [50, 15],
  [5, 50],
  [15, 85],
  [80, 80],
  [70, 50],
];

const SwapBackground: FC = () => {
  const { setValue, getValues } = useFormContext();
  const [exposedCoins, setExposedCoins] = useState<any[]>([]);

  useEffect(() => {
    Promise.all(
      COINS_EXPOSED.map((coin) =>
        fetch(
          `/api/v1/usd-price?type=${coin.address.toString()}&decimals=${coin.decimals}`
        )
          .then((res) => res.json?.() ?? res.text?.())
          .then((value) => {
            console.log(value);

            return formatDollars(FixedPointMath.toNumber(value, coin.decimals));
          })
          .catch(() => '--')
      )
    ).then((prices) =>
      setExposedCoins(
        COINS_EXPOSED.map((coin, index) => ({ ...coin, usd: prices[index] }))
      )
    );
  }, []);

  const onSelect = async (metadata: AssetMetadata) => {
    const [currentToken, opposite] = getValues([label, 'from']);

    if (
      (metadata.standard == TokenStandard.FA
        ? metadata.type
        : COIN_TYPE_TO_FA[metadata.type].toString()) ==
      (opposite.standard == TokenStandard.FA
        ? opposite.type
        : COIN_TYPE_TO_FA[opposite.type].toString())
    )
      return;

    if (
      metadata.standard === opposite.standard &&
      metadata.symbol === opposite.symbol
    ) {
      setValue(label === 'to' ? 'from' : 'to', {
        ...currentToken,
        value: '',
      });
    }

    setValue(label, {
      ...metadata,
      value: '',
      usdPrice: null,
      valueBN: ZERO_BIG_NUMBER,
    });

    if (PRICE_TYPE[metadata.symbol])
      fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
        method: 'POST',
        body: JSON.stringify({ coins: [PRICE_TYPE[metadata.symbol]] }),
        headers: { 'Content-Type': 'application/json', accept: '*/*' },
      })
        .then((response) => response.json())
        .then((data) => setValue(`${label}.usdPrice`, data[0].price))
        .catch(() => null);
  };

  return (
    <Box position="absolute" flex="1" mt="5rem">
      {exposedCoins.map((token) => (
        <Motion
          gap="l"
          key={v4()}
          display="flex"
          cursor="pointer"
          initial="initial"
          whileHover="hover"
          alignItems="center"
          position="absolute"
          onClick={() => onSelect(parseToMetadata(token as MetadataSources))}
          top={`calc(${POSITIONS[~~(POSITIONS.length * Math.random())][0]}vh + ${Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)}rem)`}
          left={`calc(${POSITIONS[~~(POSITIONS.length * Math.random())][1]}vw + ${Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)}rem)`}
        >
          <Motion
            overflow="hidden"
            borderRadius="50%"
            filter="blur(10px)"
            width={['3rem', '7rem']}
            height={['3rem', '7rem']}
            animate={{ y: [-10, 10] }}
            variants={{
              initial: { y: 0 },
              hover: {
                y: [0],
                filter: 'blur(0px)',
                transition: { duration: 0.3 },
              },
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'mirror',
            }}
          >
            <img
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
              alt="this person does not exist"
              src={token.iconUri ?? 'https://thispersondoesnotexist.com'}
            />
          </Motion>
          <Motion
            variants={{
              hover: { scale: 1 },
              initial: { scale: 0 },
            }}
          >
            <Typography
              size="large"
              variant="body"
              fontWeight="bold"
              color="onSurface"
            >
              {token.symbol}
            </Typography>
            <Typography
              size="large"
              variant="body"
              fontWeight="bold"
              color="onSurface"
            >
              {token.usd}
            </Typography>
          </Motion>
        </Motion>
      ))}
    </Box>
  );
};

export default SwapBackground;
