import useSWR from 'swr';

import { ISrPool } from '@/interface';
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

      const uniquePools = pools?.reduce((acc: ISrPool[], pool: ISrPool) => {
        if (!acc.find((p) => p.poolAddress === pool.poolAddress)) {
          acc.push(pool);
        }
        return acc;
      }, []);

      return {
        done: true,
        pools: uniquePools ?? [],
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
