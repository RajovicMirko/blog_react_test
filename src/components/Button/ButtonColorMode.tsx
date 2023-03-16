import { Box, Typography } from "@mui/material";
import useColorMode from "../../style/ColorModeContext";
import DarkModeIcon from "@mui/icons-material/Brightness3";
import LightModeIcon from "@mui/icons-material/WbSunny";

const ButtonColorMode = () => {
  const { mode, inactiveModeText, toggleColorMode } = useColorMode();

  const InactiveModeIcon = mode === "dark" ? LightModeIcon : DarkModeIcon;

  return (
    <Box sx={btnStyle} onClick={toggleColorMode}>
      <Typography>{inactiveModeText}</Typography>
      <InactiveModeIcon fontSize="small" />
    </Box>
  );
};

const btnStyle = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  columnGap: "4px",
};

export default ButtonColorMode;
