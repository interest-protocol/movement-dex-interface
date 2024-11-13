import { not } from 'ramda';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';

export const CoinsContext = createContext({});

export const CoinsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { coins } = useCoins();
  const [coinList, setCoinList] = useState(coins);
  const [hideLPTokensActive, setHideLPTokensActive] = useState(false);
  console.log('All coins >>', coinList);

  const handleHideLPTokens = () => {
    setHideLPTokensActive(not);
    if (!hideLPTokensActive) {
      const coinsWithoutLPTokens = coins.filter(
        ({ name }) => !name.includes('sr-MOVE/')
      );
      setCoinList(coinsWithoutLPTokens);
    } else {
      setCoinList(coins);
    }
  };

  return (
    <CoinsContext.Provider
      value={{ coinList, hideLPTokensActive, handleHideLPTokens }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoinContext = () => useContext(CoinsContext);
