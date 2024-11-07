import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import invariant from 'tiny-invariant';

import { NetworkConfig } from '../aptos-provider.types';

export const getAptosClient = ({
  network,
  faucet,
  rpc,
  indexer,
}: NetworkConfig) => {
  const configParams = {
    faucet,
    indexer,
    fullnode: rpc,
    ...(Object.values(Network).includes(network as Network) && {
      network: network as Network,
    }),
  };

  invariant(
    configParams,
    '>> Aptos Client >> Config Params >> Custom Network found, provide the RPC'
  );

  const config = new AptosConfig(configParams);

  return { config, client: new Aptos(config) };
};
