import { Box, styled, TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "../AppForm";
import TextFieldMessage from "./HelperMessage";

export type InputTextProps = TextFieldProps & {
  name: string;
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
  ...rest
}: InputTextProps) => {
  const {
    register,
    formState: { errors },
    isLoading,
  } = useFormContext();

  const hasErrors = !!errors[name];
  const inputOffsetWidth = (errors[name]?.ref as any)?.offsetWidth;
  const messageColor = hasErrors ? "error" : "text.secondary";

  return (
    <TextFieldWrapperStyled>
      <TextField
        {...register(name, { validate })}
        error={hasErrors}
        disabled={disabled || isLoading}
        {...rest}
      />
      <TextFieldMessage color={messageColor} sx={{ width: inputOffsetWidth }}>
        {errors[name]?.message ?? helperText}
      </TextFieldMessage>
    </TextFieldWrapperStyled>
  );
};

export default InputText;
