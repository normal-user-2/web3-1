import { FC, ReactNode } from 'react';

import { Box, Badge as MuiBadge, Paper, Stack, Typography, css, styled } from '@mui/material';

import { ReactComponent as DollarIcon } from 'assets/badges/dollar.svg';
import { ReactComponent as InfluencerIcon } from 'assets/badges/influencer.svg';
import { ReactComponent as MinerIcon } from 'assets/badges/miner.svg';
import { ReactComponent as SpeedIcon } from 'assets/badges/speed.svg';

import { useGetUser } from 'app/api';
import { useActiveWallet } from 'app/auth';

import { getNeonFilter } from 'theme';

const whiteNeonFilter = getNeonFilter('#FFFFFF');

interface AccountBadgeProps {
  children: ReactNode;
  earned: number;
  title: string;
}

const Badge = styled(MuiBadge)(
  ({ theme }) => css`
    & .MuiBadge-badge {
      color: #fff;
      border: 2px solid ${theme.palette.primary.main};
      font-size: 14px;
      text-shadow: 0px 0px 7px #fff;
      width: 24px;
      border-radius: 16px;
      padding: 10px 6px;
      background-color: ${theme.palette.background.default};
    }

    & > svg {
      ${whiteNeonFilter}
    }
  `,
);

const AccountBadge: FC<AccountBadgeProps> = ({ children, earned = 0, title }) => {
  return (
    <Stack alignItems='center'>
      <Badge badgeContent={earned} color='primary'>
        {children}
      </Badge>
      <Typography textTransform='capitalize' sx={whiteNeonFilter}>
        {title}
      </Typography>
    </Stack>
  );
};

export const Badges: FC = () => {
  const [address] = useActiveWallet();
  const { data: user } = useGetUser(address);

  return (
    <Paper
      sx={{
        bgcolor: 'background.darkGray',
        p: 4,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          placeItems: 'center',
          gridTemplateColumns: 'repeat(2, 1fr)',
          width: 'fit-content',
          fontSize: 45,
        }}
      >
        <AccountBadge title='Influencer' earned={user?.statuses.find(({ name }) => name === 'Influencer')?.level ?? 0}>
          <InfluencerIcon />
        </AccountBadge>
        <AccountBadge title='Moneymaker' earned={user?.statuses.find(({ name }) => name === 'Moneymaker')?.level ?? 0}>
          <DollarIcon />
        </AccountBadge>
        <AccountBadge title='Speedster' earned={user?.statuses.find(({ name }) => name === 'Speedster')?.level ?? 0}>
          <SpeedIcon />
        </AccountBadge>
        <AccountBadge title='Miner' earned={user?.statuses.find(({ name }) => name === 'Miner')?.level ?? 0}>
          <MinerIcon />
        </AccountBadge>
      </Box>
    </Paper>
  );
};
