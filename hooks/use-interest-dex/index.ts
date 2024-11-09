import {
  getDefaultClient,
  Network,
  SrAmm,
} from '@interest-protocol/aptos-sr-amm';

const network = Network.Porto;

const client = getDefaultClient(network);

const dex = new SrAmm({ network, client });

export const useInterestDex = () => dex;
