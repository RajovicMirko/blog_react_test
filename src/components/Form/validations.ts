import { ValidateResult } from "react-hook-form";

//#region Types
export type ResultFunction = (value: any) => ValidateResult;

export type ValidationFunction = (
  message: string,
  props?: any
) => ResultFunction;

export type Validation = (fns: ResultFunction[]) => ResultFunction;
//#endregion

//#region Result functions
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isRequired: ValidationFunction = (message) => (value) => {
  const isError = !value?.trim();
  return isError ? message : undefined;
};

export const minLen: ValidationFunction = (message, min) => (value) => {
  const isError = !min || value?.trim().length < min;
  return isError ? message : undefined;
};

export const email: ValidationFunction = (message) => (value) => {
  const isError = !value?.trim().match(EMAIL_PATTERN);
  return isError ? message : undefined;
};

//#endregion

//#region Validation function
export const validation: Validation = (fns) => (value) => {
  let message = undefined as ValidateResult;

  for (const fn of fns) {
    const tmpMessage = fn(value);

    if (tmpMessage) {
      message = tmpMessage;
      break;
    }
  }

  return message;
};
//#endregion
