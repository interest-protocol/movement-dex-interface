import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const InputTokenMaxButton: FC = () => {
  const { control, setValue } = useFormContext<ICreateTokenForm>();

  const symbol = useWatch({ control, name: `symbol` });
  const balance = useWatch({ control, name: `supply` });
  const decimals = useWatch({ control, name: `decimals` });

  const handleMax = () => {
    setValue(`pool.tokenValue`, String(balance));
    setValue(
      `pool.tokenValueBN`,
      FixedPointMath.toBigNumber(balance, decimals)
    );
  };

  return (
    <Button
      px="xs"
      py="2xs"
      fontSize="xs"
      variant="outline"
      color="onSurface"
      borderRadius="2xs"
      disabled={!symbol}
      onClick={handleMax}
    >
      MAX
    </Button>
  );
};

export default InputTokenMaxButton;
