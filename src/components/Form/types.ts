import { TextFieldInputProps } from "./components/TextFieldInput";
import { TextFieldSelectProps } from "./components/TextFieldSelect";

export type Options = {
  id: string | number;
  label: string;
};

type FormFieldsConfigFunctionResult =
  | any
  | TextFieldInputProps
  | TextFieldSelectProps;

type FormFieldsConfigFunction<DataType> = (
  props?: DataType
) => FormFieldsConfigFunctionResult;

export type FormFieldsConfig<DataType> = {
  [key in keyof Omit<DataType, "id">]: FormFieldsConfigFunction<DataType>;
};
