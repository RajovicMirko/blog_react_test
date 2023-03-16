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

type TextFieldMessageProps = TypographyProps;

const TextFieldMessage = ({ children, ...rest }: TextFieldMessageProps) => {
  return <MessageStyled {...rest}>{children}</MessageStyled>;
};

export default TextFieldMessage;
