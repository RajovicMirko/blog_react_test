import { Typography, TypographyProps } from "@mui/material";

type TitleProps = TypographyProps & {
  title: string;
};

const Title = ({ title, ...rest }: TitleProps) => (
  <Typography fontSize="22px" {...rest}>
    {title}
  </Typography>
);

export default Title;
