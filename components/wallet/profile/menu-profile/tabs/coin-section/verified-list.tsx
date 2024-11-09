import {
  COINS,
  FUNGIBLE_ASSETS,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata } from '@/utils';
import { FAMetadata } from '@/utils/coin/coin.types';

import CoinCard from './coin-card';

const VerifiedCoinList: FC<{ isFA: boolean }> = ({ isFA }) => {
  const verifiedCoins = values(
    (isFA ? FUNGIBLE_ASSETS : COINS)[Network.Porto]
  ).map((metadata) => parseToMetadata(metadata as FAMetadata));

  return (
    <>
      {verifiedCoins.map((coin) => (
        <CoinCard
          key={v4()}
          token={{
            ...coin,
            standard: TokenStandard.COIN,
          }}
        />
      ))}
    </>
  );
};
export default VerifiedCoinList;
