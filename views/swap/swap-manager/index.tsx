import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { isCoin } from '@/lib/coins-manager/coins-manager.utils';

import { SwapForm } from '../swap.types';
import { getPath } from '../swap.utils';

const SwapManager: FC = () => {
  const dex = useInterestDex();
  const { control, setValue, getValues } = useFormContext<SwapForm>();
  const [fromValue] = useDebounce(
    useWatch({ control, name: 'from.value' }),
    800
  );

  useEffect(() => {
    setValue('error', null);

    if (!Number(fromValue)) {
      setValue('to.value', '0');
      return;
    }

    if (!getValues('to.symbol')) return;

    const to = getValues('to');
    const from = getValues('from');
    const tokenOut = isCoin(to) ? COIN_TYPE_TO_FA[to.type] : to.address;
    const tokenIn = isCoin(from) ? COIN_TYPE_TO_FA[from.type] : from.address;

    const path = getPath(tokenIn, tokenOut).map((address) =>
      address.toString()
    );

    console.log({ path });

    const amountIn = BigInt(
      FixedPointMath.toBigNumber(fromValue, from.decimals).toFixed(0)
    );

    dex
      .quotePathAmountOut({ path, amount: amountIn })
      .then(({ amountOut }) => {
        setValue('path', path);
        setValue(
          'to.value',
          String(
            FixedPointMath.toNumber(
              BigNumber(amountOut!.toString()),
              to.decimals
            )
          )
        );
      })
      .catch((e) => {
        console.warn(e);
        setValue('error', 'Failed to quote. Reduce the Swapping amount.');
      });
  }, [fromValue]);

  return null;
};

export default SwapManager;
