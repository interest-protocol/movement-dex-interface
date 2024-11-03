import { Button, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useDialog } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { PoolForm } from '@/views/pools/pools.types';

import PoolPreview from '../pool-form-preview';

const PoolFormDepositButton: FC = () => {
  const { dialog, handleClose } = useDialog();
  const { setModal, handleClose: closeModal } = useModal();
  const { getValues, control, setValue } = useFormContext<PoolForm>();

  const handleDeposit = async () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  };

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    setValue('explorerLink', '');
  };

  const onDeposit = () => {
    closeModal();
    dialog.promise(handleDeposit(), {
      loading: () => ({
        title: 'Depositing...',
        message: 'We are Depositing, and you will let you know when it is done',
      }),
      success: () => ({
        title: 'Deposit Successfully',
        message:
          'Your deposit was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      }),
      error: () => ({
        title: 'Deposit Failure',
        message:
          'Your deposit failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
    });
  };

  const error = useWatch({ control, name: 'error' });

  const addDeposit = () =>
    !error &&
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} onSubmit={onDeposit} isDeposit />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

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

export default PoolFormDepositButton;
