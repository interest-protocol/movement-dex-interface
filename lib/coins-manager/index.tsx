import { GetFungibleAssetMetadataResponse } from '@aptos-labs/ts-sdk';
import BigNumber from 'bignumber.js';
import { type FC, useEffect, useId } from 'react';
import useSWR from 'swr';

import { isAptos } from '@/utils';

import { useAptosClient } from '../aptos-provider/aptos-client/aptos-client.hooks';
import { useCurrentAccount } from '../aptos-provider/wallet/wallet.hooks';
import { useCoins } from './coins-manager.hooks';
import { Asset, TokenStandard } from './coins-manager.types';

const CoinsManager: FC = () => {
  const id = useId();
  const client = useAptosClient();
  const currentAccount = useCurrentAccount();

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

        const coins: Record<string, Asset> = coinsData.reduce(
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

            if (isAptos(asset_type))
              return {
                ...acc,
                ['0x1::aptos_coin::AptosCoin']: {
                  name,
                  symbol,
                  decimals,
                  standard: TokenStandard.COIN,
                  type: '0x1::aptos_coin::AptosCoin',
                  balance: BigNumber(amount.toString()),
                  ...(!!projectUri && { projectUri }),
                  ...(!!iconUri && { iconUri: iconUri }),
                },
                ['0xa']: {
                  name,
                  symbol,
                  decimals,
                  type: '0xa',
                  standard: TokenStandard.FA,
                  balance: BigNumber(amount.toString()),
                  ...(!!projectUri && { projectUri }),
                  ...(!!iconUri && { iconUri: iconUri }),
                },
              };

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

        setCoins?.(coins);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    {
      refreshInterval: 15000,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );

  useEffect(() => {
    setMutate(mutate);
  }, []);

  return null;
};

export default CoinsManager;
