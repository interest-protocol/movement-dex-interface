import {
  COIN_TYPES,
  FA_ADDRESSES,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import NoCoin from '../no-coin';
import CoinCard from './coin-card';
import Collapse from './coin-card/collapse';

const UnverifiedCoinList: FC<{ isFA: boolean }> = ({ isFA }) => {
  const { coins } = useCoins();

  const unverifiedCoins = coins.filter(
    ({ type, symbol, standard }) =>
      isFA &&
      symbol !== 'sr-LpFa' &&
      (standard === TokenStandard.FA) === isFA &&
      !values((isFA ? FA_ADDRESSES : COIN_TYPES)[Network.Porto]).some(
        (token) => token.toString() === type
      )
  );

  return (
    <Collapse title={`${unverifiedCoins.length} unverified`}>
      {unverifiedCoins.length ? (
        unverifiedCoins.map((coin) => <CoinCard key={v4()} token={coin} />)
      ) : (
        <NoCoin />
      )}
    </Collapse>
  );
};

export default UnverifiedCoinList;
