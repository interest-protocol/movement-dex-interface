import { POOLS } from '@/constants/pools';
import { PoolTypeEnum, SrAmmPool } from '@/interface';

export const POOL_DATA: ReadonlyArray<SrAmmPool> = POOLS.map(
  ({ address, faX, faY }) => ({
    isVolatile: true,
    poolType: PoolTypeEnum.srAMM,
    poolAddress: address.toString(),
    coins: {
      typeX: faX.toString(),
      typeY: faY.toString(),
    },
  })
);
