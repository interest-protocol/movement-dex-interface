import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';

import { LINES } from './pool-card.data';
import { FormFilterValue, PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardTrade from './pool-card-trade';

const PoolCard: FC<PoolCardProps> = ({ pool }) => (
  <Link
    href={`${Routes[RoutesEnum.PoolDetails]}?objectId=${pool.poolObjectId}`}
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
      <PoolCardInfo coins={[pool.coins.coinX, pool.coins.coinY]} />
      <Box px="m" py="xs" bg="surface" borderRadius="1rem">
        {LINES.map((line, index) => (
          <PoolCardTrade {...line} index={index} key={v4()} amount="0" />
        ))}
      </Box>
    </Box>
  </Link>
);

export default PoolCard;
