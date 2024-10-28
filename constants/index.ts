import { Network } from '@interest-protocol/aptos-move-dex';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v5';

export const PAGE_SIZE = 50;

export const RPC_URL = {
  [Network.Porto]: 'https://aptos.testnet.porto.movementlabs.xyz/v1',
};

export const FAUCET_URL = {
  [Network.Porto]: 'https://mizu.testnet.porto.movementnetwork.xyz/',
};

export const EXPLORER_URL = {
  [Network.Porto]: (path: string) =>
    `https://explorer.testnet.porto.movementnetwork.xyz/${path}`,
} as Record<Network, (path: string) => string>;

export const TOAST_DURATION = 10000;

export * from './routes';
