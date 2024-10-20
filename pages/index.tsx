import { FUNGIBLE_ASSETS, Network } from '@interest-protocol/aptos-move-dex';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const form = useForm<SwapForm>({
    defaultValues: {
      from: {
        value: '0',
        ...FUNGIBLE_ASSETS[Network.Porto].USDT,
      },
      to: {
        ...FUNGIBLE_ASSETS[Network.Porto].USDC,
        value: '0',
      },
      settings: {
        slippage: '1',
      },
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Trade" />
      <Swap />
    </FormProvider>
  );
};

export default SwapPage;
