import { InputSelectProps } from "./components/InputSelect";
import { InputTextProps } from "./components/InputText";

export type Options = {
  id: string | number;
  label: string;
};

type FormFieldsConfigFunctionResult = any | InputTextProps | InputSelectProps;

type FormFieldsConfigFunction<DataType> = (
  props?: DataType
) => FormFieldsConfigFunctionResult;

export type FormFieldsConfig<DataType> = {
  [key in keyof Omit<DataType, "id">]: FormFieldsConfigFunction<DataType>;
};
