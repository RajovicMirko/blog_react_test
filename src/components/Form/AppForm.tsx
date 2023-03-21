/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { createContext, PropsWithChildren, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

type FormContextProps = UseFormReturn<any, any> & {
  isLoading: boolean;
};
const FormContext = createContext({} as FormContextProps);

type AppFormProps = FormContextProps & {
  onSubmit: (formData: any) => void;
};

const AppForm = ({
  onSubmit,
  children,
  isLoading,
  ...methods
}: PropsWithChildren<AppFormProps>) => {
  const provide = {
    ...methods,
    isLoading,
  };

  return (
    <FormContext.Provider value={provide}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) throw Error("useFormContext must be used under FormContext");

  return context;
};

export default AppForm;
