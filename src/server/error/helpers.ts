import { toProperCase } from "../../utils/toProperCase";
import { BaseResponse } from "../types";
import { queryErrors } from "./constants";

export function throwQueryErrorIfExists(response?: BaseResponse<any>) {
  if (response?.data?.code) {
    let message = "";

    if (response?.data?.code >= 500) {
      message = queryErrors["500"]();
    }

    if (queryErrors[response?.data?.code]) {
      message = queryErrors[response?.data?.code](response);
    }

    if (message) throw message;
  }
}

export const getErrorDataValues = (response?: BaseResponse<any>): string => {
  const tmpData = response?.data?.data;

  if (!tmpData) return "";

  if (tmpData.message) return tmpData.message;

  const messagesArr = tmpData?.reduce(
    (acc: any, error: any) => [
      ...acc,
      `${toProperCase(error.field)} ${error.message}`,
    ],
    []
  );

  return messagesArr.join(", ");
};
