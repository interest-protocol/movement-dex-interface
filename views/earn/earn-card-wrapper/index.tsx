import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

const EarnCardWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      px="s"
      gap="xl"
      display="flex"
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      {children}
    </Box>
  );
};

export default EarnCardWrapper;
