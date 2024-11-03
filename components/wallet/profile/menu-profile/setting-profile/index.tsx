import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ArrowLeftSVG } from '@/components/svg';

import { SettingMenuProps } from '../user-info.types';
import SettingOption from './setting-option';

const SettingProfile: FC<SettingMenuProps> = ({ handleToggleProfile }) => {
  const handleBackProfile = () => {
    const url = new URL(window.location.href);

    window.history.pushState('', '', url.toString());
    handleToggleProfile();
  };

  return (
    <Box width="100%" p="s" color="secondary">
      <Box
        width="60%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button isIcon variant="text" onClick={handleBackProfile}>
          <ArrowLeftSVG
            width="1.5rem"
            height="1.5rem"
            maxHeight="100%"
            maxWidth="100%"
          />
        </Button>
        <Typography size="large" variant="label" textTransform="uppercase">
          Settings
        </Typography>
      </Box>
      <SettingOption label="hide small balances" isToggleEnable={false} />
      <SettingOption
        label="hide unknown tokens & nfts"
        isToggleEnable={false}
      />
      <SettingOption
        label="hide unknown tokens & nfts"
        description="we use anonymized data to enhance your experience"
        isToggleEnable={false}
      />
      <SettingOption
        label="hide unknown tokens & nfts"
        isToggleEnable={false}
      />
      <Box
        p="m"
        width="100%"
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Typography size="medium" variant="label">
          Currency
        </Typography>
        <Box
          m={0}
          p="0.5rem"
          borderRadius="xs"
          nHover={{
            background: 'lowContainer',
          }}
        >
          <Typography size="medium" variant="body" opacity="0.7">
            USD
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingProfile;