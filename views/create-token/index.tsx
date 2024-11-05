import { FC } from 'react';

import Layout from '@/components/layout';

import CreateTokenForm from './create-token-form';

const CreateToken: FC = () => (
  <Layout title="Create Token">
    <CreateTokenForm />
  </Layout>
);

export default CreateToken;
