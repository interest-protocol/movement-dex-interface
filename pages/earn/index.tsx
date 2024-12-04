import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { FilterTypeEnum } from '@/views/components/farm-filter/farm.types';
import { FormFilterValue } from '@/views/components/info-card/info-card.types';
import Earn from '@/views/earn';
import { IEarnForm } from '@/views/earn/earn.types';

const EarnPage: NextPage = () => {
  const form = useForm<IEarnForm>({
    defaultValues: {
      filterList: [
        { type: FilterTypeEnum.CATEGORY, value: FormFilterValue.official },
      ],
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Earn" />
      <Earn />
    </FormProvider>
  );
};

export default EarnPage;
