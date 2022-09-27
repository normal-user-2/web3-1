import { FC } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useGetReferrals } from 'app/api';
import { useActiveWallet } from 'app/auth';
import { useGetUserQuery } from 'app/contract';

import { formatAddress } from 'helpers/format';

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
    valueGetter: ({ row }) => {
      const address = row.wallet[0].address;
      return formatAddress(address);
    },
    flex: 1,
    minWidth: 150,
  },
  { field: 'platforms', headerName: 'Platform' },
  { field: 'profit', headerName: 'Profit', valueGetter: ({ row }) => `${Number(row.wallet[0].amount_transfers)} BNB` },
  { field: 'referrals_count', headerName: 'Referrals' },
];

export const Partners: FC = () => {
  const [address] = useActiveWallet();
  const { user } = useGetUserQuery(address);
  const { data } = useGetReferrals(user?.id.toNumber());

  if (data == null) {
    return null;
  }

  return (
    <div style={{ minHeight: 600, width: '100%', flexGrow: 1 }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
};

export default Partners;
