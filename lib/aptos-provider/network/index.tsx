import {
  createContext,
  type FC,
  type PropsWithChildren,
  useState,
} from 'react';

import type { NetworkContext, NetworkProviderProps } from './network.types';

const networkContext = createContext<NetworkContext>({} as NetworkContext);

export const NetworkProvider: FC<PropsWithChildren<NetworkProviderProps>> = ({
  children,
  defaultNetwork,
  onChangeNetwork,
}) => {
  const { Provider } = networkContext;
  const [network, setNetwork] = useState<string>(defaultNetwork);

  const changeNetwork = (network: string) => {
    setNetwork(network);
    onChangeNetwork?.(network);
  };

  return <Provider value={{ changeNetwork, network }}>{children}</Provider>;
};

export default networkContext;
