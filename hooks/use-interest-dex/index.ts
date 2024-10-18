import { InterestDex, Network } from '@interest-protocol/aptos-move-dex';

import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

export const useInterestDex = () => {
  const client = useAptosClient();

  return new InterestDex({ network: Network.Porto, client });
};
