import { NextPage } from 'next';

import { SEO } from '@/components';
import { withAddressGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { EarnPageProps } from '@/interface';
import EarnDetails from '@/views/earn-details';

const EarnDetailsPage: NextPage<EarnPageProps> = ({ address }) => {
  console.log(address); //TODO: Use Form Hook here
  return (
    <>
      <SEO pageTitle="Earn Details" />
      <EarnDetails />
    </>
  );
};

export default withAddressGuard(Routes[RoutesEnum.Earn])(EarnDetailsPage);
