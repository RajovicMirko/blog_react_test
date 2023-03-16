import { Box, styled, TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "../AppForm";
import TextFieldMessage from "./TextFieldMessage";

export type TextFieldInputProps = TextFieldProps & {
  name: string;
  validate?: any;
};

const TextFieldWrapperStyled = styled(Box)(() => ({
  paddingBottom: "8px",
}));

const TextFieldInput = ({
  name,
  validate,
  helperText,
  ...rest
}: TextFieldInputProps) => {
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
        disabled={isLoading}
        {...rest}
      />
      <TextFieldMessage color={messageColor} sx={{ width: inputOffsetWidth }}>
        {errors[name]?.message ?? helperText}
      </TextFieldMessage>
    </TextFieldWrapperStyled>
  );
};

export default TextFieldInput;
