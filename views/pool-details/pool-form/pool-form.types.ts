import { UseFormReturn } from 'react-hook-form';

import { IPoolForm } from '@/views/pools/pools.types';

export interface RadioFieldProps {
  label: string;
  type: SelectionFieldValues;
  currentValue: SelectionFieldValues;
  handleSelect: (newValue: SelectionFieldValues) => void;
}

export interface TokenListProps {
  type: SelectionFieldValues;
}

export enum SelectionFieldValues {
  None,
  OneCoin,
  Balance,
}

export interface PoolFormButtonProps {
  form: UseFormReturn<IPoolForm, any, undefined>;
}
