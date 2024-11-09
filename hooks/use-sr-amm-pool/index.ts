import { AccountAddress } from '@aptos-labs/ts-sdk';
import { useEffect, useState } from 'react';

import { SdkSrAmmConfig, SrAmmPoolWithMetadata } from '@/interface';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { getCoinMetadata, parseToMetadata } from '@/utils';

import { useInterestDex } from '../use-interest-dex';

type MetadataKeys = 'metadata' | 'metadataY' | 'metadataX';

const useSrAmmPool = (address: string) => {
  const dex = useInterestDex();
  const client = useAptosClient();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<SdkSrAmmConfig>();
  const [pool, setPool] = useState<SrAmmPoolWithMetadata>();

  useEffect(() => {
    dex.getConfig().then(setConfig);
    dex
      .getPool(address)
      .then(async (srPool) => {
        const newPool = srPool as unknown as SrAmmPoolWithMetadata;

        const list: ReadonlyArray<[MetadataKeys, AccountAddress]> = [
          ['metadata', srPool.poolAddress],
          ['metadataX', srPool.metadataX],
          ['metadataY', srPool.metadataY],
        ];

        for (const [key, address] of list) {
          const data = await getCoinMetadata(address.toString(), client);

          newPool[key] = parseToMetadata(data);
        }

        setPool(newPool);
      })
      .catch((e) => {
        console.warn('>> Error on "useSrAmmPool". More info: ', { e });
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { loading, error, pool, config };
};

export default useSrAmmPool;
