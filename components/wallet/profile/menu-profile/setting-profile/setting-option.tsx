import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SettingOptionProps } from '../../profile.types';

const SettingOption: FC<SettingOptionProps> = ({
  label,
  onClick,
  description,
  isToggleEnable,
}) => (
  <Box
    my="xs"
    py="xs"
    width="100%"
    display="grid"
    gridTemplateColumns="3fr 1fr"
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
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <ToggleButton
        name="toggle"
        onChange={onClick}
        defaultValue={isToggleEnable}
      />
    </Box>
  </Box>
);

export default SettingOption;
