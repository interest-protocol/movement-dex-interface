import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/aptos-sr-amm';
import { Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { useModal } from '@/hooks/use-modal';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

import { PoolFormButtonProps } from '../pool-form.types';

const PoolFormWithdrawButton: FC<PoolFormButtonProps> = ({ form }) => {
  const dex = useInterestDex();
  const client = useAptosClient();
  const { dialog, handleClose } = useDialog();
  const { account, signTransaction } = useWallet();
  const { handleClose: closeModal } = useModal();
  const { getValues, control, setValue } = form;

  const error = useWatch({ control, name: 'error' });

  const handleWithdraw = async () => {
    try {
      invariant(account, 'You must be connected to proceed');

      const lpCoin = getValues('lpCoin');

      const data = dex.removeLiquidity({
        lpFa: lpCoin.type,
        recipient: account.address,
        amount: BigInt(lpCoin.valueBN.decimalPlaces(0, 1).toString()),
      });

      const tx = await client.transaction.build.simple({
        data,
        sender: account!.address,
      });

      const senderAuthenticator = await signTransaction(tx);

      const txResult = await client.transaction.submit.simple({
        transaction: tx,
        senderAuthenticator,
      });

      await client.waitForTransaction({
        transactionHash: txResult.hash,
        options: { checkSuccess: true },
      });

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.Porto](`txn/${txResult.hash}`)
      );
    } catch (e) {
      console.warn('>> handle withdraw issue. More info: ', { e });

      throw e;
    }
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

  return (
    <Button
      py="s"
      my="l"
      mt="xl"
      mx="auto"
      variant="filled"
      disabled={!!error}
      onClick={onWithdraw}
      width="fill-available"
    >
      <Typography variant="label" size="large" textAlign="center" width="100%">
        Confirm Withdraw
      </Typography>
    </Button>
  );
};

export default PoolFormWithdrawButton;
