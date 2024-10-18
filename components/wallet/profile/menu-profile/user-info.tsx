import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Avatar from '@/components/account-info/avatar';
import { CopySVG } from '@/components/svg';
import { copyToClipboard } from '@/utils';

import ItemWrapper from '../../../menu-mobile/menu-settings/item-wrapper';

const UserInfo: FC = () => {
  const { account: currentAccount } = useWallet();

  const account = currentAccount?.address || '';

  const clipBoardSuccessMessage = 'Address copied to the clipboard';

  return (
    <>
      <Box p="l">
        <Typography size="small" variant="title" color="onSurface">
          Wallet
        </Typography>
      </Box>
      <Box
        borderBottom={['unset', 'unset', 'unset', '1px solid']}
        borderColor="outlineVariant"
      >
        <ItemWrapper>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center" gap="l">
              <Avatar withNameOrAddress account={currentAccount!} />
            </Box>
            <Button
              isIcon
              p="0 !important"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(account || '', clipBoardSuccessMessage);
              }}
              color="onSurface"
            >
              <CopySVG maxHeight="1rem" maxWidth="1rem" width="100%" />
            </Button>
          </Box>
        </ItemWrapper>
      </Box>
    </>
  );
};

export default UserInfo;
