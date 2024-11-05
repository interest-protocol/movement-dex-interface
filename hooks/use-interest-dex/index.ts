import { Network, SrAmm } from '@interest-protocol/aptos-sr-amm';

import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

export const useInterestDex = () => {
  const client = useAptosClient();

  return new SrAmm({ network: Network.Porto, client });
};
