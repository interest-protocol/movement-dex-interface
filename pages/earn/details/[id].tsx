import { NextPage } from 'next';

import { SEO } from '@/components';
import Layout from '@/components/layout';
import EarnCardDetails from '@/views/earn/details';

const EarnDetailsPage: NextPage = () => {
  return (
    <Layout>
      <SEO pageTitle="Earn Details" />
      <EarnCardDetails />
    </Layout>
  );
};

export default EarnDetailsPage;
