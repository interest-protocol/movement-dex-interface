import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const InputMaxButton: FC<InputProps> = ({ index }) => {
  const { coinsMap } = useCoins();
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: `tokens.${index}.type` });
  const decimals = useWatch({ control, name: `tokens.${index}.decimals` });
  const symbol = useWatch({ control, name: `tokens.${index}.symbol` });

  const balance = FixedPointMath.toNumber(
    coinsMap[type]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[type]?.metadata.decimals ?? decimals
  );

  const handleMax = () => {
    if (isAptos(type) && balance < 1) {
      setValue(`tokens.${index}.value`, '0');
      return;
    }

    setValue(
      `tokens.${index}.value`,
      String(balance - (isAptos(type) ? 1 : 0))
    );
  };

  return (
    <Button
      px="xs"
      py="2xs"
      fontSize="xs"
      variant="outline"
      borderRadius="2xs"
      color="onSurface"
      disabled={!symbol}
      onClick={handleMax}
    >
      MAX
    </Button>
  );
};

export default InputMaxButton;
