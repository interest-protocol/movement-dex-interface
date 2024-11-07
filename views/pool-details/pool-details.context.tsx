import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useInterestDex } from '@/hooks/use-interest-dex';
import { SdkSrAmmConfig, SdkSrAmmPool } from '@/interface';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { getCoinMetadata, parseToMetadata } from '@/utils';

interface PoolDetailsProviderProps {
  address: string;
}

interface PoolDetailsContext {
  loading: boolean;
  config: SdkSrAmmConfig | undefined;
  pool: SdkSrAmmPool | null | undefined;
  metadata: ReadonlyArray<AssetMetadata> | undefined;
}

const INITIAL: PoolDetailsContext = {
  pool: null,
  loading: true,
  config: undefined,
  metadata: undefined,
};

const poolDetailsContext = createContext<PoolDetailsContext>(INITIAL);

export const PoolDetailsProvider: FC<
  PropsWithChildren<PoolDetailsProviderProps>
> = ({ address, children }) => {
  const dex = useInterestDex();
  const client = useAptosClient();
  const { Provider } = poolDetailsContext;
  const [pool, setPool] = useState<SdkSrAmmPool>();
  const [fetchingPool, setFetchingPool] = useState(true);
  const [config, setConfig] = useState<SdkSrAmmConfig>();
  const [fetchingMetadata, setFetchingMetadata] = useState(true);
  const [metadata, setMetadata] = useState<ReadonlyArray<AssetMetadata>>([]);

  useEffect(() => {
    if (!fetchingPool) return;

    dex.getConfig().then(setConfig);

    dex
      .getPool(address)
      .then((data) => {
        setPool(data);

        const types = [data.metadata.x.toString(), data.metadata.y.toString()];

        if (types.some((type) => Number(type) === 0))
          return setFetchingMetadata(false);

        Promise.all(types.map((type: string) => getCoinMetadata(type, client)))
          .then((typeMetadata) => {
            console.log({ typeMetadata });

            setMetadata(typeMetadata.map(parseToMetadata));
          })
          .finally(() => setFetchingMetadata(false));
      })
      .finally(() => setFetchingPool(false));
  }, []);

  const loading = fetchingPool || fetchingMetadata;

  return (
    <Provider value={{ loading, pool: pool, config, metadata }}>
      {children}
    </Provider>
  );
};

export const usePoolDetails = () => useContext(poolDetailsContext);
