import { ethers } from 'ethers';
import { FC, ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

import { LoadingButton } from '@mui/lab';
import { Box, Divider, Paper, Skeleton, Stack, StackProps, SvgIcon, Typography, styled } from '@mui/material';

import { ReactComponent as NetworkIcon } from 'assets/icons/network.svg';
import { ReactComponent as RoiIcon } from 'assets/icons/roi.svg';

import { useGetPlatforms } from 'app/api';
import { useActiveWallet } from 'app/auth';
import {
  useBuyPlatformMutation,
  useBuyPriceQuery,
  useGetPlatformQuery,
  useGetUserQuery,
  useReactivatePlatformMutation,
  useReactivatePriceQuery,
} from 'app/contract';

import { LockIcon } from 'components/LockIcon';

const formatEth = ethers.utils.formatEther;

const Row = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface BaseProps {
  level: number;
  locked?: boolean;
  title?: ReactNode;
  membersCount?: number;
  reactivateAmount?: number;
  action?: ReactNode;
  justify?: StackProps['justifyContent'];
}

const useIsReadonly = () => {
  const [activeAddress] = useActiveWallet();
  const { address } = useAccount();
  return activeAddress !== address;
};

const PlatformBase: FC<BaseProps> = ({
  level,
  locked = false,
  title,
  membersCount,
  reactivateAmount,
  action,
  justify = 'center',
}) => {
  const { t } = useTranslation('app');

  return (
    <Paper
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        overflow: 'hidden',
        bgcolor: 'background.lightGray',
        p: 0,
        height: 180,
      }}
    >
      <Stack
        sx={{
          p: 2,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          bgcolor: 'background.gray',
          minWidth: 105,
        }}
      >
        <Box>
          <Typography px={1}>Level {level}</Typography>
          <Divider
            sx={({ palette }) => ({
              borderColor: palette.primary.main,
              borderBottomWidth: '2px',
              boxShadow: `0px 2px 10px ${palette.primary.main}`,
            })}
          />
        </Box>
        <LockIcon locked={locked} />
      </Stack>
      <Stack justifyContent={justify} spacing={2} p={2}>
        {title}

        {membersCount != null && reactivateAmount != null && (
          <Stack fontSize={14}>
            <Row sx={{ gap: 2 }}>
              <Row sx={{ justifyContent: 'flex-start', gap: 0.5 }}>
                <SvgIcon component={NetworkIcon} color='primary' inheritViewBox fontSize='small' />
                <Trans t={t} i18nKey='dashboard.platform.usersOnPlatform' />
              </Row>
              <Typography color='primary'>{membersCount}</Typography>
            </Row>
            <Row sx={{ gap: 2 }}>
              <Row sx={{ justifyContent: 'flex-start', gap: 0.5 }}>
                <SvgIcon component={RoiIcon} color='primary' inheritViewBox fontSize='small' />
                <Trans t={t} i18nKey='dashboard.platform.reactivated' />
              </Row>
              <Typography color='primary'>{reactivateAmount}</Typography>
            </Row>
          </Stack>
        )}

        {action}
      </Stack>
    </Paper>
  );
};

const PlatformToBuy: FC<Props> = ({ level }) => {
  const { t } = useTranslation('app');
  const readonly = useIsReadonly();

  const { price, isSuccess: isBuyPriceSuccess } = useBuyPriceQuery(level);
  const { mutate: buy, isLoading: isBuying } = useBuyPlatformMutation(level);
  const [address] = useActiveWallet();
  const { platform: previousPlatform } = useGetPlatformQuery(level - 1, address);

  return (
    <PlatformBase
      level={level}
      locked
      justify='space-between'
      title={
        <Typography color='primary.main' textAlign='center'>
          {price == null ? <Skeleton width={50} /> : `${formatEth(price)} BNB`}
        </Typography>
      }
      action={
        <LoadingButton
          variant='contained'
          color='primary'
          loading={!isBuyPriceSuccess || isBuying}
          disabled={(level !== 1 && !previousPlatform?.owned) || readonly}
          onClick={() => price != null && buy(price)}
        >
          <Trans t={t} i18nKey='dashboard.platform.buy' />
        </LoadingButton>
      }
    />
  );
};

const PlatformToActivate: FC<Pick<BaseProps, 'level' | 'membersCount' | 'reactivateAmount'>> = (props) => {
  const { t } = useTranslation('app');

  const readonly = useIsReadonly();
  const { price, isSuccess: isBuyPriceSuccess } = useReactivatePriceQuery(props.level);
  const { mutate: reactivate, isLoading } = useReactivatePlatformMutation(props.level);
  return (
    <PlatformBase
      {...props}
      title={
        <Typography color='primary.main' textAlign='center'>
          {price == null ? <Skeleton width={50} /> : `${formatEth(price)} BNB`}
        </Typography>
      }
      action={
        <LoadingButton
          variant='contained'
          color='primary'
          loading={!isBuyPriceSuccess || isLoading}
          onClick={() => price != null && reactivate(price)}
          disabled={readonly}
        >
          <Trans t={t} i18nKey='dashboard.platform.reactivate' />
        </LoadingButton>
      }
    />
  );
};

interface Props {
  level: number;
}

export const Platform: FC<Props> = ({ level }) => {
  const [address] = useActiveWallet();
  const { platform } = useGetPlatformQuery(level, address);
  const { user } = useGetUserQuery(address);
  const { data: platforms } = useGetPlatforms(user?.id?.toNumber());

  const reactivateAmount =
    platforms != null
      ? platforms.find(({ platform_level_id }) => platform_level_id === level)?.reactivations ?? 0
      : undefined;

  if (platform == null) {
    return <Skeleton variant='rounded' height={180} width={250} />;
  }

  if (!platform.owned) {
    return <PlatformToBuy level={level} />;
  }

  if (platform.readyToReactivate) {
    return (
      <PlatformToActivate level={level} membersCount={platform.membersCount} reactivateAmount={reactivateAmount} />
    );
  }

  return <PlatformBase level={level} membersCount={platform.membersCount} reactivateAmount={reactivateAmount} />;
};
