import {
  AccountAddress,
  Aptos,
  InputViewFunctionData,
} from '@aptos-labs/ts-sdk';
import { FUNGIBLE_ASSETS, Network } from '@interest-protocol/aptos-sr-amm';
import { pathOr, propOr } from 'ramda';
import invariant from 'tiny-invariant';

import { CoinBalance } from '@/interface';

export const isAptos = (id: string) =>
  id === '0x1::aptos_coin::AptosCoin' || Number(id) === 0xa;

export const getCoinTypeFromCoinStoreType = (coinStoreType: string) =>
  coinStoreType.split('<')[1].split('>')[0];

export const getAddressCoinBalances = async (
  account: string,
  client: Aptos
): Promise<CoinBalance[]> => {
  const data = await client.getAccountResources({
    accountAddress: AccountAddress.from(account),
  });

  return data
    .filter((resource) => resource.type.startsWith('0x1::coin::CoinStore'))
    .map((resource) => ({
      type: getCoinTypeFromCoinStoreType(resource.type),
      balance: BigInt(pathOr(0, ['data', 'coin', 'value'], resource)),
    }));
};

export const getFaPrimaryStore = async (
  owner: string,
  fa: string,
  client: Aptos
) => {
  try {
    const payload: InputViewFunctionData = {
      function: `0x1::primary_fungible_store::primary_store`,
      functionArguments: [owner, fa],
      typeArguments: ['0x1::fungible_asset::Metadata'],
    };

    const data = await client.view({ payload });

    invariant(data.length > 0, 'Data is empty');

    const inner = propOr('', 'inner', data[0]);

    invariant(inner, 'Inner is empty');

    const x = await client.getAccountResource({
      accountAddress: inner as `${string}::${string}::${string}`,
      resourceType: `0x1::fungible_asset::FungibleStore`,
    });

    const key: string = pathOr('', ['metadata', 'inner'], x);

    return {
      balance: BigInt(propOr(0, 'balance', x)),
      frozen: propOr(false, 'frozen', x),
      fa: FUNGIBLE_ASSETS[Network.Porto][key],
    };
  } catch {
    return {
      balance: BigInt(0),
      frozen: false,
      fa: FUNGIBLE_ASSETS[Network.Porto][fa],
    };
  }
};
