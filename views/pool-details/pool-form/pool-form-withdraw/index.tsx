import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from '../pool-field';
import { PoolFormProps } from '../pool-field/pool-field.types';
import WithdrawManager from './pool-form-withdraw-manager';
import Selection from './pool-form-withdraw-receive';
import PoolPreviewFormWithdrawButton from './pool-preview-form-withdraw-button';

const PoolFormWithdraw: FC<PoolFormProps> = ({ poolOptionView }) => (
  <>
    <Typography size="large" variant="title" fontSize="2xl">
      I would like to Withdraw...
    </Typography>
    <Box display="flex" flexDirection="column" gap="m">
      <PoolField index={0} poolOptionView={poolOptionView} />
      <Selection />
    </Box>
    <Box>
      <Typography variant="body" size="large" mb="m">
        Manage your slippage
      </Typography>
      <Box bg="lowestContainer" borderRadius="xs">
        <ManageSlippage />
      </Box>
    </Box>
    <WithdrawManager />
    <PoolPreviewFormWithdrawButton />
  </>
);

export default PoolFormWithdraw;
