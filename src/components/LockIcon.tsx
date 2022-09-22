import { css, styled } from '@mui/material';

import { ReactComponent as Lock } from 'assets/Lock.svg';

export const LockIcon = styled(Lock, { shouldForwardProp: (prop) => prop !== 'locked' })<{ locked?: boolean }>(
  ({ theme, locked = true }) => css`
    max-width: 177px;
    & .shadowed {
      --shadow-color: ${theme.palette.primary.main};
    }
    & .locked {
      display: ${locked ? 'unset' : 'none'};
    }
    & .unlocked {
      display: ${locked ? 'none' : 'unset'};
    }
  `,
);
