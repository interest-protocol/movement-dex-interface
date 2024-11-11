import { Control } from 'react-hook-form';

import { SwapForm } from '../swap.types';

export interface SwapMessagesProps {
  error: boolean;
  control: Control<SwapForm>;
  isZeroSwapAmount: boolean;
  isFetchingSwapAmount: boolean;
}
