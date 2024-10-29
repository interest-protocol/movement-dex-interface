import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SettingOptionProps } from '../../profile.types';

const SettingOption: FC<SettingOptionProps> = ({
  label,
  description,
  isToggleEnable,
}) => {
  return (
    <Box
      m="xs"
      p="xs"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyItems="flex-start"
        color="onSecondary"
      >
        <Typography size="medium" variant="label">
          {label}
        </Typography>
        <Typography
          size="small"
          variant="label"
          opacity="0.7"
          mt="0.5rem"
          width="80%"
        >
          {description}
        </Typography>
      </Box>
      <ToggleButton
        name="toggle"
        onChange={() => {}}
        defaultValue={isToggleEnable}
        disabled
      />
    </Box>
  );
};

export default SettingOption;
