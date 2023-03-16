import { PaletteMode, ThemeOptions } from "@mui/material";
import { red } from "@mui/material/colors";

const palette = (mode: PaletteMode): { palette: ThemeOptions["palette"] } => ({
  palette: {
    mode: mode,
    primary: {
      main: "#3A98B9",
    },
    secondary: {
      main: "#FFF1DC",
    },
    error: {
      main: red.A400,
    },
  },
});

export default palette;
