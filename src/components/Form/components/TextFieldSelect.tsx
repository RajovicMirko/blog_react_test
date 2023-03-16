import { MenuItem } from "@mui/material";
import { Options } from "../types";
import TextFieldInput, { TextFieldInputProps } from "./TextFieldInput";

export type TextFieldSelectProps = TextFieldInputProps & {
  options: Options[];
};

const TextFieldSelect = ({ options, ...rest }: TextFieldSelectProps) => {
  return (
    <TextFieldInput select {...rest}>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </TextFieldInput>
  );
};

export default TextFieldSelect;
