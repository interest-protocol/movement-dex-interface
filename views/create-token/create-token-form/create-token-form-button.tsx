import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Button } from '@interest-protocol/ui-kit';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useDialog } from '@/hooks';
import SuccessModal from '@/views/components/success-modal';

import { ICreateTokenForm } from '../create-token.types';

const CreateTokenFormButton = () => {
  const { account } = useWallet();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { control } = useFormContext<ICreateTokenForm>();

  const values = useWatch({ control });

  const gotoExplorer = () =>
    window.open(values.explorerLink, '_blank', 'noopener,noreferrer');

  const ableToMerge = !!(
    !account &&
    loading &&
    values.name &&
    values.symbol &&
    String(values.decimals) &&
    values.supply &&
    (values.pool?.active
      ? Number(values.pool.quoteValue) && Number(values.pool.tokenValue)
      : true)
  );

  const handleCreateToken = async () => {
    try {
      setLoading(true);
      console.log(values);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () =>
    dialog.promise(handleCreateToken(), {
      loading: () => ({
        title: 'Creating Token...',
        message:
          'We are creating the token, and you will let you know when it is done',
      }),
      error: () => ({
        title: 'Creation Failure',
        message:
          'Your token creation failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
      success: () => ({
        title: 'Token Created!',
        message: <SuccessModal transactionTime={`${0}`}></SuccessModal>,
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: (
          <Button
            mr="s"
            color="onSurface"
            variant="outline"
            onClick={handleClose}
          >
            got it
          </Button>
        ),
      }),
    });

  return (
    <Box display="flex" justifyContent="center">
      <Button
        py="s"
        px="xl"
        fontSize="s"
        bg="primary"
        type="submit"
        variant="filled"
        color="onPrimary"
        borderRadius="xs"
        fontFamily="Proto"
        onSubmit={onSubmit}
        disabled={ableToMerge}
      >
        Create coin
      </Button>
    </Box>
  );
};

export default CreateTokenFormButton;
