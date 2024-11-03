import { Network } from '@interest-protocol/aptos-move-dex';
import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronRightSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
import { PRICE_TYPE } from '@/constants/prices';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { isCoin } from '@/lib/coins-manager/coins-manager.utils';
import SelectTokenModal from '@/views/components/select-token-modal';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label, isMobile }) => {
  const { setModal, handleClose } = useModal();
  const network = useNetwork<Network>();

  const { control, setValue } = useFormContext<ICreateTokenForm>();

  const quote = useWatch({ control, name: `pool.quote` });
  const tokenSymbol = useWatch({ control, name: `symbol` });
  const tokenImageUrl = useWatch({ control, name: `imageUrl` });

  if (label === 'token')
    return (
      <Box p="xs" position="relative">
        <Button
          p="2xs"
          fontSize="s"
          width="100%"
          variant="tonal"
          disabled={true}
          color="onSurface"
          borderRadius="xs"
          nDisabled={{ bg: 'transparent' }}
          PrefixIcon={
            <TokenIcon
              withBg
              rounded={true}
              network={network}
              url={tokenImageUrl}
              symbol={tokenSymbol}
            />
          }
        >
          <Typography
            p="xs"
            variant="label"
            whiteSpace="nowrap"
            width="100%"
            size={isMobile ? 'large' : 'small'}
          >
            {tokenSymbol}
          </Typography>
        </Button>
      </Box>
    );

  const onSelect = async (metadata: AssetMetadata) => {
    setValue('pool.quote', { ...metadata, usdPrice: 0 });

    await fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
      method: 'POST',
      body: JSON.stringify({ coins: [PRICE_TYPE[metadata.symbol]] }),
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    })
      .then((response) => response.json())
      .then((data) => setValue('pool.quote.usdPrice', data[0].price))
      .catch(() => null);
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal closeModal={handleClose} onSelect={onSelect} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Box p="xs" position="relative">
      <Button
        p="2xs"
        fontSize="s"
        width="100%"
        variant="tonal"
        bg={quote?.symbol ? 'transparent' : 'highestContainer'}
        color="onSurface"
        borderRadius="xs"
        onClick={openModal}
        {...(quote?.symbol && {
          PrefixIcon: (
            <TokenIcon
              withBg
              network={network}
              symbol={quote?.symbol}
              rounded={!isCoin(quote!)}
            />
          ),
        })}
      >
        <Typography
          p="xs"
          variant="label"
          whiteSpace="nowrap"
          width="100%"
          size={isMobile ? 'large' : 'small'}
        >
          {quote?.symbol || 'Select token'}
        </Typography>
        {!quote?.symbol && (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
    </Box>
  );
};

export default SelectToken;
