import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ButtonColorMode from "src/components/Button/ButtonColorMode";
import BlogLogo from "src/assets/favicon.svg";
import { useNavigate } from "react-router-dom";
import { getRoute } from "src/router/routesMap";

const LOGO_SIZE = 30;

const Header = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(getRoute["users"]());
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          onClick={handleLogoClick}
          sx={{
            ...wrapperStyle,
            cursor: "pointer",
          }}
        >
          <Box flex={1} display="flex" columnGap="10px" alignItems="center">
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

const wrapperStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default Header;
