import {
  COINS,
  FUNGIBLE_ASSETS,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-token-body';
import NotFound from './not-found';
import {
  SelectTokenModalBodyProps,
  TokenOrigin,
} from './select-token-modal.types';

const SelectTokenModalBody: FC<SelectTokenModalBodyProps> = ({
  control,
  handleSelectToken,
}) => {
  const { coins, loading } = useCoins();

  const filterSelected = useWatch({ control, name: 'filter' });

  if (filterSelected === TokenOrigin.Coin)
    return (
      <ModalTokenBody
        loading={false}
        handleSelectToken={handleSelectToken}
        tokens={values(COINS[Network.Porto])}
      />
    );

  if (filterSelected === TokenOrigin.FA)
    return (
      <ModalTokenBody
        loading={false}
        handleSelectToken={handleSelectToken}
        tokens={values(FUNGIBLE_ASSETS[Network.Porto])}
      />
    );

  if (!coins.length && loading) return <FetchingToken />;

  const noWalletToShow = filterSelected == TokenOrigin.Wallet && !coins?.length;

  if (filterSelected === TokenOrigin.Wallet && !noWalletToShow)
    return (
      <ModalTokenBody
        loading={loading}
        handleSelectToken={handleSelectToken}
        tokens={coins.map(({ metadata }) => metadata)}
      />
    );

  return <NotFound />;
};

export default SelectTokenModalBody;
