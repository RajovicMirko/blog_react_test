import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ButtonColorMode from "../../Button/ButtonColorMode";
import BlogLogo from "../../../assets/favicon.svg";

const LOGO_SIZE = 30;

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={wrapperStyle}>
          <Box flex={1} display="flex" columnGap="10px" alignItems="center">
            <img
              src={BlogLogo}
              alt="Blog logo"
              width={LOGO_SIZE}
              height={LOGO_SIZE}
            />
            <Typography mt="5px">My blog</Typography>
          </Box>

          <Box flex={1} display="flex" justifyContent="flex-end">
            <ButtonColorMode />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const wrapperStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default Header;
