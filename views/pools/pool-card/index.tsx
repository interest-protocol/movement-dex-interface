import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { values } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { getCoinMetadata, parseToMetadata } from '@/utils';

import { LINES } from './pool-card.data';
import { FormFilterValue, PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardTrade from './pool-card-trade';

const PoolCard: FC<PoolCardProps> = ({ pool }) => {
  const dex = useInterestDex();
  const client = useAptosClient();
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<ReadonlyArray<AssetMetadata>>([]);
  const [poolData, setPoolData] = useState<ReadonlyArray<string>>([
    'N/A',
    'N/A',
  ]);

  useEffect(() => {
    setLoading(true);
    Promise.all(values(pool.coins).map((coin) => getCoinMetadata(coin, client)))
      .then((metadata) => setCoins(metadata.map(parseToMetadata)))
      .finally(() => setLoading(false));

    dex
      .getPool(pool.poolAddress)
      .then(({ srPool, faMetadata }) =>
        setPoolData((data) => [
          data[0],
          `${FixedPointMath.toNumber(BigNumber(String(srPool.bidLiquidity)), faMetadata.decimals)}`,
        ])
      );

    dex
      .getConfig()
      .then(({ fee }) =>
        setPoolData((data) => [
          `${FixedPointMath.toNumber(BigNumber(String(fee)), 9) * 100}%`,
          data[1],
        ])
      );
  }, []);

  return (
    <Link
      href={`${Routes[RoutesEnum.PoolDetails]}?address=${pool.poolAddress}`}
    >
      <Box
        p="m"
        flex="1"
        gap="xs"
        height="100%"
        display="flex"
        borderRadius="xs"
        bg="lowestContainer"
        flexDirection="column"
        border="0.063rem solid"
        borderColor="outlineVariant"
        justifyContent="space-between"
        transition="all 300ms ease-in-out"
        nHover={{
          cursor: 'pointer',
          borderColor: '#76767A',
          boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
          '.arrow-wrapper': { opacity: 1 },
        }}
      >
        <PoolCardHeader
          tags={[
            pool.poolType,
            FormFilterValue[pool.isVolatile ? 'volatile' : 'stable'],
          ]}
        />
        <PoolCardInfo loading={loading} coins={coins} />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          {LINES.map((line, index) => (
            <PoolCardTrade
              {...line}
              key={v4()}
              index={index}
              amount={poolData[index] ?? 'N/A'}
            />
          ))}
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCard;
