import { Network } from './network';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v5';

export const PAGE_SIZE = 50;

export const RPC_URL = {
  [Network.DEVNET]: 'https://sui.devnet.m2.movementlabs.xyz:443',
  [Network.TESTNET]: 'https://devnet.baku.movementlabs.xyz',
  [Network.PORTO]: 'https://aptos.testnet.porto.movementlabs.xyz/v1',
};

export const FAUCET_URL = {
  [Network.DEVNET]: 'https://sui.devnet.m2.movementlabs.xyz/faucet',
  [Network.TESTNET]: 'https://faucet.devnet.baku.movementlabs.xyz/faucet/web',
  [Network.PORTO]: 'https://mizu.testnet.porto.movementnetwork.xyz/',
};

export const EXPLORER_URL = {
  [Network.DEVNET]: (path: string) =>
    `https://explorer.devnet.m2.movementlabs.xyz/${path}?network=devnet`,
  [Network.TESTNET]: (path: string) =>
    `https://explorer.devnet.baku.movementlabs.xyz/${path}`,
} as Record<Network, (path: string) => string>;

export const TOAST_DURATION = 10000;

export * from './coins';
export * from './network';
export * from './routes';
