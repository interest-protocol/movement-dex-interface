import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useDialog } from '@/hooks';

import { CreatePoolForm } from '../pool-create.types';

const PoolSummaryButton: FC = () => {
  const { dialog, handleClose } = useDialog();
  const { getValues, resetField } = useFormContext<CreatePoolForm>();

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    resetField('explorerLink');
  };

  const onCreatePool = async () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  };

  const createPool = () =>
    dialog.promise(onCreatePool(), {
      loading: () => ({
        title: 'Create the pool...',
        message: 'We are creating the pool, and you will know when it is done',
      }),
      success: () => ({
        title: 'Pool created successfully',
        message:
          'Your pool was create successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: () => {
            gotoExplorer();
            handleClose();
          },
        },
      }),
      error: () => ({
        title: 'Pool creation failed',
        message:
          'Your pool was not created, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
    });

  return (
    <Button variant="filled" onClick={createPool}>
      Create Pool
    </Button>
  );
};

export default PoolSummaryButton;
