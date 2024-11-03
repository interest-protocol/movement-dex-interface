import {
  COIN_TYPES,
  FA_ADDRESSES,
  Network,
} from '@interest-protocol/aptos-sr-amm';

const PORTO_COINS = COIN_TYPES[Network.Porto];
const PORTO_FAS = FA_ADDRESSES[Network.Porto];

export const COIN_TYPE_TO_FA = {
  [PORTO_COINS.APT]: PORTO_FAS.APT,
  [PORTO_COINS.USDC]: PORTO_FAS.USDC,
  [PORTO_COINS.USDT]: PORTO_FAS.USDT,
  [PORTO_COINS.WBTC]: PORTO_FAS.WBTC,
  [PORTO_COINS.WETH]: PORTO_FAS.WETH,
};
