import { Network } from '@interest-protocol/aptos-move-dex';

import { CoinMetadata, FAMetadata } from '@/interface';
import { Quest } from '@/server/model/quest';

import { SwapToken } from './swap.types';

export const logSwap = (
  address: string,
  from: SwapToken,
  to: SwapToken,
  network: Network,
  txDigest: string
) =>
  fetch(`/api/v1/log-quest?network=${network}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      address,
      txDigest,
      kind: 'swap',
      data: {
        coinIn: {
          id:
            (from as CoinMetadata).type ??
            (from as FAMetadata).address.toString(),
          amount: from.value,
          symbol: from.symbol,
        },
        coinOut: {
          id:
            (from as CoinMetadata).type ??
            (from as FAMetadata).address.toString(),
          amount: to.value,
          symbol: to.symbol,
        },
      },
    } as Omit<Quest, 'timestamp'>),
  });
