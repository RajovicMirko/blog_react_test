import { BaseResponse } from "../types";
import { getErrorDataValues } from "./helpers";

const GLOBAL_ERROR_MESSAGE = "Something went wrong";

export const axiosErrorsMap: { [key: string]: string } = {
  ERR_FR_TOO_MANY_REDIRECTS: GLOBAL_ERROR_MESSAGE,
  ERR_BAD_OPTION_VALUE: GLOBAL_ERROR_MESSAGE,
  ERR_BAD_OPTION: GLOBAL_ERROR_MESSAGE,
  ERR_NETWORK: "Network Error",
  ERR_DEPRECATED: GLOBAL_ERROR_MESSAGE,
  ERR_BAD_RESPONSE: GLOBAL_ERROR_MESSAGE,
  ERR_BAD_REQUEST: "Bad Request",
  ERR_NOT_SUPPORT: GLOBAL_ERROR_MESSAGE,
  ERR_INVALID_URL: GLOBAL_ERROR_MESSAGE,
  ERR_CANCELED: GLOBAL_ERROR_MESSAGE,
  ECONNABORTED: "Request timed out",
  ETIMEDOUT: GLOBAL_ERROR_MESSAGE,
};

export const queryErrors: {
  [key: number | string]: (props?: BaseResponse<any>) => any;
} = {
  400: () => "Bad Request",
  401: () => "Not Authorized",
  404: () => "Not Found",
  422: (response) => getErrorDataValues(response) ?? GLOBAL_ERROR_MESSAGE,
  500: () => "There is some problem currently. Please try again later.",
};
