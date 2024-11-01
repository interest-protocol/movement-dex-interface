import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

// import { useFormContext } from 'react-hook-form';
import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import PoolTitleBar from '../components/pool-title-bar';
import { PoolDetailsFormProps } from './pool-details.types';
import PoolForm from './pool-form';
import PoolInfo from './pool-info';

const PoolDetails: FC<PoolDetailsFormProps> = ({
  poolOptionView,
  handleOptionTab,
}) => {
  const { push } = useRouter();

  return (
    <Layout>
      <PoolTitleBar onBack={() => push(Routes[RoutesEnum.Pools])} />
      <Box
        gap="xs"
        mx="auto"
        maxWidth="65rem"
        overflow="hidden"
        flexDirection="column"
        gridTemplateColumns="3fr 2fr"
        display={['flex', 'flex', 'flex', 'grid']}
        alignItems={['unset', 'unset', 'unset', 'start']}
      >
        <PoolForm
          poolOptionView={poolOptionView}
          handleOptionTab={handleOptionTab}
        />
        <PoolInfo />
      </Box>
    </Layout>
  );
};

export default PoolDetails;
