import { styled, Typography, TypographyProps } from "@mui/material";

const MessageStyled = styled(Typography)(({ theme }) => {
  return {
    ...theme.mixins.textEllipsis,
    position: "absolute",
    fontSize: "0.8rem",
    lineHeight: 1.6,
    paddingLeft: "8px",
  };
});

type HelperMessageProps = TypographyProps;

const HelperMessage = ({ children, ...rest }: HelperMessageProps) => {
  return <MessageStyled {...rest}>{children}</MessageStyled>;
};

export default HelperMessage;
