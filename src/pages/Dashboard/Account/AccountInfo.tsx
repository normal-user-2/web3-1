import _ from 'lodash';
import { FC } from 'react';

import CurrencyIcon from '@mui/icons-material/CurrencyBitcoinRounded';
import PartnerNetworkIcon from '@mui/icons-material/HubRounded';
import LinkIcon from '@mui/icons-material/LinkRounded';
import SwapIcon from '@mui/icons-material/SwapHorizRounded';
import WarningIcon from '@mui/icons-material/WarningRounded';
import { Box, Divider, Paper, Skeleton, Stack, Typography, styled } from '@mui/material';

import { User, useGetBNBPrice, useGetUser } from 'app/api';
import { useActiveWallet } from 'app/auth';
import { useGetUserQuery as useGetContractUser } from 'app/contract';

import { getNeonFilter } from 'theme';

const whiteNeonFilter = getNeonFilter('#FFFFFF');

const Row = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const calcOverallProfit = ({ wallet }: User) => {
  return (+wallet.profit_referrals + +wallet.profit_reinvest) * 1e-18;
};

export const AccountInfo: FC = () => {
  const [address] = useActiveWallet();
  const { user: contractUser } = useGetContractUser(address);
  const { data: user } = useGetUser(address);
  const { data: bnbPrice } = useGetBNBPrice();

  return (
    <Paper
      sx={{
        bgcolor: 'background.darkGray',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: 3,
      }}
    >
      <Row>
        <Row sx={{ gap: 1 }}>
          <WarningIcon color='primary' fontSize='small' viewBox='0 2 24 24' />
          <Typography fontSize={20} sx={whiteNeonFilter}>
            {contractUser == null ? <Skeleton width={40} /> : `ID ${contractUser.id}`}
          </Typography>
        </Row>
        <Row sx={{ gap: 1 }}>
          <LinkIcon color='primary' fontSize='small' />
          <Typography fontSize={18} sx={whiteNeonFilter}>
            {user == null ? <Skeleton width={40} /> : user.referrals_count}
          </Typography>
        </Row>
      </Row>

      <Paper
        sx={{
          bgcolor: 'background.gray',
          alignItems: 'center',
          gap: 1,
          py: 2,
          px: 3,
          width: '100%',
        }}
      >
        <Stack alignItems='center'>
          <Typography fontSize={20} lineHeight={1} display='flex'>
            {user == null || bnbPrice == null ? (
              <Skeleton width={40} />
            ) : (
              `$${_.round(calcOverallProfit(user) * bnbPrice, 5)}`
            )}
            <Box component='span' color='primary.main' fontSize={22}>
              *
            </Box>
          </Typography>
          <Typography>
            {user == null ? <Skeleton width={40} /> : `BNB ${_.round(calcOverallProfit(user), 5)}`}
          </Typography>
        </Stack>
        <Divider />
        <Stack width='100%' gap={1}>
          <Row sx={{ justifyContent: 'flex-start', gap: 1 }}>
            <CurrencyIcon />
            <Typography>
              {user == null ? <Skeleton width={40} /> : `BNB ${_.round(calcOverallProfit(user), 5)}`}
            </Typography>
          </Row>
          <Row sx={{ justifyContent: 'flex-start', gap: 1 }}>
            <LinkIcon />
            <Typography>
              {user == null ? (
                <Skeleton width={40} />
              ) : (
                `BNB ${_.round(Number(user.wallet.profit_referrals) * 1e-18, 5)}`
              )}
            </Typography>
          </Row>
          <Row sx={{ justifyContent: 'flex-start', gap: 1 }}>
            <PartnerNetworkIcon sx={{ p: 0.5 }} />
            <Typography>
              {user == null ? (
                <Skeleton width={40} />
              ) : (
                `BNB ${_.round(Number(user.wallet.profit_reinvest) * 1e-18, 5)}`
              )}
            </Typography>
          </Row>
        </Stack>
      </Paper>

      <Row sx={{ justifyContent: 'space-around', gap: 2 }}>
        <Typography>1 BNB</Typography>
        <SwapIcon />
        <Typography>$ {bnbPrice}</Typography>
      </Row>
    </Paper>
  );
};
