import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { inc } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { usePools } from '@/hooks/use-pools';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';

import InfoCard from '../components/info-card';
import { FormFilterValue } from '../components/info-card/info-card.types';
import InfoCardSkeleton from '../components/info-card/info-card-skeleton';
import { LINES, POOL_DATA } from './pool.data';
import {
  FilterTypeEnum,
  IPoolForm,
  PoolCardListContentProps,
  PoolCardListProps,
  PoolTabEnum,
} from './pools.types';

const Pools: FC = () => {
  const [page, setPage] = useState(1);
  const [pools, setPools] = useState([[]]);
  const { control, getValues } = useFormContext<IPoolForm>();

  const filterProps = useWatch({
    control,
    name: 'filterList',
  });
  const isFindingPool = useWatch({
    control,
    name: 'isFindingPool',
  });

  const tokenList = getValues('tokenList');

  const { data, isLoading: arePoolsLoading } = usePools(
    page,
    isFindingPool
      ? {
          $and: [
            { metadataX: { $in: tokenList?.map(({ type }) => type) } },
            { metadataY: { $in: tokenList?.map(({ type }) => type) } },
          ],
        }
      : !filterProps?.some(
            (filterProp) =>
              filterProp.type === FilterTypeEnum.CATEGORY &&
              filterProp.value === FormFilterValue.all
          )
        ? {
            poolAddress: {
              $in: POOL_DATA.map(({ poolAddress }) => poolAddress),
            },
          }
        : {}
  );

  useEffect(() => {
    if (isFindingPool || page != 1) {
      setPools([[]]);
      setPage(1);
    }
  }, [isFindingPool, filterProps]);

  useEffect(() => {
    if (data?.pools) setPools([...pools.slice(0, page), data.pools]);
  }, [data?.pools]);

  return (
    <PoolCardListContent
      pools={pools}
      done={!!data?.done}
      next={() => setPage(inc)}
      arePoolsLoading={arePoolsLoading}
      hasMore={(data?.totalPages ?? 0) > page}
    />
  );
};

const Position: FC = () => {
  const { coins } = useCoins();
  const [page, setPage] = useState(1);
  const [pools, setPools] = useState([[]]);
  const { control, getValues } = useFormContext<IPoolForm>();

  const filterProps = useWatch({
    control,
    name: 'filterList',
  });
  const isFindingPool = useWatch({
    control,
    name: 'isFindingPool',
  });

  const tokenList = getValues('tokenList');

  const { data, isLoading: arePoolsLoading } = usePools(
    page,
    isFindingPool
      ? {
          $and: [
            { metadataX: { $in: tokenList?.map(({ type }) => type) } },
            { metadataY: { $in: tokenList?.map(({ type }) => type) } },
            { poolAddress: { $in: coins?.map(({ type }) => type) } },
          ],
        }
      : { poolAddress: { $in: coins?.map(({ type }) => type) } }
  );

  useEffect(() => {
    if (page != 1) {
      setPools([[]]);
      setPage(1);
    }
  }, [isFindingPool, filterProps]);

  useEffect(() => {
    if (data?.pools) setPools([...pools.slice(0, page), data.pools]);
  }, [data?.pools]);

  return (
    <PoolCardListContent
      pools={pools}
      done={!!data?.done}
      next={() => setPage(inc)}
      arePoolsLoading={arePoolsLoading}
      hasMore={(data?.totalPages ?? 0) > page}
    />
  );
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  done,
  next,
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
        <InfoCardSkeleton isPool />
      </Box>
    );

  if (!!pools && !pools.length && done)
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
        {pools?.flatMap((poolPage) =>
          poolPage.map((pool) => (
            <InfoCard
              key={v4()}
              lines={LINES}
              tags={['SR-AMM', FormFilterValue['volatile']]}
              listCoins={pool ? [pool.metadata.x, pool.metadata.y] : []}
              link={`${Routes[RoutesEnum.PoolDetails]}?address=${pool.poolAddress}`}
              infoData={[
                '0.3%',
                `${FixedPointMath.toNumber(BigNumber(String(pool.bidLiquidity)), pool.metadata.pool.decimals)}`,
              ]}
            />
          ))
        )}
        {arePoolsLoading && <InfoCardSkeleton isPool />}
      </Box>
      {hasMore && (
        <Box mx="m" display="flex" justifyContent="center" onClick={next}>
          <Button variant="filled">Load more</Button>
        </Box>
      )}
    </>
  );
};

const PoolCardList: FC<PoolCardListProps> = ({ tab }) =>
  tab === PoolTabEnum.Pools ? <Pools /> : <Position />;

export default PoolCardList;
