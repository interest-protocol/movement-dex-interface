import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { AmmPool } from '@/interface';

import { POOL_DATA } from './pool.data';
import PoolCard from './pool-card';
import PoolCardSkeleton from './pool-card/pool-card-skeleton';
import {
  PoolCardListContentProps,
  PoolCardListProps,
  PoolTabEnum,
} from './pools.types';

const Pools: FC = () => {
  return (
    <PoolCardListContent
      pools={POOL_DATA as ReadonlyArray<AmmPool>}
      done={false}
      arePoolsLoading={false}
      hasMore={true}
    />
  );
};

const Position: FC = () => {
  return (
    <PoolCardListContent
      pools={POOL_DATA as ReadonlyArray<AmmPool>}
      done={false}
      arePoolsLoading={false}
      hasMore={false}
    />
  );
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  done,
  pools,
  hasMore,
  arePoolsLoading,
}) => {
  if (arePoolsLoading)
    return (
      <Box
        gap="xs"
        display="grid"
        borderRadius="xs"
        p={['s', 's', 's', 'l']}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        <PoolCardSkeleton />
      </Box>
    );

  if (done)
    return (
      <Box width="100%" color="onSurface" my="3xl">
        <Typography size="small" variant="display">
          No pool found!
        </Typography>
      </Box>
    );

  return (
    <>
      <Box
        gap="xs"
        borderRadius="xs"
        p={['s', 's', 's', 'l']}
        display={pools?.length ? 'grid' : 'flex'}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        {pools?.map((pool) => <PoolCard key={v4()} pool={pool} />)}
        {arePoolsLoading && <PoolCardSkeleton />}
      </Box>
      {hasMore && (
        <Box mx="m" display="flex" justifyContent="center">
          <Button variant="filled">Load more</Button>
        </Box>
      )}
    </>
  );
};

const PoolCardList: FC<PoolCardListProps> = ({ tab }) =>
  tab === PoolTabEnum.Pools ? <Pools /> : <Position />;

export default PoolCardList;
