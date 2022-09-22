import { FC, ReactNode } from 'react';

export type FCC<T = Record<string, never>> = FC<{ children: ReactNode } & T>;
