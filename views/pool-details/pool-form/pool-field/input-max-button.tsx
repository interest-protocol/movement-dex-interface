import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { NameProps } from './pool-field.types';

const MaxButton: FC<NameProps> = ({ name }) => {
  const { coinsMap } = useCoins();
  const { setValue, control } = useFormContext<IPoolForm>();

  const token = useWatch({ control, name });

  const balance = FixedPointMath.toNumber(
    coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER,
    token.decimals
  );

  const handleMax = () => {
    setValue(`lpCoin.locked`, false);
    setValue(`tokenList.0.locked`, false);
    setValue(`tokenList.1.locked`, false);
    setValue(`${name}.locked`, true);

    if (isAptos(token.type) && balance < 1) {
      setValue(`${name}.value`, '0');
      return;
    }

    setValue(`${name}.value`, String(balance - (isAptos(token.type) ? 1 : 0)));
  };

  return (
    <Button
      px="xs"
      py="2xs"
      fontSize="xs"
      variant="outline"
      borderRadius="2xs"
      color="onSurface"
      onClick={handleMax}
    >
      MAX
    </Button>
  );
};

export default MaxButton;
