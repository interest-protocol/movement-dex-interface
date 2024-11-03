import {
  COINS,
  FUNGIBLE_ASSETS,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';

import { AmmPool, PoolTypeEnum } from '@/interface';

export const POOL_DATA: ReadonlyArray<AmmPool> = [
  {
    poolObjectId: '123',
    stateId: '123',
    type: '0x00000',
    coins: {
      coinX: values(COINS[Network.Porto])[0],
      coinY: values(FUNGIBLE_ASSETS[Network.Porto])[1],
      lpCoin: '0x0000000000f',
    },
    poolType: PoolTypeEnum.AMM,
    isVolatile: false,
  },
  {
    poolObjectId: '123',
    stateId: '123',
    type: '0x00000',
    coins: {
      coinX: values(FUNGIBLE_ASSETS[Network.Porto])[0],
      coinY: values(COINS[Network.Porto])[1],
      lpCoin: '0x0000000000f',
    },
    poolType: PoolTypeEnum.CLAMM,
    isVolatile: true,
  },
];
