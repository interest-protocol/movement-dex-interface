import { Network, STRICT_POOLS } from '@interest-protocol/aptos-move-dex';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { isCoin } from '@/lib/coins-manager/coins-manager.utils';

import { SwapForm } from '../swap.types';

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

    const to = getValues('to');
    const from = getValues('from');
    const tokenOut = isCoin(to) ? to.type : to.address?.toString();
    const tokenIn = isCoin(from) ? from.type : from.address?.toString();
    const pool = STRICT_POOLS[Network.Porto][1].address.toString();
    const amountIn = BigInt(
      FixedPointMath.toBigNumber(fromValue, from.decimals).toFixed(0)
    );

    const quoteFn =
      isCoin(from) && isCoin(to)
        ? (coinIn: string, coinOut: string) =>
            dex.quoteSwapCoinToCoin({ pool, coinIn, coinOut, amountIn })
        : isCoin(from)
          ? (coinIn: string, faOut: string) =>
              dex.quoteSwapCoinToFa({ pool, amountIn, coinIn, faOut })
          : isCoin(to)
            ? (faIn: string, coinOut: string) =>
                dex.quoteSwapFaToCoin({ pool, amountIn, faIn, coinOut })
            : (faIn: string, faOut: string) =>
                dex.quoteSwap({ pool, amountIn, faIn, faOut });

    quoteFn(tokenIn, tokenOut)
      .then(({ amountOut }) =>
        setValue(
          'to.value',
          String(
            FixedPointMath.toNumber(
              BigNumber(amountOut!.toString()),
              to.decimals
            )
          )
        )
      )
      .catch(() => {
        setValue('error', 'Failed to quote. Reduce the Swapping amount.');
      });
  }, [fromValue]);

  return null;
};

export default SwapManager;
