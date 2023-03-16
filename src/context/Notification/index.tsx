import { Palette, PaletteColor, styled, Theme, useTheme } from "@mui/material";
import { createContext, PropsWithChildren, useContext } from "react";
import { ToastContainer } from "react-toastify";
import generateCssVariables from "./generateCssVariables";

import "react-toastify/dist/ReactToastify.min.css";
import hexToRGB from "../../utils/hexToRgba";

const styledOptions = {
  shouldForwardProp: (prop: string) => !["muiTheme"].includes(prop),
};

const generateStyleByKey = (key: string, muiTheme: Theme) => {
  const keyColor = hexToRGB(
    (muiTheme?.palette[key as keyof Palette] as PaletteColor)?.main,
    0.1
  );

  return {
    [`&.Toastify__toast--${key} .Toastify__toast-body`]: {
      background: `linear-gradient(90deg, var(--toastify-color-${muiTheme.palette.mode}) 0%, ${keyColor} 100%)`,
    },
  };
};

type ToastStyledProps = { muiTheme: Theme };

const NotificationContext = createContext({});

const ToastStyled = styled(
  ToastContainer,
  styledOptions
)<ToastStyledProps>(({ muiTheme }) => ({
  ...generateCssVariables(muiTheme),

  /** Classes for the displayed toast **/
  ".Toastify__toast": {
    padding: "0",
    margin: 0,
    ...muiTheme.mixins.offsetTopByHeader,
    ...generateStyleByKey("light", muiTheme),
    ...generateStyleByKey("dark", muiTheme),
    ...generateStyleByKey("info", muiTheme),
    ...generateStyleByKey("success", muiTheme),
    ...generateStyleByKey("warning", muiTheme),
    ...generateStyleByKey("error", muiTheme),
    ...generateStyleByKey("transparent", muiTheme),
  },
  ".Toastify__toast--rtl": {},
  ".Toastify__toast-body": {},

  /** Used to define the position of the ToastContainer **/
  ".Toastify__toast-container": {},
  ".Toastify__toast-container--top-left": {},
  ".Toastify__toast-container--top-center": {},
  ".Toastify__toast-container--top-right": {},
  ".Toastify__toast-container--bottom-left": {},
  ".Toastify__toast-container--bottom-center": {},
  ".Toastify__toast-container--bottom-right": {},

  /** Used to position the icon **/
  ".Toastify__toast-icon": {},

  /** handle the notification color and the text color based on the theme **/
  ".Toastify__toast-theme--dark": {},
  ".Toastify__toast-theme--light": {},
  ".Toastify__toast-theme--colored.Toastify__toast--default": {},
  ".Toastify__toast-theme--colored.Toastify__toast--info": {},
  ".Toastify__toast-theme--colored.Toastify__toast--success": {},
  ".Toastify__toast-theme--colored.Toastify__toast--warning": {},
  ".Toastify__toast-theme--colored.Toastify__toast--error": {},

  ".Toastify__progress-bar": {},
  ".Toastify__progress-bar--rtl": {},
  ".Toastify__progress-bar-theme--light": {},
  ".Toastify__progress-bar-theme--dark": {},
  ".Toastify__progress-bar--info": {},
  ".Toastify__progress-bar--success": {},
  ".Toastify__progress-bar--warning": {},
  ".Toastify__progress-bar--error": {},
  // /** colored notifications share the same progress bar color **/
  ".Toastify__progress-bar-theme--colored.Toastify__progress-bar--info, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error":
    {},

  /** Classes for the close button. Better use your own closeButton **/
  ".Toastify__close-button": {},
  ".Toastify__close-button--default": {},
  ".Toastify__close-button > svg": {},
  ".Toastify__close-button:hover, .Toastify__close-button:focus": {},
}));

export const NotificationProvider = ({ children }: PropsWithChildren<any>) => {
  const muiTheme = useTheme();
  const theme = muiTheme.palette.mode as any;

  return (
    <NotificationContext.Provider value={{}}>
      <ToastStyled
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeButton={false}
        draggable={false}
        theme={theme}
        muiTheme={muiTheme}
      />
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);

  return context;
};
export default useNotification;
