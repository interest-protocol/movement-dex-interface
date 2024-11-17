import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS } from '@/constants/coin-fa';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';

import NoCoin from '../no-coin';
import CoinCard from './coin-card';
import Collapse from './coin-card/collapse';

const UnverifiedCoinList: FC = () => {
  const { coins } = useCoins();

  const unverifiedCoins = coins.filter(
    ({ type, symbol }) =>
      symbol !== 'sr-LpFa' &&
      !TOKENS.some(
        (token) =>
          (
            (token as CoinMetadata).type || (token as FAMetadata).address
          ).toString() === type
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
