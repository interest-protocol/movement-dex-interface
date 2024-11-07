import { COINS, Network } from '@interest-protocol/aptos-sr-amm';
import { NextPage } from 'next';
import { values } from 'ramda';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { withAddressGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { PoolPageProps } from '@/interface';
import PoolDetails from '@/views/pool-details';
import { PoolDetailsProvider } from '@/views/pool-details/pool-details.context';
import { IPoolForm } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ address }) => {
  const form = useForm<IPoolForm>({
    defaultValues: {
      lpCoin: values(COINS[Network.Porto])[0],
      tokenList: values(COINS[Network.Porto]).slice(0, 2),
      settings: { slippage: '0.1' },
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Pool Details" />
      <PoolDetailsProvider address={address}>
        <PoolDetails />
      </PoolDetailsProvider>
    </FormProvider>
  );
};

export default withAddressGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
