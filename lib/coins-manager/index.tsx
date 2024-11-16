import { GetFungibleAssetMetadataResponse } from '@aptos-labs/ts-sdk';
import {
  COIN_TYPES,
  FA_ADDRESSES,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { type FC, useEffect, useId } from 'react';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { PRICE_TYPE } from '@/constants/prices';
import { PriceResponse } from '@/interface';
import { isAptos } from '@/utils';

import { useAptosClient } from '../aptos-provider/aptos-client/aptos-client.hooks';
import { useCoins } from './coins-manager.hooks';
import { Asset, TokenStandard } from './coins-manager.types';

const CoinsManager: FC = () => {
  const id = useId();
  const client = useAptosClient();
  const { account: currentAccount } = useAptosWallet();
  const isHideLPToken = useReadLocalStorage<boolean>(
    `${LOCAL_STORAGE_VERSION}-movement-dex-hide-lp-token`
  );
  const { setError, setLoading, setCoins, setMutate } = useCoins();

  useEffect(() => {
    setCoins({});
  }, [currentAccount]);

  const { mutate } = useSWR(
    [id, currentAccount?.address, CoinsManager.name],
    async () => {
      try {
        setError(null);
        setLoading(true);

        if (!currentAccount?.address) return setCoins({});

        const coinsData = await client.getAccountCoinsData({
          accountAddress: currentAccount.address,
        });

        const coinsMetadata: Record<
          string,
          GetFungibleAssetMetadataResponse[0]
        > = {};

        for (const item of coinsData) {
          const metadata = await client.getFungibleAssetMetadataByAssetType({
            assetType: item.asset_type!,
          });

          coinsMetadata[item.asset_type!] = metadata;
        }
        const coins: Record<string, Asset> = coinsData
          .filter(({ metadata }) =>
            isHideLPToken ? !metadata?.symbol.includes('sr-LpFa') : true
          )
          .reduce(
            (acc, { asset_type, amount }) => {
              if (!asset_type || !coinsMetadata[asset_type]) return acc;

              const {
                name,
                symbol,
                decimals,
                token_standard,
                icon_uri: iconUri,
                project_uri: projectUri,
              } = coinsMetadata[asset_type];

              if (isAptos(asset_type)) {
                const type = (
                  token_standard === TokenStandard.COIN
                    ? COIN_TYPES[Network.Porto].APT
                    : FA_ADDRESSES[Network.Porto].APT
                ).toString();

                return {
                  ...acc,
                  [type]: {
                    type,
                    name,
                    symbol,
                    decimals,
                    balance: BigNumber(amount.toString()),
                    standard: token_standard as TokenStandard,
                    ...(!!projectUri && { projectUri }),
                    ...(!!iconUri && { iconUri: iconUri }),
                  },
                };
              }

              return {
                ...acc,
                [asset_type]: {
                  name,
                  symbol,
                  decimals,
                  type: asset_type,
                  balance: BigNumber(amount.toString()),
                  standard:
                    token_standard === 'v1'
                      ? TokenStandard.COIN
                      : TokenStandard.FA,
                  ...(!!projectUri && { projectUri }),
                  ...(!!iconUri && { iconUri: iconUri }),
                },
              };
            },
            {} as Record<string, Asset>
          );

        const coinsPriceType = values(coins)
          .filter(({ symbol }) => PRICE_TYPE[symbol])
          .map(({ type, symbol }) => [type, PRICE_TYPE[symbol]]);

        const prices: ReadonlyArray<PriceResponse> = await fetch(
          'https://rates-api-production.up.railway.app/api/fetch-quote',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: '*/*' },
            body: JSON.stringify({
              coins: coinsPriceType.map(([, type]) => type),
            }),
          }
        ).then((response) => response.json());

        const coinsWithPrice = coinsPriceType.reduce(
          (acc, [coin], index) => ({
            ...acc,
            [coin]: {
              ...coins[coin],
              usdPrice: prices[index].price,
              usdPrice24Change: prices[index].priceChange24HoursPercentage,
            },
          }),
          coins
        );

        setCoins?.(coinsWithPrice);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    {
      refreshInterval: 30000,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
    }
  );

  useEffect(() => {
    setMutate(mutate);
  }, [isHideLPToken]);

  return null;
};

export default CoinsManager;
