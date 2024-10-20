import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { isCoin } from '@/lib/coins-manager/coins-manager.utils';

import NotFound from './not-found';
import { ModalTokenBodyProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenBody: FC<ModalTokenBodyProps> = ({
  tokens,
  loading,
  handleSelectToken,
}) => (
  <Box px="m" py="s">
    <Box display="flex" gap="2xs" alignItems="center">
      <Typography variant="body" size="small" color="outline">
        {tokens.length} Coin{tokens.length !== 1 ? 's' : ''}
      </Typography>
      {loading && <ProgressIndicator variant="loading" size={12} />}
    </Box>
    <Box py="m" gap="s" display="grid" gridTemplateColumns={['1fr', '1fr 1fr']}>
      {tokens && tokens.length ? (
        tokens?.map((token) => (
          <TokenModalItem
            key={v4()}
            selected={false}
            isFA={!isCoin(token)}
            onClick={() => handleSelectToken(token)}
            symbol={isCoin(token) ? token.symbol : token.symbol}
          />
        ))
      ) : (
        <NotFound />
      )}
    </Box>
  </Box>
);

export default ModalTokenBody;
