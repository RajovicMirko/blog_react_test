// FONT
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import { ColorModeProvider } from "./ColorModeContext";
import components from "./components";
import mixins from "./mixins";
import palette from "./palette";

const DARK_MODE_TEXT = "Dark Mode";
const LIGHT_MODE_TEXT = "Light Mode";

const MaterialUiProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const isDark = mode === "dark";

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const modeText = isDark ? DARK_MODE_TEXT : LIGHT_MODE_TEXT;

  const inactiveModeText = isDark ? LIGHT_MODE_TEXT : DARK_MODE_TEXT;

  const provide = { mode, modeText, inactiveModeText, toggleColorMode };

  const theme = useMemo(
    () =>
      createTheme({
        ...palette(mode),
        mixins,
        components,
      }),
    [mode]
  );

  return (
    <ColorModeProvider value={provide}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeProvider>
  );
};

export default MaterialUiProvider;
