import { UserTransactionResponse } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Button } from '@interest-protocol/ui-kit';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import SuccessModal from '@/views/components/success-modal';

import { ICreateTokenForm } from '../create-token.types';
import { logCreateToken } from '../create-token.utils';

const CreateTokenFormButton = () => {
  const dex = useInterestDex();
  const client = useAptosClient();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { account, signTransaction } = useWallet();
  const { control, setValue, reset } = useFormContext<ICreateTokenForm>();

  const values = useWatch({ control });

  const gotoExplorer = () =>
    window.open(values.explorerLink, '_blank', 'noopener,noreferrer');

  const ableToMerge = !!(
    account &&
    !loading &&
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
      invariant(ableToMerge, 'Button must be enabled');

      setLoading(true);

      const {
        name,
        pool,
        symbol,
        supply,
        decimals,
        imageUrl: iconURI,
        projectUrl: projectURI,
      } = values;

      invariant(
        name && symbol && decimals && supply,
        'You must fill the required fields'
      );

      const data = values.pool?.active
        ? dex.deployMemeFA({
            name,
            symbol,
            iconURI,
            decimals,
            projectURI,
            recipient: account!.address,
            totalSupply: BigInt(
              FixedPointMath.toBigNumber(supply!, decimals).toString()
            ),
            liquidityMemeAmount: BigInt(
              FixedPointMath.toBigNumber(pool!.tokenValue!, decimals).toString()
            ),
            liquidityAptosAmount: BigInt(
              FixedPointMath.toBigNumber(pool!.quoteValue!).toString()
            ),
          })
        : dex.createFA({
            name,
            symbol,
            iconURI,
            decimals,
            projectURI,
            recipient: account!.address,
            totalSupply: BigInt(
              FixedPointMath.toBigNumber(supply!, decimals).toString()
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

      if (pool?.active) {
        client
          .getTransactionByHash({
            transactionHash: txResult.hash,
          })
          .then((txn) => {
            const poolId = (txn as UserTransactionResponse).events.find(
              (event) => event.type.endsWith('::events::AddLiquidity')
            )!.data.pool;

            fetch(
              'https://pool-indexer-production.up.railway.app/api/pool/sr-amm',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  poolId,
                  network: Network.Porto,
                }),
              }
            );
          });
      }

      logCreateToken(
        account!.address,
        symbol,
        !!pool?.active,
        Network.Porto,
        txResult.hash
      );

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.Porto](`txn/${txResult.hash}`)
      );
    } catch (e) {
      console.warn({ e });
      throw e;
    } finally {
      reset();
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
    <Box display="flex">
      <Button
        py="m"
        flex="1"
        variant="filled"
        onClick={onSubmit}
        justifyContent="center"
        disabled={!ableToMerge}
      >
        Create coin
      </Button>
    </Box>
  );
};

export default CreateTokenFormButton;
