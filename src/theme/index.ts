import { createTheme, css, lighten } from '@mui/material';

import backgroundImage from 'assets/background.svg';
import font from 'assets/nasalization.woff2';

const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

export const nasaFontFamily = 'nasalization,' + fontFamily;
export const jostFontFamily = 'Jost,' + fontFamily;

export const getNeonFilter = (colorInFullHex: string) => ({
  filter: `drop-shadow(0px 0px 7px ${colorInFullHex}) drop-shadow(0px 10px 20px ${colorInFullHex}54)`,
});

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFCC00',
    },
    background: {
      default: '#1E2B49',
      paper: '#0C1935',
      darkGray: '#15212D',
      gray: '#212D3B',
      lightGray: '#2C3A47',
      dark: '#071019',
    },
    text: {
      primary: '#FFF',
      secondary: '#AABBE0',
      light: '#BEC6D8',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => css`
        #root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          /* Background */
          background: url(${backgroundImage}) no-repeat center top / contain, #111a2f;
        }

        html {
          font-size: 62.5%;
        }

        /* Font */
        @font-face {
          font-family: nasalization;
          src: url(${font}) format('woff2');
          font-weight: normal;
        }

        /* Scrollbar */
        html,
        body,
        #root {
          overflow: overlay;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(56, 77, 99, 0.4) transparent;
          scroll-behavior: smooth;
        }
        *::-webkit-scrollbar {
          width: 0.4rem;
          height: 0.4rem;
        }
        *::-webkit-scrollbar-track {
          border-radius: 1rem;
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background: rgba(56, 77, 99, 0.4);
        }
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(56, 77, 99, 0.6);
        }
        *::-webkit-scrollbar-thumb:active {
          background: rgba(56, 77, 99, 0.8);
        }

        a {
          color: inherit;
          text-decoration: inherit;
        }
        a:hover {
          color: ${theme.palette.primary.main};
        }
      `,
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => css`
          background: transparent;
          padding-block: ${theme.spacing(1)};
        `,
      },
      defaultProps: {
        elevation: 0,
        position: 'static',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          transition: 'all 300ms',
        },
      },
      variants: [
        {
          props: {
            variant: 'contained',
            color: 'primary',
          },
          style: ({ theme }) => css`
            color: black;
            box-shadow: 0px 2px 15px ${theme.palette.primary.main}53;
            &:hover {
              background-color: ${theme.palette.primary.light};
              box-shadow: 0px 6px 15px ${theme.palette.primary.main}53;
            }
          `,
        },
        {
          props: {
            variant: 'contained',
            color: 'info',
          },
          style: ({ theme }) => css`
            background: ${theme.palette.background.gray};
            color: ${theme.palette.primary.main};
            &:hover {
              background: ${lighten(theme.palette.background.gray, 0.1)};
            }
          `,
        },
        {
          props: {
            size: 'large',
          },
          style: css`
            height: 6rem;
            min-width: 20rem;
            font-size: 16px;
          `,
        },
        {
          props: {
            size: 'medium',
          },
          style: css`
            height: 4rem;
            font-size: 14px;
          `,
        },
      ],
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => css`
          padding: ${theme.spacing(1)} ${theme.spacing(1)};
        `,
        rounded: {
          '&::before': {
            content: 'unset',
          },
          borderRadius: '10px',
        },
      },
      defaultProps: {
        disableGutters: true,
        square: false,
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: 18,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
        },
        rounded: {
          borderRadius: '2rem',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#323E4C',
        },
      },
      defaultProps: {
        flexItem: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => css`
          background-color: ${theme.palette.background.dark};
        `,
        input: ({ theme }) => css`
          padding-block: ${theme.spacing(1.5)};
        `,
        notchedOutline: {
          border: 'unset',
          '.Mui-error &': {
            border: '2px solid red',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
        },
      },
    },
  },
  typography: {
    fontFamily: jostFontFamily,
    htmlFontSize: 10,
    h2: {
      fontSize: 40,
      textTransform: 'uppercase',
      color: 'white',
      fontFamily: nasaFontFamily,
    },
    h3: {
      fontSize: 30,
      textTransform: 'uppercase',
      color: 'white',
      fontFamily: nasaFontFamily,
    },
    subtitle2: {
      fontSize: 23,
      textTransform: 'uppercase',
      fontFamily: nasaFontFamily,
    },
  },
  shape: {
    borderRadius: 10,
  },
  breakpoints: {
    values: {
      xl: 1400,
      lg: 1200,
      md: 900,
      sm: 600,
      xs: 0,
    },
  },
});
