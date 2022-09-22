import { FC, useDeferredValue, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { LoadingButton } from '@mui/lab';
import { Collapse, TextField, Typography } from '@mui/material';

import { useActiveWallet, useReferralId as useSavedReferralId } from 'app/auth';
import { useIdToAddressQuery, useRegisterMutation } from 'app/contract';

import { nasaFontFamily } from 'theme';

const parseIdOrDefault = (referralId: string) => {
  const id = Number(referralId);
  return id <= 0 || !Number.isFinite(id) ? 1 : id;
};

export const Register: FC = () => {
  const { t } = useTranslation('app');
  const navigate = useNavigate();

  const [savedReferralId, setSavedReferralId] = useSavedReferralId();
  const { address } = useAccount();
  const [, setActiveWallet] = useActiveWallet();

  const [referralId, setReferralId] = useState(String(savedReferralId ?? ''));
  const deferredReferralId = useDeferredValue(referralId);
  const {
    address: referralAddress,
    isSuccess,
    isError: isReferralIdError,
  } = useIdToAddressQuery(parseIdOrDefault(deferredReferralId));
  const {
    mutate: register,
    isLoading,
    error,
    isError,
  } = useRegisterMutation({
    onMutate: () => {
      setSavedReferralId(undefined);
    },
    onSuccess: () => {
      setActiveWallet(address);
      navigate('/dashboard');
    },
  });
  const registrationErrorReason = error?.message;

  useEffect(() => {
    if (savedReferralId != null && isReferralIdError) {
      setSavedReferralId(undefined);
      setReferralId('');
    }
  }, [isReferralIdError, savedReferralId, setSavedReferralId]);

  return (
    <>
      <Typography fontFamily={nasaFontFamily} fontSize={20}>
        <Trans t={t} i18nKey='auth.register.title' />
      </Typography>
      <Typography fontFamily={nasaFontFamily} fontSize={14} color='text.secondary' mt={-1}>
        <Trans t={t} i18nKey='auth.register.title' />
      </Typography>
      <TextField
        placeholder='Referral ID'
        fullWidth
        inputMode='numeric'
        error={isReferralIdError && referralId !== ''}
        value={referralId}
        InputProps={{
          readOnly: savedReferralId != null && !isReferralIdError,
        }}
        onChange={(event) => setReferralId(event.target.value.replace(/\D/, ''))}
      />
      <LoadingButton
        color='primary'
        variant='contained'
        size='large'
        fullWidth
        loading={isLoading}
        disabled={!isSuccess}
        onClick={() => referralAddress && register(referralAddress)}
      >
        <Trans t={t} i18nKey='auth.register.button' />
      </LoadingButton>
      <Collapse in={isError}>
        <Typography color='error'>{registrationErrorReason}</Typography>
      </Collapse>
    </>
  );
};
