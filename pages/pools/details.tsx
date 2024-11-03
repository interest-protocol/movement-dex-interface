import { COINS, Network } from '@interest-protocol/aptos-move-dex';
import { NextPage } from 'next';
import { values } from 'ramda';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { PoolPageProps } from '@/interface';
import PoolDetails from '@/views/pool-details';
import { PoolForm, PoolOption } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = () => {
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  const handleOptionTab = (index: PoolOption) => setPoolOptionView(index);

  const form = useForm<PoolForm>({
    defaultValues: {
      lpCoin: values(COINS[Network.Porto])[0],
      tokenList: values(COINS[Network.Porto]).slice(0, 2),
      settings: {
        slippage: '0.1',
      },
    },
  });

  useEffect(() => {
    form.resetField('lpCoin.value');
    form.resetField('tokenList.0.value');
    form.resetField('tokenList.1.value');
  }, [poolOptionView]);

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Pool Details" />
      <PoolDetails
        poolOptionView={poolOptionView}
        handleOptionTab={handleOptionTab}
      />
    </FormProvider>
  );
};

export default PoolDetailsPage;
