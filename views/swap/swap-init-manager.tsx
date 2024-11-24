import { Network } from '@interest-protocol/aptos-sr-amm';
import { useRouter } from 'next/router';
import { mergeAll } from 'ramda';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { PRICE_TYPE } from '@/constants/prices';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { updateURL } from '@/utils';

import { Aggregator, ISwapSettings, SwapForm } from './swap.types';

const SwapInitManager: FC = () => {
  const form = useFormContext<SwapForm>();
  const network = useNetwork<Network>();
  const { pathname } = useRouter();

  const settings = useReadLocalStorage<ISwapSettings>(
    `${LOCAL_STORAGE_VERSION}-movement-dex-settings`
  ) ?? { slippage: '2', aggregator: Aggregator.Interest };

  const getUSDPrice = (symbol: string, label: 'to' | 'from') => {
    fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
      method: 'POST',
      body: JSON.stringify({ coins: [PRICE_TYPE[symbol]] }),
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    })
      .then((response) => response.json())
      .then((data) => form.setValue(`${label}.usdPrice`, data[0].price))
      .catch(() => null);
  };

  useEffect(() => {
    form.reset();
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', mergeAll([defaultSettings, settings]));
    getUSDPrice(form.getValues('from.symbol'), 'from');
    getUSDPrice(form.getValues('to.symbol'), 'to');
    updateURL(pathname);
  }, [network]);

  useEffect(() => {
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', {
      ...defaultSettings,
      ...settings,
    });
  }, [settings]);

  return null;
};

export default SwapInitManager;
