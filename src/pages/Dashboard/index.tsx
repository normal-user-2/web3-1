import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';

import { useActiveWallet } from 'app/auth';

import { AccountInfo } from './Account/AccountInfo';
import { Badges } from './Account/Badges';
import { Wallet } from './Account/Wallet';
import { HelpBotButton } from './HelpBotButton';
import { Partners } from './Partners';
import { Platforms } from './Platforms';

export const Dashboard: FC = () => {
  const [activeWallet] = useActiveWallet();

  if (activeWallet == null) {
    return <Navigate to='/login' />;
  }

  return (
    <Grid container columnSpacing={4} rowSpacing={2}>
      <Grid xs={12} md={6} lg={3} display='flex' flexDirection='column' gap={2}>
        <AccountInfo />
        <Badges />
        <Wallet />
      </Grid>
      <Grid xs={12} md={6} lg={9} display='flex' flexDirection='column' gap={2}>
        <HelpBotButton telegramTag='everclub_help_bot' />
        <Routes>
          <Route index element={<Platforms />} />
          <Route path='partners' element={<Partners />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
