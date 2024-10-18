import {
  AnyRawTransaction,
  InputGenerateTransactionOptions,
  Types,
  useWallet,
} from '@aptos-labs/wallet-adapter-react';

export const useCurrentAccount = () => useWallet().account;

export const useSignTransaction = () => {
  const sign = useWallet().signTransaction;

  return (
    transactionOrPayload: AnyRawTransaction | Types.TransactionPayload,
    asFeePayer?: boolean,
    options?: InputGenerateTransactionOptions
  ) => sign(transactionOrPayload, asFeePayer, options);
};
