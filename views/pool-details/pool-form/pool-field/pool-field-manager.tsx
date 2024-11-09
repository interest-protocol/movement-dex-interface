import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { NameProps } from './pool-field.types';

const PoolFieldManager: FC<NameProps> = ({ name }) => {
  const { pool } = usePoolDetails();
  const { control, setValue, getValues } = useFormContext<IPoolForm>();

  const amount = useWatch({ control, name: `${name}.value` });

  useEffect(() => {
    if (!pool) return;

    const reserve0 = FixedPointMath.toNumber(
      BigNumber(String(pool.balanceX)),
      pool.metadataX.decimals
    );
    const reserve1 = FixedPointMath.toNumber(
      BigNumber(String(pool.balanceY)),
      pool.metadataY.decimals
    );
    const supply = FixedPointMath.toNumber(
      BigNumber(String(pool.supply)),
      pool.metadata.decimals
    );

    if (!getValues(`${name}.locked`)) return;

    if (name !== 'lpCoin') {
      const first = 'tokenList.0' === name;
      const reserveX = first ? reserve0 : reserve1;
      const reserveY = first ? reserve1 : reserve0;

      const amountX = Number(amount);
      const amountY = (amountX * reserveY) / reserveX;

      const liquidityX = (amountX * supply) / reserveX;
      const liquidityY = (amountY * supply) / reserveY;

      const liquidity = liquidityX > liquidityY ? liquidityY : liquidityX;

      setValue(`tokenList.${!first ? '0' : '1'}.value`, String(amountY));
      setValue('lpCoin.value', String(liquidity));
    } else {
      const lpAmount = Number(amount);

      const amount0 = (lpAmount * reserve0) / supply;
      const amount1 = (lpAmount * reserve1) / supply;

      setValue(`tokenList.0.value`, String(amount0));
      setValue(`tokenList.1.value`, String(amount1));
    }
  }, [amount]);

  return null;
};

export default PoolFieldManager;
