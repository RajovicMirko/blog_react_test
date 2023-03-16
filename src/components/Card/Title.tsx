import { Typography, TypographyProps } from "@mui/material";

type TitleProps = TypographyProps & {
  title: string;
};

const Title = ({ title, ...rest }: TitleProps) => (
  <Typography variant="h6" {...rest}>
    {title}
  </Typography>
);

export default Title;
