import { Components, Theme, ThemeOptions } from "@mui/material";

const INPUT_PADDING = 12;

const MuiFormControl: Components["MuiFormControl"] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const tmpTheme = theme as Theme;

      const DatePickerStyle = ownerState.error
        ? {
            "& > *": {
              color: tmpTheme.palette.error.main,
              "& svg": {
                fill: tmpTheme.palette.error.main,
              },
            },
          }
        : {};

      return {
        borderRadius: "8px",
        ...DatePickerStyle,
      };
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

const MuiTabs: Components["MuiTabs"] = {
  styleOverrides: {
    root: ({ theme }) => {
      const tmpTheme = theme as Theme;
      const isDark = tmpTheme.palette.mode === "dark";

      const color = isDark
        ? tmpTheme.palette.grey["500"]
        : tmpTheme.palette.grey["300"];
      const selectedColor = isDark
        ? tmpTheme.palette.primary.main
        : tmpTheme.palette.common.white;

      return {
        button: {
          color,
          "&.Mui-selected": {
            color: selectedColor,
          },
        },
        "& .MuiTabs-indicator": {
          backgroundColor: selectedColor,
        },
      };
    },
  },
};

const components: ThemeOptions["components"] = {
  MuiFormControl,
  MuiInputBase,
  MuiInputLabel,
  MuiSelect,
  MuiTabs,
};

export default components;
