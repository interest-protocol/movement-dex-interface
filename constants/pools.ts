import { AccountAddress } from '@aptos-labs/ts-sdk';
import { Network, STRICT_POOL } from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';

export const RUCO_POOL = {
  address: AccountAddress.from(
    '0x1872148d223089c84e368855fbfcd2c07cc7a6e6589e597094a35928f37dde41'
  ),
  faX: AccountAddress.from('0xa'),
  faY: AccountAddress.from(
    '0xf0949330b384afdfce50661211adec99aaafb70f2c5ddee993fec4b60947b31e'
  ),
  projectUri: 'https://www.interest.xyz',
  symbol: 'sr-LpFa',
  name: 'sr-MOVE/RUCO',
  decimals: 8,
};

export const POOLS = [...values(STRICT_POOL[Network.Porto]), RUCO_POOL];

export const fasByPool = POOLS.map(({ faX, faY }) => [faX, faY]);
