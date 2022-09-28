import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SocialIcon } from 'react-social-icons';
import { colorFor } from 'react-social-icons/build/networks';
import { useAccount, useConnect } from 'wagmi';

import { LoadingButton } from '@mui/lab';
import { Avatar, Button, Divider, Unstable_Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';

import bscSvg from 'assets/bsc.svg';

import { nasaFontFamily } from 'theme';

import { InfoBlock } from './InfoBlock';
import { Login } from './Login';
import { OpenReadonly } from './OpenReadonly';
import { Register } from './Register';

export const Auth: FC = () => {
  const { t } = useTranslation('app');
  const { isConnected } = useAccount();
  const { connectAsync, connectors, isLoading } = useConnect();

  const connectWallet = (
    <Stack my={5} gap={2}>
      <Typography fontFamily={nasaFontFamily} fontSize={20}>
        <Trans t={t} i18nKey='auth.connectWallet.title' />
      </Typography>
      <Typography fontFamily={nasaFontFamily} fontSize={14} color='text.secondary' mt={-1}>
        <Trans t={t} i18nKey='auth.connectWallet.description' />
      </Typography>
      <LoadingButton
        color='primary'
        variant='contained'
        size='large'
        fullWidth
        loading={isLoading}
        onClick={async () => await connectAsync({ connector: connectors[0], chainId: +import.meta.env.VITE_CHAIN_ID })}
      >
        <Trans t={t} i18nKey='auth.connectWallet.button' />
      </LoadingButton>
    </Stack>
  );

  const authForm = (
    <>
      <Login />
      <Register />
      <Divider sx={{ mx: -2 }} />
      <OpenReadonly />
    </>
  );

  return (
    <Grid container columnSpacing={{ xs: 0, sm: 5 }} rowSpacing={5} maxWidth='lg' mx='auto'>
      <Grid xs={12} md={6} display='flex' justifyContent='center' height='fit-content'>
        <Paper
          sx={{
            alignItems: 'center',
            boxShadow: '0px 4px 20px 0px #00000040',
            px: 4,
            py: 3,
          }}
          elevation={0}
        >
          <Stack maxWidth={320} alignItems='center' textAlign='center' gap={2} fontFamily={nasaFontFamily}>
            <Avatar sx={{ width: 70, height: 70 }} src={bscSvg} />
            <Typography fontSize={35}>BSC</Typography>
            <Divider sx={{ mx: -2 }} />
            {isConnected ? authForm : connectWallet}
          </Stack>
        </Paper>
      </Grid>
      <Grid container xs={12} md={6} spacing={0}>
        <Grid xs={12}>
          <Button variant='outlined' fullWidth size='large' href='https://t.me/everclub' target='_blank'>
            <SocialIcon network='telegram' fgColor={colorFor('telegram')} bgColor='transparent' />
            Official chat @EverClub
          </Button>
        </Grid>
        <Grid xs={12}>
          <InfoBlock />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Auth;
