import { not } from 'ramda';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';

import { CoinsContextProps } from './coin-context.types';

export const CoinsContext = createContext<CoinsContextProps>({
  coinsWithoutLP: [],
  isLPTokensHiden: false,
  handleHideLPTokens: () => {},
});

export const CoinsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { coins } = useCoins();
  const [coinsWithoutLP, setCoinsWithoutLP] = useState(coins);
  const [isLPTokensHiden, setIsLPTokensHiden] = useState(false);

  const handleHideLPTokens = () => {
    setIsLPTokensHiden(not);
    if (!isLPTokensHiden) {
      const filteredCoinsWithoudLP = coins.filter(
        ({ name }) => !name.includes('sr-MOVE/')
      );
      setCoinsWithoutLP(filteredCoinsWithoudLP);
      window.localStorage.setItem(
        'isLPTokensHiden',
        isLPTokensHiden.toString()
      );
    }
    return;
  };

  return (
    <CoinsContext.Provider
      value={{ coinsWithoutLP, isLPTokensHiden, handleHideLPTokens }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoinContext = () => useContext(CoinsContext);
