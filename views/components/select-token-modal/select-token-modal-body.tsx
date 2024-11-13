import {
  COINS,
  FUNGIBLE_ASSETS,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { useCoinContext } from '@/context/coins';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-token-body';
import NotFound from './not-found';
import {
  SelectTokenModalBodyProps,
  TokenOrigin,
} from './select-token-modal.types';

const SelectTokenModalBody: FC<SelectTokenModalBodyProps> = ({
  control,
  isOutput,
  handleSelectToken,
}) => {
  const { coins, loading } = useCoins();
  const { coinsWithoutLP, hideLPTokensActive } = useCoinContext();

  const validCoins = coins.filter(
    ({ standard }) => !isOutput || standard === TokenStandard.FA
  );

  const filterSelected = useWatch({ control, name: 'filter' });

  if (filterSelected === TokenOrigin.Coin)
    return (
      <ModalTokenBody
        loading={false}
        handleSelectToken={handleSelectToken}
        tokens={values(COINS[Network.Porto]).map((token) => ({
          ...token,
          standard: TokenStandard.COIN,
        }))}
      />
    );

  if (filterSelected === TokenOrigin.FA)
    return (
      <ModalTokenBody
        loading={false}
        handleSelectToken={handleSelectToken}
        tokens={values(FUNGIBLE_ASSETS[Network.Porto]).map(
          ({ address, ...token }) => ({
            ...token,
            type: address.toString(),
            standard: TokenStandard.FA,
          })
        )}
      />
    );

  if (!validCoins.length && loading) return <FetchingToken />;

  const noWalletToShow =
    filterSelected == TokenOrigin.Wallet && !validCoins?.length;

  if (filterSelected === TokenOrigin.Wallet && !noWalletToShow)
    return (
      <ModalTokenBody
        loading={loading}
        tokens={hideLPTokensActive ? coinsWithoutLP : validCoins}
        handleSelectToken={handleSelectToken}
      />
    );

  return <NotFound />;
};

export default SelectTokenModalBody;
