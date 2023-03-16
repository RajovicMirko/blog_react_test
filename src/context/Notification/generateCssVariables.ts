import { Theme } from "@mui/material";

const generateCssVariables = (theme: Theme) => ({
  "--toastify-color-light": theme.palette.common.white,
  "--toastify-color-dark": "#121212",
  "--toastify-color-info": theme?.palette?.info?.main,
  "--toastify-color-success": theme?.palette?.success?.main,
  "--toastify-color-warning": theme?.palette?.warning?.main,
  "--toastify-color-error": theme?.palette?.error?.main,
  "--toastify-color-transparent": "rgba(255, 255, 255, 0.7)",

  "--toastify-icon-color-info": "var(--toastify-color-info)",
  "--toastify-icon-color-success": "var(--toastify-color-success)",
  "--toastify-icon-color-warning": "var(--toastify-color-warning)",
  "--toastify-icon-color-error": "var(--toastify-color-error)",

  "--toastify-toast-width": "calc(100vw - 20px)",
  "--toastify-toast-background": theme.palette.common.white,
  "--toastify-toast-min-height": "50px",
  "--toastify-toast-max-height": "800px",
  "--toastify-font-family": "sans-serif",
  "--toastify-z-index": "9999",

  "--toastify-text-color-light": "#757575",
  "--toastify-text-color-dark": theme.palette.common.white,

  // //Used only for colored theme
  "--toastify-text-color-info": theme.palette.common.white,
  "--toastify-text-color-success": theme.palette.common.white,
  "--toastify-text-color-warning": theme.palette.common.white,
  "--toastify-text-color-error": theme.palette.common.white,

  "--toastify-spinner-color": "#616161",
  "--toastify-spinner-color-empty-area": "#e0e0e0",

  // // Used when no type is provided
  // // toast("**hello**")
  // "--toastify-color-progress-light": `linear-gradient(
  //   to right,
  //   #4cd964,
  //   #5ac8fa,
  //   #007aff,
  //   #34aadc,
  //   #5856d6,
  //   #ff2d55
  // )`,

  // Used when no type is provided
  "--toastify-color-progress-dark": "#bb86fc",
  "--toastify-color-progress-info": "var(--toastify-color-info)",
  "--toastify-color-progress-success": "var(--toastify-color-success)",
  "--toastify-color-progress-warning": "var(--toastify-color-warning)",
  "--toastify-color-progress-error": "var(--toastify-color-error)",
});

export default generateCssVariables;
