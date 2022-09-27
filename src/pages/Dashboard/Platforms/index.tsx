import { range } from 'lodash';
import { FC } from 'react';

import { Unstable_Grid2 as Grid } from '@mui/material';

import { useGetPlatformsAmountQuery } from 'app/contract';

import { Platform } from './Platform';

export const Platforms: FC = () => {
  const { data } = useGetPlatformsAmountQuery();
  return (
    <Grid container columnSpacing={2} rowSpacing={4} p={0}>
      {data != null &&
        range(data.from, data.to + 1).map((level: number) => (
          <Grid key={level}>
            <Platform level={level} />
          </Grid>
        ))}
    </Grid>
  );
};
