import { PaletteMode } from "@mui/material";
import { createContext, PropsWithChildren, useContext } from "react";

type ColorModeContextProps = {
  mode: PaletteMode;
  modeText: string;
  inactiveModeText: string;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext({} as ColorModeContextProps);

const useColorMode = () => {
  const context = useContext(ColorModeContext);

  return context;
};

type ColorModeProviderProps = {
  value: ColorModeContextProps;
};

export const ColorModeProvider = ({
  value,
  children,
}: PropsWithChildren<ColorModeProviderProps>) => {
  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default useColorMode;
