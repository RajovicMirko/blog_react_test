import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  useTheme,
} from "@mui/material";
import { forwardRef, useRef } from "react";
import { useFormContext } from "../AppForm";
import { Options } from "../types";
import TextFieldMessage from "./HelperMessage";

type RadioCustomProps = Options & {
  hasError: boolean;
};

const RadioCustom = forwardRef(
  ({ id, label, hasError, ...registrationProps }: RadioCustomProps, ref) => {
    const theme = useTheme();

    return (
      <FormControlLabel
        key={id}
        value={id}
        label={label}
        sx={{
          color: theme.palette.text.secondary,
          "&.Mui-error > span": {
            color: theme.palette.error.main,
          },
        }}
        control={<Radio inputRef={ref} {...registrationProps} />}
      />
    );
  }
);

export type InputRadioGroupProps = RadioGroupProps & {
  name: string;
  options: Options[];
  validate: any;
  label?: string;
  helperText?: string;
  disabled?: boolean;
};

const InputRadioGroup = ({
  name = "radio-group",
  options,
  validate,
  label,
  helperText,
  disabled,
  ...rest
}: InputRadioGroupProps) => {
  const wrapperRef = useRef<HTMLDivElement>();

  const { register, formState, isLoading } = useFormContext();
  const { errors } = formState ?? {};

  const hasErrors = !!errors[name];
  const inputOffsetWidth = (wrapperRef.current as any)?.offsetWidth ?? "auto";
  const messageColor = hasErrors ? "error" : "secondary";

  return (
    <Box ref={wrapperRef}>
      <FormControl error={hasErrors} disabled={disabled || isLoading}>
        {label && <FormLabel id={`${name}-label`}>{label}</FormLabel>}
        <RadioGroup
          aria-labelledby={`${name}-label`}
          {...rest}
          color={messageColor}
        >
          {options.map((option) => (
            <RadioCustom
              key={option.id}
              hasError={hasErrors}
              {...option}
              {...register(name, { validate })}
            />
          ))}
        </RadioGroup>

        <TextFieldMessage
          color={messageColor}
          sx={{ width: inputOffsetWidth, bottom: "-12px" }}
        >
          {errors[name]?.message ?? helperText}
        </TextFieldMessage>
      </FormControl>
    </Box>
  );
};

export default InputRadioGroup;
