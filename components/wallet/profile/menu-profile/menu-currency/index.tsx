import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ArrowLeftSVG, EURSVG } from '@/components/svg';

import { MenuCurrencyProps } from '../user-info.types';

const MenuCurrency: FC<MenuCurrencyProps> = ({ handleBack }) => {
  const isSelected = true;
  return (
    <Box width="100%" p="s" color="secondary">
      <Box
        width="60%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button isIcon variant="text" onClick={handleBack}>
          <ArrowLeftSVG
            width="1.5rem"
            height="1.5rem"
            maxHeight="100%"
            maxWidth="100%"
          />
        </Button>
        <Typography size="large" variant="label" textTransform="uppercase">
          Currency
        </Typography>
      </Box>
      <Box p="s">
        <Typography size="small" variant="label" opacity="0.7" my="0.5rem">
          suggested currencies
        </Typography>
        <Box>
          <Box
            p="xs"
            mt="l"
            mb="s"
            display="flex"
            bg="surface"
            height="4.5rem"
            borderRadius="xs"
            alignItems="center"
            justifyContent="flex-start"
            border={isSelected ? '1px solid outline' : ''}
          >
            <EURSVG
              width="2.5rem"
              height="2.5rem"
              maxHeight="100%"
              maxWidth="100%"
            />
            <Typography size="large" variant="label" mx="xs">
              EUR
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuCurrency;
