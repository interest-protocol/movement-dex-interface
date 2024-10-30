import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PictureSVG } from '@/components/svg';

import { ICreateTokenForm } from '../create-token.types';

const CreateTokenFormPreviewImage: FC = () => {
  const { control } = useFormContext<ICreateTokenForm>();

  const name = useWatch({ control, name: 'name' });
  const imageUrl = useWatch({ control, name: 'imageUrl' });

  if (!imageUrl)
    return (
      <Box
        width="7rem"
        height="7rem"
        display="flex"
        border="1px solid"
        borderRadius="full"
        alignItems="center"
        borderColor="outline"
        bg="highestContainer"
        justifyContent="center"
      >
        <PictureSVG maxWidth="3rem" maxHeight="3rem" width="100%" />
      </Box>
    );

  return (
    <Box
      width="7rem"
      height="7rem"
      display="flex"
      border="1px solid"
      borderRadius="full"
      alignItems="center"
      borderColor="outline"
      bg="highestContainer"
      justifyContent="center"
    >
      <img src={imageUrl} alt={name} width="100%" />
    </Box>
  );
};

export default CreateTokenFormPreviewImage;
