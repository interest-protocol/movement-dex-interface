import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';

import Dropdown from '@/components/dropdown';
import { ArrowLeftSVG } from '@/components/svg';

import SettingOption from './setting-option';

const SettingMenu = () => {
  const { push } = useRouter();

  const coins = ['USD', 'USDC', 'USDT'];
  return (
    <Box width="100%" p="s">
      <Box
        width="60%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button isIcon variant="text" onClick={() => push('/')}>
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
        <Dropdown
          defaultValue={coins[0]}
          menuItems={coins}
          onSelect={() => {}}
        />
      </Box>
    </Box>
  );
};

export default SettingMenu;
