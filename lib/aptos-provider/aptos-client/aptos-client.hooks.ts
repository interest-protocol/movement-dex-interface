import { useContext } from 'react';

import aptosClientContext from '.';

export const useAptosClient = () => useContext(aptosClientContext).client;
export const useAptosClientConfig = () => useContext(aptosClientContext).config;
