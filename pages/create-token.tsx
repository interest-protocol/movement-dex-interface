import { yupResolver } from '@hookform/resolvers/yup';
import { FA_ADDRESSES, Network } from '@interest-protocol/aptos-sr-amm';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import CreateToken from '@/views/create-token';
import { validationSchema } from '@/views/create-token/create-token-form/create-token-form.validation';

const CreateTokenPage: NextPage = () => {
  const form = useForm({
    defaultValues: {
      decimals: 8,
      fixedSupply: true,
      pool: { active: true, quote: FA_ADDRESSES[Network.Porto].APT },
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Create Token" />
      <CreateToken />
    </FormProvider>
  );
};

export default CreateTokenPage;
