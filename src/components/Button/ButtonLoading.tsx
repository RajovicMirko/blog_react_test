import { Button, ButtonProps } from "@mui/material";
import Circular from "../Loading/Circular";

type ButtonLoadingProps = Pick<
  ButtonProps,
  "onClick" | "type" | "disabled" | "variant" | "color" | "fullWidth"
> & {
  label: string;
  isLoading?: boolean;
};

const ButtonLoading = ({
  type = "button",
  label,
  isLoading,
  disabled,
  variant = "text",
  ...rest
}: ButtonLoadingProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <Circular size={20} sx={{ margin: "2.5px 0" }} /> : label}
    </Button>
  );
};

export default ButtonLoading;
