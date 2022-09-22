import { FC, useDeferredValue, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

import { useActiveWallet } from 'app/auth';
import { useIdToAddressQuery } from 'app/contract';

const parseIdOrUndefined = (cabinetId: string) => {
  const id = Number(cabinetId);
  return id <= 0 || !Number.isFinite(id) ? undefined : id;
};

export const OpenReadonly: FC = () => {
  const { t } = useTranslation('app');
  const navigate = useNavigate();
  const [, setActiveWallet] = useActiveWallet();

  const [id, setId] = useState('');
  const deferredId = useDeferredValue(id);
  const { address, isError, isFetching, isSuccess } = useIdToAddressQuery(parseIdOrUndefined(deferredId));
  return (
    <>
      <TextField
        placeholder='Cabinet ID'
        fullWidth
        value={id}
        inputMode='numeric'
        onChange={(event) => setId(event.target.value.replace(/\D/, ''))}
        error={isError && id !== ''}
      />
      <LoadingButton
        color='primary'
        variant='contained'
        size='large'
        fullWidth
        disabled={!isSuccess}
        loading={isFetching}
        onClick={() => {
          setActiveWallet(address);
          navigate('/dashboard');
        }}
      >
        <Trans t={t} i18nKey='auth.openReadonlyCabinet' />
      </LoadingButton>
    </>
  );
};
