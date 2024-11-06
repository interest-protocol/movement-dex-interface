import { COINS, Network } from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';

import { AmmPool, PoolTypeEnum } from '@/interface';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

export const POOL_DATA: ReadonlyArray<AmmPool> = [
  {
    poolObjectId: '123',
    stateId: '123',
    type: '0x00000',
    coins: {
      coinX: {
        ...values(COINS[Network.Porto])[0],
        standard: TokenStandard.COIN,
      },
      coinY: {
        ...values(COINS[Network.Porto])[1],
        standard: TokenStandard.COIN,
      },
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
      coinX: {
        ...values(COINS[Network.Porto])[0],
        standard: TokenStandard.COIN,
      },
      coinY: {
        ...values(COINS[Network.Porto])[1],
        standard: TokenStandard.COIN,
      },
      lpCoin: '0x0000000000f',
    },
    poolType: PoolTypeEnum.CLAMM,
    isVolatile: true,
  },
];
