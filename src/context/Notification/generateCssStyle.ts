import { Palette, PaletteColor, Theme } from "@mui/material";
import hexToRGB from "src/utils/hexToRgba";

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

const generateCssStyle = (theme: Theme) => ({
  /** Classes for the displayed toast **/
  ".Toastify__toast": {
    padding: "0",
    margin: 0,
    ...generateStyleByKey("light", theme),
    ...generateStyleByKey("dark", theme),
    ...generateStyleByKey("info", theme),
    ...generateStyleByKey("success", theme),
    ...generateStyleByKey("warning", theme),
    ...generateStyleByKey("error", theme),
    ...generateStyleByKey("transparent", theme),
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
});

export default generateCssStyle;
