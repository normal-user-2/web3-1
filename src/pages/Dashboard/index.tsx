import { range } from 'lodash';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { Unstable_Grid2 as Grid } from '@mui/material';

import { useActiveWallet } from 'app/auth';
import { useGetPlatformsAmountQuery, useLoadAccount } from 'app/contract';

import { AccountInfo } from './Account/AccountInfo';
import { Badges } from './Account/Badges';
import { Wallet } from './Account/Wallet';
import { HelpBotButton } from './HelpBotButton';
import { Platform } from './Platform';

export const Dashboard: FC = () => {
  const [activeWallet] = useActiveWallet();
  useLoadAccount({ enabled: activeWallet != null });
  const { data } = useGetPlatformsAmountQuery();

  if (activeWallet == null) {
    return <Navigate to='/login' />;
  }

  const platforms = (
    <Grid container columnSpacing={2} rowSpacing={4} p={0}>
      {data != null &&
        range(data.from, data.to + 1).map((level: number) => (
          <Grid key={level}>
            <Platform level={level} />
          </Grid>
        ))}
    </Grid>
  );

  return (
    <Grid container columnSpacing={4} rowSpacing={2}>
      <Grid xs={12} md={6} lg={3} display='flex' flexDirection='column' gap={2}>
        <AccountInfo />
        <Badges />
        <Wallet />
      </Grid>
      <Grid xs={12} md={6} lg={9} display='flex' flexDirection='column' gap={2}>
        <HelpBotButton telegramTag='everclub_help_bot' />
        {platforms}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
