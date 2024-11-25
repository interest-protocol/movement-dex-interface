import { useAptosWallet } from '@razorlabs/wallet-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { TREASURY } from '@/constants';
import { EXCHANGE_FEE_BPS } from '@/constants/fees';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { MosaicQuoteResponse } from '../swap.types';

const SwapManager: FC = () => {
  const { account } = useAptosWallet();
  const { control, setValue, getValues } = useFormContext();

  const [value] = useDebounce(useWatch({ control, name: 'from.value' }), 800);

  useEffect(() => {
    setValue('error', null);

    if (!Number(value)) {
      setValue('to.value', '0');
      setValue('to.valueBN', ZERO_BIG_NUMBER);
      return;
    }

    const to = getValues('to');
    const from = getValues('from');

    fetch(
      `https://testnet.mosaic.ag/porto/v1/quote?srcAsset=${from.type}&dstAsset=${to.type}&amount=${from.valueBN.toFixed(0)}&feeInBps=${EXCHANGE_FEE_BPS}&feeReceiver=${TREASURY}&slippage=${getValues('settings.slippage')}&sender=${account?.address}`,
      {
        headers: {
          'x-api-key': 'tYPtSqDun-w9Yrric2baUAckKtzZh9U0',
        },
      }
    )
      .then((res) => res.json?.())
      .then((data: MosaicQuoteResponse) => {
        if (data.message !== 'successfully')
          throw new Error('Not successfully');

        const value = BigNumber(data.data.dstAmount);

        setValue('to.valueBN', value);
        setValue(
          'to.value',
          String(FixedPointMath.toNumber(value, to.decimals))
        );
        setValue('path', data.data.paths);
        setValue('payload', {
          function: data.data.tx.function,
          typeArguments: data.data.tx.typeArguments,
          functionArguments: values(data.data.tx.functionArguments),
        });
      })
      .catch((e) => {
        console.warn(e);
        setValue('error', 'Failed to quote');
      });
  }, [value]);

  return null;
};

export default SwapManager;
