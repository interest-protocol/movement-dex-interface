import { Button, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useDialog } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { PoolForm } from '@/views/pools/pools.types';

import PoolPreview from '../pool-form-preview';

const PoolFormWithdrawButton: FC = () => {
  const { dialog, handleClose } = useDialog();
  const { setModal, handleClose: closeModal } = useModal();
  const { getValues, control, setValue } = useFormContext<PoolForm>();

  const error = useWatch({ control, name: 'error' });

  const handleWithdraw = async () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  };

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    setValue('explorerLink', '');
  };

  const onWithdraw = () => {
    closeModal();
    dialog.promise(handleWithdraw(), {
      loading: () => ({
        title: 'Withdrawing...',
        message:
          'We are Withdrawing, and you will let you know when it is done',
      }),
      success: () => ({
        title: 'Withdraw Successfully',
        message:
          'Your withdraw was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      }),
      error: () => ({
        title: 'Withdraw Failure',
        message:
          'Your withdrawing failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
    });
  };

  const removeLiquidity = () =>
    !error &&
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} onSubmit={onWithdraw} />
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
      onClick={removeLiquidity}
      disabled={!!error}
    >
      Withdraw
    </Button>
  );
};

export default PoolFormWithdrawButton;
