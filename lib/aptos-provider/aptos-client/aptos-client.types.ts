import type { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';

import type { NetworkConfig } from '../aptos-provider.types';

export interface AptosClientContext {
  client: Aptos;
  config: AptosConfig;
}

export interface AptosClientProviderProps {
  networks: ReadonlyArray<NetworkConfig>;
}
