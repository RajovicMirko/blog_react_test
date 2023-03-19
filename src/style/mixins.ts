import { ThemeOptions } from "@mui/material";

declare module "@mui/material/styles/createMixins" {
  interface Mixins {
    pageHeight?: CSSProperties;
    offsetTopByHeader?: CSSProperties;
    textEllipsis?: CSSProperties;
    floatButtonPosition?: CSSProperties;
  }
}

const HEADER_MIN_HEIGHT = 56;
const HEADER_SMALL_MIN_HEIGHT = 48;
const HEADER_LARGE_MIN_HEIGHT = 64;

// A custom theme for this app
const mixins: ThemeOptions["mixins"] = {
  toolbar: {
    minHeight: HEADER_MIN_HEIGHT,
    "@media (min-width:0px)": {
      "@media (orientation: landscape)": {
        minHeight: HEADER_SMALL_MIN_HEIGHT,
      },
    },
    "@media (min-width:600px)": {
      minHeight: HEADER_LARGE_MIN_HEIGHT,
    },
  },
  pageHeight: {
    height: `calc(100vh - ${HEADER_MIN_HEIGHT}px)`,
    "@media (min-width:0px)": {
      "@media (orientation: landscape)": {
        height: `calc(100vh - ${HEADER_SMALL_MIN_HEIGHT}px)`,
      },
    },
    "@media (min-width:600px)": {
      height: `calc(100vh - ${HEADER_LARGE_MIN_HEIGHT}px)`,
    },
  },
  offsetTopByHeader: {
    top: HEADER_MIN_HEIGHT,
    "@media (min-width:0px)": {
      "@media (orientation: landscape)": {
        top: HEADER_SMALL_MIN_HEIGHT,
      },
    },
    "@media (min-width:600px)": {
      top: HEADER_LARGE_MIN_HEIGHT,
    },
  },
  textEllipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  floatButtonPosition: {
    position: "absolute",
    bottom: "60px",
    right: "20px",
  },
};

export default mixins;
