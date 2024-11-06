import { Network, STRICT_POOL } from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';

import { PoolTypeEnum, SrAmmPool } from '@/interface';

export const POOL_DATA: ReadonlyArray<SrAmmPool> = values(
  STRICT_POOL[Network.Porto]
).map(({ address, faX, faY }) => ({
  isVolatile: true,
  poolType: PoolTypeEnum.srAMM,
  poolAddress: address.toString(),
  coins: {
    typeX: faX.toString(),
    typeY: faY.toString(),
  },
}));
