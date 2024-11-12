import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { parseInputEventToNumberString } from '@/utils';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';
import { IPoolForm, PoolOption } from '@/views/pools/pools.types';

import Balance from './balance';
import MaxButton from './input-max-button';
import { PoolFieldsProps } from './pool-field.types';
import PoolFieldManager from './pool-field-manager';

const PoolField: FC<PoolFieldsProps> = ({ index, poolOptionView }) => {
  const network = useNetwork<Network>();
  const { register, setValue, getValues } = useFormContext<IPoolForm>();

  const isDeposit = poolOptionView === PoolOption.Deposit;

  const fieldName: `tokenList.${number}` | 'lpCoin' = isDeposit
    ? `tokenList.${index}`
    : 'lpCoin';

  const token = getValues(fieldName);

  const symbol = token.symbol;

  const handleChange = (v: ChangeEvent<HTMLInputElement>) => {
    const amount = parseInputEventToNumberString(v);

    setValue(`lpCoin.locked`, false);
    setValue(`tokenList.0.locked`, false);
    setValue(`tokenList.1.locked`, false);
    setValue(`${fieldName}.locked`, true);

    setValue(`${fieldName}.value`, amount);
  };

  return (
    <>
      <PoolFieldManager name={fieldName} />
      <TokenField
        active
        placeholder="0"
        textAlign="right"
        Balance={<Balance name={fieldName} />}
        ButtonMax={<MaxButton name={fieldName} />}
        fieldProps={{ bg: 'lowestContainer', p: 'xs' }}
        TokenIcon={
          <Box display="flex" alignItems="center" gap="s">
            <TokenIcon
              withBg
              network={network}
              symbol={isDeposit ? symbol : token.name}
            />
            {symbol}
          </Box>
        }
        {...register(`${fieldName}.value`, {
          onChange: handleChange,
        })}
      />
    </>
  );
};

export default PoolField;
