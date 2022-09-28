import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CopyIcon from '@mui/icons-material/ContentCopyRounded';
import { IconButton, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { useGetReferrals } from 'app/api';
import { useActiveWallet } from 'app/auth';
import { useGetUserQuery } from 'app/contract';

import { formatAddress } from 'helpers/format';

const Wallet: FC<GridRenderCellParams> = ({ value: address }) => {
  const { t } = useTranslation('app');

  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <IconButton
        disabled={address == null}
        onClick={() => {
          copy(address ?? '');
          enqueueSnackbar(t('dashboard.wallet.copiedToClipboard'), { variant: 'success' });
        }}
      >
        <CopyIcon />
      </IconButton>
      {formatAddress(address)}
    </>
  );
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'User ID', width: 130 },
  {
    field: 'created_at',
    headerName: 'Registration date',
    valueFormatter: ({ value }) => value.split(' ')[0],
    width: 150,
  },
  {
    field: 'wallet',
    headerName: 'Wallet',
    valueGetter: ({ row }) => row.wallet[0].address,
    renderCell: (props) => <Wallet {...props} />,
    flex: 1,
    minWidth: 150,
  },
  { field: 'platforms', headerName: 'Platform' },
  {
    field: 'profit',
    headerName: 'Profit',
    valueGetter: ({ row }) => `${Number(row.wallet[0].amount_transfers)} BNB`,
    flex: 1,
    minWidth: 150,
  },
  { field: 'referrals_count', headerName: 'Referrals' },
];

export const Partners: FC = () => {
  const [address] = useActiveWallet();
  const { user, isLoading: isUserLoading } = useGetUserQuery(address);
  const { data, isLoading } = useGetReferrals(user?.id.toNumber());

  return (
    <div
      style={{
        minHeight: 600,
        maxHeight: '90vh',
        width: '100%',
        flexGrow: 1,
      }}
    >
      <DataGrid
        loading={isUserLoading || isLoading}
        components={{
          LoadingOverlay: LinearProgress,
        }}
        rows={data ?? []}
        columns={columns}
      />
    </div>
  );
};

export default Partners;
