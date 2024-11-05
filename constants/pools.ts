import { Network, STRICT_POOL } from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';

export const fasByPool = values(STRICT_POOL[Network.Porto]).map(
  ({ faX, faY }) => [faX, faY]
);
