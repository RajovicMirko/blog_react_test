import { Box, styled } from "@mui/material";

const ScrollWrapperPage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  ...theme.mixins.pageHeight,
}));

export default ScrollWrapperPage;
