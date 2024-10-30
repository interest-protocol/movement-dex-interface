import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network, STRICT_POOLS } from '@interest-protocol/aptos-move-dex';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DotErrorSVG } from '@/components/svg';
import { EXPLORER_URL } from '@/constants';
import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { useDialog } from '@/hooks';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { useCurrentAccount } from '@/lib/aptos-provider/wallet/wallet.hooks';
import { isCoin } from '@/lib/coins-manager/coins-manager.utils';

import SuccessModal from '../components/success-modal';
import SuccessModalTokenCard from '../components/success-modal/success-modal-token-card';
import { SwapForm } from './swap.types';

const SwapButton = () => {
  const dex = useInterestDex();
  const client = useAptosClient();
  const account = useCurrentAccount();
  const { signTransaction } = useWallet();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { getValues, setValue, control } = useFormContext<SwapForm>();

  const error = useWatch({ control, name: 'error' });
  const symbolIn = useWatch({ control, name: 'from.symbol' });
  const symbolOut = useWatch({ control, name: 'to.symbol' });

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');
  };

  const handleSwap = async () => {
    try {
      setLoading(true);

      if (!account) return;

      const { from, to } = getValues();

      const tokenOut = isCoin(to)
        ? COIN_TYPE_TO_FA[to.type].toString()
        : to.address.toString();
      const tokenIn = isCoin(from) ? from.type : from.address.toString();
      const pool = STRICT_POOLS[Network.Porto][1].address.toString();
      const amountIn = BigInt(
        FixedPointMath.toBigNumber(from.value, from.decimals).toFixed(0)
      );

      const swapFn = isCoin(from)
        ? (coinIn: string, faOut: string) =>
            dex.swapCoinToFa({
              pool,
              coinIn,
              faOut,
              amountIn,
              minAmountOut: BigInt(0),
              recipient: account.address,
            })
        : (faIn: string, faOut: string) =>
            dex.swap({
              pool,
              faIn,
              faOut,
              amountIn,
              minAmountOut: BigInt(0),
              recipient: account.address,
            });

      const data = swapFn(tokenIn, tokenOut);

      const tx = await client.transaction.build.simple({
        data,
        sender: account.address,
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
    } finally {
      setLoading(false);
    }
  };

  const onSwap = () =>
    dialog.promise(handleSwap(), {
      loading: () => ({
        title: 'Swapping...',
        message: 'We are swapping, and you will let you know when it is done',
      }),
      error: () => ({
        title: 'Swap Failure',
        message:
          'Your swap failed, please try to increment your slippage and try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
      success: () => ({
        title: 'Swap Successful',
        message: (
          <SuccessModal transactionTime={`${0}`}>
            <SuccessModalTokenCard
              from={getValues('from')}
              to={getValues('to')}
            />
          </SuccessModal>
        ),
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

  const disabled = !(symbolIn && symbolOut);

  return (
    <Box display="flex" flexDirection="column" gap="l">
      {error && (
        <Box
          p="s"
          mx="xl"
          gap="s"
          display="flex"
          borderRadius="xs"
          border="1px solid"
          bg="errorContainer"
          color="onErrorContainer"
          borderColor="onErrorContainer"
        >
          <DotErrorSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          <Typography variant="label" size="medium">
            {error}
          </Typography>
        </Box>
      )}
      <Button
        py="m"
        variant="filled"
        onClick={onSwap}
        disabled={disabled}
        justifyContent="center"
      >
        <Typography variant="label" size="large">
          {loading ? 'Swapping...' : 'Confirm Swap'}
        </Typography>
      </Button>
    </Box>
  );
};

export default SwapButton;
