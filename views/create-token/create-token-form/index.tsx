import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Button, TextField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { parseInputEventToNumberString } from '@/utils';

import { ICreateTokenForm } from '../create-token.types';
import CreateTokenFormPreviewImage from './create-token-form-preview-image';
import CreateTokenFormToggle from './create-token-form-toggle';
import CreateTokenFormImage from './create-token-form-upload-image';

const CreateTokenForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ICreateTokenForm>();

  const { account } = useWallet();

  const handleCreateToken = async () => {
    try {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const loading = toast.loading('Generating new coin...');
    try {
      await handleCreateToken();
      toast.success('Coin Generated!');
    } catch (e) {
      toast.error((e as Error).message || 'Something went wrong');
    } finally {
      toast.dismiss(loading);
    }
  };

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
              label="Description"
              {...register('description')}
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.description && 'error'}
              placeholder="Eg. Some description about the coin"
              supportingText={errors.description?.message}
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
        as="form"
        px="l"
        py="2xl"
        mx="auto"
        width="100%"
        bg="container"
        maxWidth="37rem"
        overflow="hidden"
        borderRadius="xs"
        color="onSurface"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="headline" size="small">
          Coin features
        </Typography>
        <Box
          p="m"
          my="xl"
          gap="m"
          bg="surface"
          display="flex"
          borderRadius="xs"
          flexDirection="column"
        >
          <CreateTokenFormToggle control={control} setValue={setValue} />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            py="s"
            px="xl"
            fontSize="s"
            bg="primary"
            type="submit"
            variant="filled"
            color="onPrimary"
            borderRadius="xs"
            fontFamily="Proto"
            disabled={!account || loading}
            onSubmit={handleSubmit(onSubmit)}
          >
            Create coin
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
