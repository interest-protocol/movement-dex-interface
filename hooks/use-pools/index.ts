import useSWR from 'swr';

import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

export const usePools = (page: number = 1, findQuery = {}) => {
  const network = useNetwork();

  return useSWR(
    `https://pool-indexer-production.up.railway.app/api/pool/sr-amm?page=${page}&q=${JSON.stringify(findQuery)}&network=${network}&limit=30`,
    async () => {
      const {
        limit,
        totalItems,
        data: pools,
      } = await fetch(
        `https://pool-indexer-production.up.railway.app/api/pool/sr-amm?page=${page}&q=${JSON.stringify(findQuery)}&network=${network}&limit=30`
      ).then((res) => res.json?.());

      return {
        done: true,
        pools: pools ?? [],
        totalPages: Math.ceil(totalItems / limit),
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};
