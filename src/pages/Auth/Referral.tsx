import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CircularProgress, Stack } from '@mui/material';

import { useReferralId } from 'app/auth';

export const Referral: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setReferralId] = useReferralId();
  useEffect(() => {
    setReferralId((prev) => {
      if (prev != null) {
        return prev;
      }
      const referralId = Number(id);
      return Number.isFinite(referralId) ? referralId : prev;
    });
    navigate('/login');
  }, [id, navigate, setReferralId]);

  return (
    <Stack minHeight='50vh' justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Stack>
  );
};
