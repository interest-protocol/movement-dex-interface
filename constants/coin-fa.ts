import { COIN_TYPES, FA_ADDRESSES } from '@interest-protocol/aptos-move-dex';

const portoCoins = COIN_TYPES.porto;
const portoFAs = FA_ADDRESSES.porto;

export const COIN_TYPE_TO_FA = {
  [portoCoins.APT]: portoFAs.APT,
  [portoCoins.USDC]: portoFAs.USDC,
  [portoCoins.USDT]: portoFAs.USDT,
  [portoCoins.WBTC]: portoFAs.WBTC,
  [portoCoins.WETH]: portoFAs.WETH,
};
