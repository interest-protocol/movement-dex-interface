import { Button, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { IPoolForm } from '@/views/pools/pools.types';

import PoolPreview from '../pool-form-preview';
import PoolFormDepositButton from './pool-form-deposit-button';

const PoolPreviewFormDepositButton: FC = () => {
  const { setModal } = useModal();
  const form = useFormContext<IPoolForm>();
  const { getValues, control } = form;

  const error = useWatch({ control, name: 'error' });

  const addDeposit = async () => {
    !error &&
      (await setModal(
        <Motion
          animate={{ scale: 1 }}
          initial={{ scale: 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <PoolPreview
            getValues={getValues}
            onSubmit={<PoolFormDepositButton form={form} />}
            isDeposit
          />
        </Motion>,
        {
          isOpen: true,
          custom: true,
          opaque: false,
          allowClose: true,
        }
      ));
  };

  return (
    <Button
      py="s"
      mt="xl"
      mx="auto"
      variant="filled"
      width="max-content"
      onClick={addDeposit}
      disabled={!!error}
    >
      Deposit
    </Button>
  );
};

export default PoolPreviewFormDepositButton;
