import { Button, ProgressIndicator } from '@interest-protocol/ui-kit';
import { type FC, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm, CreatePoolStep } from './pool-create.types';

const PoolNextButton: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { control, setValue, getValues } = useFormContext<CreatePoolForm>();
  const { step, type, isStable, tokens } = useWatch({ control });

  const error = getValues('error');

  const checkIfPoolExists = async () => {
    setLoading(false);
    return false;
  };

  const isDisabled = useMemo(() => {
    if (error || loading) return true;
    if (step === CreatePoolStep.PoolType) return type === undefined;
    if (step === CreatePoolStep.PoolAlgorithm) return isStable === undefined;
    if (step === CreatePoolStep.PoolCoins)
      return !tokens?.every(
        ({ value, symbol, decimals }) =>
          symbol && Number(value) && String(decimals)
      );

    return false;
  }, [step, type, isStable, tokens, loading]);

  const handleClick = [
    null,
    () =>
      setValue('tokens', [
        {
          type: '' as `0x${string}`,
          name: '',
          symbol: '',
          decimals: 0,
          value: '',
          usdPrice: null,
        },
        {
          type: '' as `0x${string}`,
          name: '',
          symbol: '',
          decimals: 0,
          value: '',
          usdPrice: null,
        },
      ]),
  ];

  return (
    <>
      <Button
        mx="auto"
        variant="filled"
        disabled={isDisabled || !!error}
        PrefixIcon={
          loading ? <ProgressIndicator variant="loading" size={16} /> : null
        }
        onClick={async () => {
          if (step === CreatePoolStep.PoolCoins) {
            const exists = await checkIfPoolExists();

            if (exists) {
              setValue('error', 'This pool already exists');
              return;
            }
          }

          handleClick[step!]?.();
          setValue('step', step! + 1);
        }}
      >
        Next
      </Button>
    </>
  );
};

export default PoolNextButton;
