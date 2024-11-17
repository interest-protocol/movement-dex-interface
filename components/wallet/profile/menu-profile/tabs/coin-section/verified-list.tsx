import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS } from '@/constants/coin-fa';
import { parseToMetadata } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';

import CoinCard from './coin-card';

const VerifiedCoinList: FC = () => {
  const verifiedTokens = TOKENS.map((metadata) =>
    parseToMetadata(metadata as CoinMetadata | FAMetadata)
  );

  return (
    <>
      {verifiedTokens.map((token) => (
        <CoinCard key={v4()} token={token} />
      ))}
    </>
  );
};
export default VerifiedCoinList;
