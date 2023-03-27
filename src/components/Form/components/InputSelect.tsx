import { MenuItem } from "@mui/material";
import { Options } from "../types";
import InputText, { InputTextProps } from "./InputText";

export type InputSelectProps = InputTextProps & {
  options: Options[];
};

const InputSelect = ({ options, ...rest }: InputSelectProps) => {
  return (
    <InputText select {...rest}>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </InputText>
  );
};

export default InputSelect;
