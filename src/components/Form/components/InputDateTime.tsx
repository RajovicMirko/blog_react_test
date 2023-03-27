import { ButtonProps, TextFieldProps, useTheme } from "@mui/material";
import { DateTimePicker, DateTimeValidationError } from "@mui/x-date-pickers";
import { PickerChangeHandler } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue";
import dayjs from "dayjs";
import useToggle from "src/hooks/useToggle";
import { DateFormats, formatDateToString, stringToDate } from "src/utils/date";
import { useFormContext } from "../AppForm";
import InputText, { InputTextProps } from "./InputText";

export type InputDateTimeProps = TextFieldProps & {
  name: string;
  validate?: any;
  fullWidth?: boolean;
};

const InputDateTime = ({
  name,
  validate,
  fullWidth,
  disabled,
  defaultValue,
  ...rest
}: InputDateTimeProps) => {
  const theme = useTheme();

  const {
    isLoading,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const [isOpened, toggleIsOpened, setIsOpened] = useToggle();

  const hasError = errors[name];

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleChange: PickerChangeHandler<
    dayjs.Dayjs | null,
    DateTimeValidationError
  > = (newValue) => {
    setValue(name, formatDateToString(newValue, "dateRequest"));
    trigger(name);
  };

  const slots = {
    textField: InputText,
  };

  const slotProps = {
    textField: {
      name,
      validate,
      disabled: isLoading,
      fullWidth,
      ...rest,
      inputProps: {
        disabled: true,
      },
      onClick: toggleIsOpened,
    } as InputTextProps,
    openPickerButton: {
      disabled: isLoading,
      color: hasError ? "error" : isOpened ? "primary" : "secondary",
    } as Pick<ButtonProps, "disabled" | "color">,
  };

  const getFieldsetBorderStyle = () => {
    const borderSx = {
      borderWidth: isOpened ? "2px" : "1px",
      borderColor: "secondary",
    };

    if (hasError) {
      return {
        ...borderSx,
        borderColor: theme.palette.error.main,
      };
    }

    if (isOpened) {
      return {
        ...borderSx,
        borderColor: theme.palette.primary.main,
      };
    }

    return borderSx;
  };

  const sxCustom = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        ...getFieldsetBorderStyle(),
      },
      "&:hover fieldset": {
        ...getFieldsetBorderStyle(),
      },
    },
    label: {
      color: hasError ? theme.palette.error.main : "inherit",
    },
  };

  return (
    <DateTimePicker
      open={isOpened}
      onClose={handleClose}
      onOpen={toggleIsOpened}
      closeOnSelect={true}
      ampm={false}
      format={DateFormats.dateTime}
      defaultValue={stringToDate(defaultValue as string)}
      onChange={handleChange}
      slots={slots}
      slotProps={slotProps}
      sx={sxCustom}
    />
  );
};

export default InputDateTime;
