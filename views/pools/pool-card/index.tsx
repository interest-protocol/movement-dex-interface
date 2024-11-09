import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import useSrAmmPool from '@/hooks/use-sr-amm-pool';
import { FixedPointMath } from '@/lib';

import { LINES } from './pool-card.data';
import { FormFilterValue, PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardTrade from './pool-card-trade';

const PoolCard: FC<PoolCardProps> = ({ address }) => {
  const { pool, config, loading } = useSrAmmPool(address);
  const [poolData, setPoolData] = useState<ReadonlyArray<string>>([
    'N/A',
    'N/A',
  ]);

  useEffect(() => {
    if (!pool) return;

    setPoolData((data) => [
      data[0],
      `${FixedPointMath.toNumber(BigNumber(String(pool.bidLiquidity)), pool.metadata.decimals)}`,
    ]);
  }, [pool]);

  useEffect(() => {
    if (!config) return;

    setPoolData((data) => [
      `${FixedPointMath.toNumber(BigNumber(String(config.fee)), 9) * 100}%`,
      data[1],
    ]);
  }, [config]);

  return (
    <Link href={`${Routes[RoutesEnum.PoolDetails]}?address=${address}`}>
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
        <PoolCardHeader tags={['SR-AMM', FormFilterValue['volatile']]} />
        <PoolCardInfo
          loading={loading}
          coins={pool ? [pool.metadataX, pool.metadataY] : []}
        />
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
