import { Network } from '@interest-protocol/aptos-sr-amm';
import { FC } from 'react';

import { BTCSVG, ETHSVG, MOVESVG, USDCSVG, USDTSVG } from '@/components/svg';

import { SVGProps } from '../svg/svg.types';

export const TOKEN_ICONS = {
  [Network.Porto]: {
    ETH: ETHSVG,
    WETH: ETHSVG,
    BTC: BTCSVG,
    WBTC: BTCSVG,
    USDC: USDCSVG,
    MOVE: MOVESVG,
    USDT: USDTSVG,
    RUCO: '/images/ruco.webp',
  },
} as unknown as Record<Network, Record<string, string | FC<SVGProps>>>;
