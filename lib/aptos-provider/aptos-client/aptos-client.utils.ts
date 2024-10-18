import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import invariant from 'tiny-invariant';

export const getAptosClient = (network: string, rpc?: string) => {
  const configParams = rpc
    ? { fullnode: rpc }
    : Object.values(Network).includes(network as Network)
      ? { network: network as Network }
      : null;

  invariant(
    configParams,
    '>> Aptos Client >> Config Params >> Custom Network found, provide the RPC'
  );

  const config = new AptosConfig(configParams);

  return { config, client: new Aptos(config) };
};
