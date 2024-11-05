import { Network } from '@interest-protocol/aptos-sr-amm';
import { TokenField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';
import {
  PoolForm,
  PoolOption,
  PoolTokenWithCoinMetadata,
} from '@/views/pools/pools.types';

import { PoolFieldsProps } from './pool-field.types';

const PoolField: FC<PoolFieldsProps> = ({ index, poolOptionView }) => {
  const { coinsMap } = useCoins();
  const network = useNetwork<Network>();
  const { register, setValue, getValues } = useFormContext<PoolForm>();

  const isDeposit = poolOptionView === PoolOption.Deposit;

  const fieldName: `tokenList.${number}` | 'lpCoin' = isDeposit
    ? `tokenList.${index}`
    : 'lpCoin';

  const token = getValues(fieldName);

  const type = (token as PoolTokenWithCoinMetadata).type || '';
  const decimals = token.decimals;
  const symbol = token.symbol;

  const balance = type
    ? FixedPointMath.toNumber(
        coinsMap[type]?.balance ?? ZERO_BIG_NUMBER,
        coinsMap[type]?.metadata.decimals ?? decimals
      )
    : 1;

  const handleDepositLock = () => {
    if ('tokenList.0' === fieldName) {
      setValue('tokenList.0.locked', true);
      setValue('tokenList.1.locked', false);
      return;
    }
    if ('tokenList.1' === fieldName) {
      setValue('tokenList.1.locked', true);
      setValue('tokenList.0.locked', false);
      return;
    }
  };

  return (
    <TokenField
      placeholder="0"
      textAlign="right"
      fieldProps={{ bg: 'lowestContainer' }}
      tokenName={symbol}
      TokenIcon={
        token && <TokenIcon withBg network={network} symbol={symbol} />
      }
      handleMax={() => {
        if (isDeposit) handleDepositLock();

        setValue(`${fieldName}.value`, String(balance));
      }}
      {...register(`${fieldName}.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          if (isDeposit) handleDepositLock();

          setValue(`${fieldName}.value`, parseInputEventToNumberString(v));
        },
      })}
    />
  );
};

export default PoolField;
