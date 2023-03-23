import { BaseOneProps, BaseResponse } from "../base/types";

export function updaterFunctionCreate<Response extends BaseOneProps>(
  response: BaseResponse<Response>
) {
  return (prevState?: BaseResponse<Response[]>) => {
    const newState = { ...prevState } as BaseResponse<Response[]>;

    newState.data.data = [response.data.data, ...newState.data.data];

    return newState;
  };
}

export function updaterFunctionUpdate<Response extends BaseOneProps>(
  response: BaseResponse<Response>
) {
  return (prevState?: BaseResponse<Response[]>) => {
    const newState = { ...prevState } as BaseResponse<Response[]>;

    newState.data.data = prevState?.data?.data.map((item) =>
      item.id === response.data.data.id ? response.data.data : item
    ) as Response[];

    return newState;
  };
}

export function updaterFunctionRemove<Response extends BaseOneProps>(
  id: number | string
) {
  return (prevState?: BaseResponse<Response[]>) => {
    const newState = { ...prevState } as BaseResponse<Response[]>;

    newState.data.data = prevState?.data?.data.filter(
      (item) => item.id !== id
    ) as Response[];

    return newState;
  };
}
