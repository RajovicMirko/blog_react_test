import { Paper, styled } from "@mui/material";

const PaperStyled = styled(Paper)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  const backgroundColor = isDark
    ? theme.palette.action.disabledBackground
    : theme.palette.primary.light;

  return {
    backgroundColor,
    color: theme.palette.common.white,
    borderRadius: 0,
  };
});

export default PaperStyled;
