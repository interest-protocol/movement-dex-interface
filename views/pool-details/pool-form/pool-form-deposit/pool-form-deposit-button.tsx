import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/aptos-sr-amm';
import { Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

import { PoolFormButtonProps } from '../pool-form.types';
import { logDepositPool } from '../pool-form.utils';

const PoolFormDepositButton: FC<PoolFormButtonProps> = ({ form }) => {
  const dex = useInterestDex();
  const client = useAptosClient();
  const { dialog, handleClose } = useDialog();
  const { account, signTransaction } = useWallet();
  const { getValues, control, setValue } = form;

  const handleDeposit = async () => {
    try {
      invariant(account, 'You must be connected to proceed');

      const [token0, token1] = getValues('tokenList');

      const data = dex.addLiquidity({
        faA: token0.type,
        faB: token1.type,
        recipient: account.address,
        amountA: BigInt(
          FixedPointMath.toBigNumber(token0.value, token0.decimals).toFixed(0)
        ),
        amountB: BigInt(
          FixedPointMath.toBigNumber(token0.value, token0.decimals).toFixed(0)
        ),
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

      logDepositPool(
        account.address,
        getValues('tokenList.0'),
        getValues('tokenList.1'),
        Network.Porto,
        txResult.hash
      );

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.Porto](`txn/${txResult.hash}`)
      );
    } catch (e) {
      console.warn('>> handle deposit fn error. More info: ', { e });
      throw e;
    }
  };

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    setValue('explorerLink', '');
  };

  const onDeposit = () =>
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

  const error = useWatch({ control, name: 'error' });

  return (
    <Button
      py="s"
      my="xl"
      mt="xl"
      mx="auto"
      variant="filled"
      width="fill-available"
      onClick={onDeposit}
      disabled={!!error}
    >
      <Typography variant="label" size="large" textAlign="center" width="100%">
        Confirm Deposit
      </Typography>
    </Button>
  );
};

export default PoolFormDepositButton;
