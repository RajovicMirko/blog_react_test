import { Box, styled, TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "../AppForm";
import TextFieldMessage from "./HelperMessage";

export type InputTextProps = TextFieldProps & {
  name: string;
  icon?: JSX.Element;
  validate?: any;
};

const TextFieldWrapperStyled = styled(Box)(() => ({
  paddingBottom: "8px",
}));

const InputText = ({
  name,
  validate,
  helperText,
  disabled,
  icon,
  ...rest
}: InputTextProps) => {
  const { register, formState, isLoading } = useFormContext();
  const { errors } = formState ?? {};

  const hasErrors = !!errors[name];
  const inputOffsetWidth = (errors[name]?.ref as any)?.offsetWidth;
  const messageColor = hasErrors ? "error" : "text.secondary";

  return (
    <TextFieldWrapperStyled>
      <TextField
        {...register(name, { validate })}
        error={hasErrors}
        disabled={disabled || isLoading}
        InputProps={{ endAdornment: icon }}
        {...rest}
      />

      <TextFieldMessage color={messageColor} sx={{ width: inputOffsetWidth }}>
        {errors[name]?.message ?? helperText}
      </TextFieldMessage>
    </TextFieldWrapperStyled>
  );
};

export default InputText;
