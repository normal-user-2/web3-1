import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import WalletIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CopyIcon from '@mui/icons-material/ContentCopyRounded';
import {
  Alert,
  Button,
  Divider,
  IconButton,
  OutlinedInput,
  Paper,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { useActiveWallet } from 'app/auth';
import { useGetUserQuery } from 'app/contract';

import { formatAddress } from 'helpers/format';

const Row = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Wallet: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('app');
  const [address] = useActiveWallet();
  const { user, isLoading } = useGetUserQuery(address);
  const referralLink = window.location.origin + `/r/${user?.id}`;
  const notifyCopied = () => enqueueSnackbar(t('dashboard.wallet.copiedToClipboard'), { variant: 'success' });
  return (
    <Paper
      sx={{
        bgcolor: 'background.darkGray',
        gap: 3,
        p: 3,
      }}
    >
      <Stack gap={1}>
        <Typography>
          <Trans t={t} i18nKey='dashboard.wallet.accountWallet' />
        </Typography>
        <Row>
          <Row sx={{ justifyContent: 'flex-start', gap: 1 }}>
            <WalletIcon color='primary' />
            <Typography fontSize={14}>{address == null ? <Skeleton width={50} /> : formatAddress(address)}</Typography>
          </Row>
          <IconButton
            disabled={address == null}
            onClick={() => {
              copy(address ?? '');
              notifyCopied();
            }}
          >
            <CopyIcon />
          </IconButton>
        </Row>
      </Stack>
      <Divider />
      <Stack gap={2}>
        <Typography>
          <Trans t={t} i18nKey='dashboard.wallet.affiliateLink' />
        </Typography>
        {isLoading ? (
          <Skeleton width='100%' />
        ) : (
          <OutlinedInput
            sx={{
              color: 'text.disabled',
            }}
            value={referralLink.replace(/https?:\/\//, '')}
            readOnly
            endAdornment={
              <IconButton
                onClick={() => {
                  copy(referralLink ?? '');
                  notifyCopied();
                }}
              >
                <CopyIcon color='action' />
              </IconButton>
            }
          />
        )}
        <Button
          fullWidth
          variant='contained'
          color='primary'
          size='large'
          onClick={() => {
            copy(referralLink ?? '');
            notifyCopied();
          }}
        >
          <Trans t={t} i18nKey='dashboard.wallet.shareLink' />
        </Button>
      </Stack>
    </Paper>
  );
};
