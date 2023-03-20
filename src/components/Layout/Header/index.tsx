import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ButtonColorMode from "src/components/Button/ButtonColorMode";
import BlogLogo from "src/assets/favicon.svg";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "src/router/routesMap";

const LOGO_SIZE = 30;

const useStyle = {
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo_wrapper: {
    flex: 1,
    display: "flex",
    columnGap: "10px",
    alignItems: "center",
    cursor: "pointer",
  },
};

const Header = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(RoutePath.users);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={useStyle.wrapper}>
          <Box sx={useStyle.logo_wrapper} onClick={handleLogoClick}>
            <img
              src={BlogLogo}
              alt="Blog logo"
              width={LOGO_SIZE}
              height={LOGO_SIZE}
            />
            <Typography
              mt="5px"
              sx={{
                cursor: "pointer",
              }}
            >
              My blog
            </Typography>
          </Box>

          <Box flex={1} display="flex" justifyContent="flex-end">
            <ButtonColorMode />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
