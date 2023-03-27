import { TextFieldSelectProps } from "./components/InputSelect";
import { TextFieldInputProps } from "./components/InputText";

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
