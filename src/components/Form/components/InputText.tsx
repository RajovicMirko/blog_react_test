import { Box, styled, TextField, TextFieldProps } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "../AppForm";
import TextFieldMessage from "./HelperMessage";

export type InputTextProps = TextFieldProps & {
  name: string;
  icon?: JSX.Element;
  validate?: any;
  triggerValidationRelation?: string;
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
  triggerValidationRelation,
  ...rest
}: InputTextProps) => {
  const { register, formState, isLoading, watch, trigger, getValues } =
    useFormContext();
  const { errors } = formState ?? {};

  const hasErrors = !!errors[name];
  const inputOffsetWidth = (errors[name]?.ref as any)?.offsetWidth;
  const messageColor = hasErrors ? "error" : "text.secondary";

  const selfWatch = triggerValidationRelation ? watch(name) : null;
  useEffect(() => {
    if (triggerValidationRelation && !!getValues(triggerValidationRelation)) {
      trigger(triggerValidationRelation);
    }
  }, [selfWatch]);

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
