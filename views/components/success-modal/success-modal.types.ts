import { SwapToken } from '@/views/swap/swap.types';

export interface SuccessModalProps {
  transactionTime: string;
}

export interface SuccessModalTokenCardProps {
  to: SwapToken;
  from: SwapToken;
  withoutAmount?: boolean;
}
