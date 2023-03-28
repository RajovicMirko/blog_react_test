import { Button, ButtonProps } from "@mui/material";
import { LinearLoading } from "../Loading/LinearLoading";

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
      {label}
      {isLoading && (
        <LinearLoading
          isLoading={isLoading}
          sx={{ bottom: 0 }}
          color={rest.color}
        />
      )}
    </Button>
  );
};

export default ButtonLoading;
