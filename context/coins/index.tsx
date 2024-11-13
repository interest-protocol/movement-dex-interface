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
  hideLPTokensActive: false,
  handleHideLPTokens: () => {},
});

export const CoinsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { coins } = useCoins();
  const [coinsWithoutLP, setCoinsWithoutLP] = useState(coins);
  const [hideLPTokensActive, setHideLPTokensActive] = useState(false);

  const handleHideLPTokens = () => {
    setHideLPTokensActive(not);
    if (!hideLPTokensActive) {
      const filteredCoinsWithoudLP = coins.filter(
        ({ name }) => !name.includes('sr-MOVE/')
      );
      setCoinsWithoutLP(filteredCoinsWithoudLP);
      localStorage.setItem(
        'hideLPTokens',
        `${hideLPTokensActive ? filteredCoinsWithoudLP : coins}`
      );
    }
    return;
  };

  return (
    <CoinsContext.Provider
      value={{ coinsWithoutLP, hideLPTokensActive, handleHideLPTokens }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoinContext = () => useContext(CoinsContext);
