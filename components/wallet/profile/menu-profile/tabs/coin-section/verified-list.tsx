import { FC } from 'react';
import { v4 } from 'uuid';

import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';

import NoCoin from '../no-coin';
import VerifiedCoinCard from './coin-card/verified';

const VerifiedCoinList: FC = () => {
  const { coins } = useCoins();

  return (
    <>
      {coins.length ? (
        coins.map(({ metadata }) => (
          <VerifiedCoinCard key={v4()} apy={0.025} token={metadata} />
        ))
      ) : (
        <NoCoin />
      )}
    </>
  );
};

export default VerifiedCoinList;
