/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  createContext,
  KeyboardEventHandler,
  PropsWithChildren,
  useContext,
} from "react";
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

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    const disabledKeysCodes = [13];

    if (disabledKeysCodes.includes(event.keyCode)) {
      event.preventDefault();
    }
  };

  return (
    <FormContext.Provider value={provide}>
      <form onSubmit={methods.handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) throw Error("useFormContext must be used under FormContext");

  return context;
};

export default AppForm;
