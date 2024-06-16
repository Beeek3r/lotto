import {createTheme} from '@mui/material/styles';

/** TODO - Add spacing **/
export const Style = {
  FontSize: {
    Small: '12px',
    Medium: '16px',
    Large: '24px',
  },
  Palette: {
    Primary:  '#7261a9 ',
    PrimaryLight:'#CBC3E3',
    PrimaryDark:'#5f508f',
    Secondary:  '#4f5f98',
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#800080', // your custom primary color
    },
    secondary: {
      main: '#4f5f98', // your custom secondary color
    },
  },
});