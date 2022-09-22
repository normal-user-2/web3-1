import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    darkGray: string;
    gray: string;
    lightGray: string;
    dark: string;
  }
  interface TypeText {
    light: string;
  }
}
