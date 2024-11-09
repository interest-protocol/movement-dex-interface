import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { IPoolForm } from '@/views/pools/pools.types';
import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from '../pool-field';
import { PoolFormProps } from '../pool-field/pool-field.types';
import DepositManager from './pool-form-deposit-manager';
import PoolReceiveSection from './pool-form-deposit-receive';
import PoolPreviewFormDepositButton from './pool-preview-form-deposit-button';

const PoolDeposit: FC<PoolFormProps> = ({ poolOptionView }) => {
  const { control } = useFormContext<IPoolForm>();

  const { fields } = useFieldArray({ control, name: 'tokenList' });

  return (
    <>
      <Typography size="large" variant="title" fontSize="2xl">
        I would like to Deposit...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        {fields.map(({ id }, index) => (
          <PoolField key={id} index={index} poolOptionView={poolOptionView} />
        ))}
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
      <PoolPreviewFormDepositButton />
    </>
  );
};

export default PoolDeposit;
