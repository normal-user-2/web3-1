import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';

import { useActiveWallet } from 'app/auth';
import { useLoginQuery } from 'app/contract';

import { nasaFontFamily } from 'theme';

export const Login: FC = () => {
  const { t } = useTranslation('app');
  const [, setActiveWallet] = useActiveWallet();

  const { address } = useAccount();
  const { isExist, isLoading } = useLoginQuery();

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isExist) {
      setActiveWallet(address);
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Typography fontFamily={nasaFontFamily} fontSize={20}>
        <Trans t={t} i18nKey='auth.login.title' />
      </Typography>
      <Typography fontFamily={nasaFontFamily} fontSize={14} color='text.secondary' mt={-1}>
        <Trans t={t} i18nKey='auth.login.description' />
      </Typography>

      <LoadingButton
        color='primary'
        variant='contained'
        size='large'
        fullWidth
        disabled={isExist === false}
        loading={isLoading || isExist == null}
        onClick={handleLogin}
      >
        {isExist ? (
          <Trans t={t} i18nKey='auth.login.automaticLogin' />
        ) : (
          <Trans t={t} i18nKey='auth.login.walletIsNotRegistered' />
        )}
      </LoadingButton>
    </>
  );
};
