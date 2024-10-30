import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import CreateToken from '@/views/create-token';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';
import { validationSchema } from '@/views/create-token/create-token-form/create-token-form.validation';

const CreateTokenPage: NextPage = () => {
  const form = useForm<ICreateTokenForm>({
    defaultValues: {
      decimals: 8,
      fixedSupply: true,
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
