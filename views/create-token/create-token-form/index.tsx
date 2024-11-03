import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { ICreateTokenForm } from '../create-token.types';
import CreateTokenFormPool from './create-token-form-pool';
import CreateTokenFormPreviewImage from './create-token-form-preview-image';
import CreateTokenFormToggle from './create-token-form-toggle';
import CreateTokenFormImage from './create-token-form-upload-image';

const CreateTokenForm: FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ICreateTokenForm>();

  return (
    <Box display="flex" flexDirection="column" gap="2xl">
      <Box
        px="xl"
        py="2xl"
        mx="auto"
        width="100%"
        bg="container"
        maxWidth="37rem"
        overflow="hidden"
        borderRadius="xs"
        color="onSurface"
      >
        <Typography variant="headline" size="small">
          Coin Details
        </Typography>
        <Box py="2xl" display="flex" flexDirection="column" gap="l">
          <Box display="grid" gridTemplateColumns="4fr 2fr" gap="xs">
            <Box>
              <TextField
                label="Name"
                fontFamily="Proto"
                {...register('name')}
                placeholder="Eg. Sui"
                nPlaceholder={{ opacity: 0.7 }}
                status={errors.name && 'error'}
                supportingText={errors.name?.message}
                fieldProps={{ borderRadius: '2xs', height: '3rem' }}
              />
            </Box>
            <Box>
              <TextField
                label="Symbol"
                fontFamily="Proto"
                placeholder="Eg. SUI"
                {...register('symbol')}
                nPlaceholder={{ opacity: 0.7 }}
                status={errors.symbol && 'error'}
                supportingText={errors.symbol?.message}
                fieldProps={{ borderRadius: '2xs', height: '3rem' }}
              />
            </Box>
          </Box>
          <Box>
            <TextField
              fontFamily="Proto"
              label="Project URL"
              {...register('projectUrl')}
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.projectUrl && 'error'}
              placeholder="Eg. https://www.memez.gg"
              supportingText={errors.projectUrl?.message}
              fieldProps={{ borderRadius: '2xs', height: '3rem' }}
            />
          </Box>
          <Box display="grid" gridTemplateColumns="3fr 6fr" gap="xs">
            <Box>
              <TextField
                type="number"
                fontFamily="Proto"
                label="Coin Decimals"
                {...register('decimals')}
                nPlaceholder={{ opacity: 0.7 }}
                fieldProps={{ borderRadius: '2xs', height: '3rem' }}
              />
            </Box>
            <Box>
              <TextField
                fontFamily="Proto"
                label="Total Supply"
                nPlaceholder={{ opacity: 0.7 }}
                status={errors.supply && 'error'}
                placeholder="Your total coin supply"
                supportingText={errors.supply?.message}
                {...register('supply', {
                  onChange: (v: ChangeEvent<HTMLInputElement>) => {
                    setValue(
                      'supply',
                      Number(parseInputEventToNumberString(v))
                    );
                  },
                })}
                fieldProps={{ borderRadius: '2xs', height: '3rem' }}
              />
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="m">
          <Box
            gap="m"
            display="grid"
            alignItems="center"
            gridTemplateColumns="5fr 7rem"
          >
            <Box>
              <TextField
                type="link"
                fontFamily="Proto"
                label="Coin Image URL"
                {...register('imageUrl')}
                nPlaceholder={{ opacity: 0.7 }}
                status={errors.imageUrl && 'error'}
                placeholder="Eg. https://move.com/images/logo.png"
                fieldProps={{ borderRadius: '2xs', height: '3rem' }}
                supportingText={
                  errors.imageUrl?.message ??
                  'We recommend to upload an image with 250x250 pixels.'
                }
              />
            </Box>
            <CreateTokenFormPreviewImage />
          </Box>
          <Box display="flex" flexDirection="column" gap="xs">
            <CreateTokenFormImage setValue={setValue} />
          </Box>
        </Box>
      </Box>
      <Box
        px="l"
        py="2xl"
        mx="auto"
        width="100%"
        bg="container"
        maxWidth="37rem"
        overflow="hidden"
        borderRadius="xs"
        color="onSurface"
      >
        <Typography variant="headline" size="small">
          Coin features
        </Typography>
        <CreateTokenFormToggle />
        <CreateTokenFormPool />
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
