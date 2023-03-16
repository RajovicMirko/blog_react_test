import { Components, Theme, ThemeOptions } from "@mui/material";

const INPUT_PADDING = 12;

const MuiFormControl: Components["MuiFormControl"] = {
  styleOverrides: {
    root: {
      borderRadius: "8px",
    },
  },
};

const MuiInputBase: Components["MuiInputBase"] = {
  styleOverrides: {
    root: ({ theme }) => {
      const tmpTheme = theme as Theme;

      return {
        input: {
          padding: `${INPUT_PADDING}px`,
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${tmpTheme.palette.background.paper} inset`,
          },
        },
      };
    },
  },
};

const MuiInputLabel: Components["MuiInputLabel"] = {
  styleOverrides: {
    root: {
      top: "-4px",
      "&[data-shrink=true]": {
        top: 0,
      },
    },
  },
};

const MuiSelect: Components["MuiSelect"] = {
  styleOverrides: {
    select: {
      padding: `${INPUT_PADDING}px`,
    },
  },
};

const components: ThemeOptions["components"] = {
  MuiFormControl,
  MuiInputBase,
  MuiInputLabel,
  MuiSelect,
};

export default components;
