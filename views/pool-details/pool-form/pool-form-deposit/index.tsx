import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from '../pool-field';
import { PoolFormProps } from '../pool-field/pool-field.types';
import PoolFormDepositButton from './pool-form-deposit-button';
import DepositManager from './pool-form-deposit-manager';
import PoolReceiveSection from './pool-form-deposit-receive';

const PoolDeposit: FC<PoolFormProps> = ({ poolOptionView }) => {
  return (
    <>
      <Typography size="large" variant="title" fontSize="2xl">
        I would like to Deposit...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        <PoolField index={0} poolOptionView={poolOptionView} />
        <PoolField index={1} poolOptionView={poolOptionView} />
      </Box>
      <PoolReceiveSection />
      <Box>
        <Typography variant="body" size="large" mb="m">
          Manage your slippage
        </Typography>
        <Box bg="lowestContainer" borderRadius="xs">
          <ManageSlippage />
        </Box>
      </Box>
      <DepositManager />
      <PoolFormDepositButton />
    </>
  );
};

export default PoolDeposit;
