import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TextFieldProps } from "@mui/material";
import {
  DateTimeValidationError,
  MobileDateTimePicker,
  PickersActionBarAction,
} from "@mui/x-date-pickers";
import { PickerChangeHandler } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue";
import dayjs from "dayjs";
import { ComponentType } from "react";
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
  const { isLoading, setValue, trigger, formState } = useFormContext();
  const { errors } = formState ?? {};

  const hasErrors = !!errors[name];

  const handleChange: PickerChangeHandler<
    dayjs.Dayjs | null,
    DateTimeValidationError
  > = (newValue) => {
    setValue(name, formatDateToString(newValue, "dateRequest"));
    trigger(name);
  };

  const slotProps = {
    textField: {
      name,
      validate,
      disabled: isLoading,
      fullWidth,
      error: hasErrors,
      icon: <CalendarMonthIcon color="disabled" />,
      inputProps: {
        disabled: true,
      },
      ...rest,
    } as InputTextProps,
    toolbar: {
      hidden: true,
    },
    actionBar: {
      actions: ["cancel"] as PickersActionBarAction[],
    },
  };

  return (
    <MobileDateTimePicker
      ampm={false}
      closeOnSelect={true}
      format={DateFormats.dateTime}
      defaultValue={stringToDate(defaultValue as string)}
      onChange={handleChange}
      slots={{
        textField: InputText as ComponentType<TextFieldProps>,
      }}
      slotProps={slotProps}
    />
  );
};

export default InputDateTime;
